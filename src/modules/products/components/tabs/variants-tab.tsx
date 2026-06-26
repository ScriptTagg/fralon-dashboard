// modules/products/components/tabs/VariantsTab.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ImageIcon, Pencil, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import type { ProductVariant } from "../../types/product-variants.types";
import { useDeleteVariant } from "../../hooks/product-variants/use-delete-variant";
import { useProductVariants } from "../../hooks/product-variants/use-product-variants";
import AddVariantForm from "../product-variants/AddVariantForm";
import EditVariantSheet from "../product-variants/EditVariantSheet";

interface VariantsTabProps {
  productId: string;
}

export default function VariantsTab({ productId }: VariantsTabProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(null);
  const [deletingVariant, setDeletingVariant] = useState<ProductVariant | null>(null);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);

  const { data: variants, isLoading } = useProductVariants(productId);
  const { mutate: deleteVariant, isPending: isDeleting } = useDeleteVariant(productId);

  const handleDeleteConfirm = () => {
    if (!deletingVariant) return;
    deleteVariant(deletingVariant.id, {
      onSettled: () => setDeletingVariant(null),
    });
  };

  const handleGoToImages = () => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", "images");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (isLoading) return <VariantsTabSkeleton />;

  const hasVariants = (variants?.length ?? 0) > 0;
  const showNudge = hasVariants && !nudgeDismissed && !showAddForm;

  return (
    <div className="space-y-4 pt-4">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Variants</h3>
          {hasVariants && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {variants!.length} variant{variants!.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        {!showAddForm && (
          <Button size="sm" onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-1.5" />
            Add variant
          </Button>
        )}
      </div>

      {/* ── Empty state ── */}
      {!hasVariants && !showAddForm && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
          <div className="rounded-full bg-muted p-3 mb-3">
            <Plus className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">No variants yet</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">
            Add at least one variant — e.g. a size or weight — before this product can be sold.
          </p>
          <Button size="sm" className="mt-4" onClick={() => setShowAddForm(true)}>
            <Plus className="h-4 w-4 mr-1.5" />
            Add first variant
          </Button>
        </div>
      )}

      {/* ── Variants table ── */}
      {hasVariants && (
        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Price (KSH)</TableHead>
                <TableHead className="text-right">Wholesale (KSH)</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right">Weight (g)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {variants!.map((variant) => (
                <TableRow key={variant.id}>
                  <TableCell className="font-medium">{variant.name}</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{variant.sku || "—"}</TableCell>
                  <TableCell className="text-right">{variant.price_ksh.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {variant.wholesale_price_ksh.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <StockCell stock={variant.stock_quantity} />
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {variant.weight_gms.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={variant.is_active ? "default" : "secondary"}>
                      {variant.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => setEditingVariant(variant)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        <span className="sr-only">Edit {variant.name}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={() => setDeletingVariant(variant)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span className="sr-only">Delete {variant.name}</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* ── Add form ── */}
      {showAddForm && (
        <AddVariantForm
          productId={productId}
          onSuccess={() => setShowAddForm(false)}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* ── Images nudge ── */}
      {showNudge && (
        <div className="flex items-center justify-between rounded-lg border border-dashed px-4 py-3 gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-muted p-2 shrink-0">
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Ready to add product images?</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                You can always come back to add more variants later.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={handleGoToImages}>
              Go to Images
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setNudgeDismissed(true)}>
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {/* ── Edit sheet ── */}
      <EditVariantSheet productId={productId} variant={editingVariant} onClose={() => setEditingVariant(null)} />

      {/* ── Delete confirmation ── */}
      <AlertDialog
        open={!!deletingVariant}
        onOpenChange={(open) => {
          if (!open) setDeletingVariant(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete variant?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="font-medium text-foreground">"{deletingVariant?.name}"</span>. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// ── Extracted for clarity — stock coloring matches dashboard home ──
function StockCell({ stock }: { stock: number }) {
  if (stock === 0) {
    return <span className="text-destructive font-medium">{stock}</span>;
  }
  if (stock <= 10) {
    return <span className="text-amber-600 font-medium">{stock}</span>;
  }
  return <span>{stock}</span>;
}

function VariantsTabSkeleton() {
  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-28" />
      </div>
      <div className="rounded-lg border overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3 border-b last:border-0">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
