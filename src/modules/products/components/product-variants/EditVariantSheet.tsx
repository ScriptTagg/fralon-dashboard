// modules/products/components/EditVariantSheet.tsx
"use client";

import { useEffect } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/shared/components/ui/sheet";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Switch } from "@/shared/components/ui/switch";
import { Button } from "@/shared/components/ui/button";
import { variantSchema, type VariantInput } from "../../schemas/product-variant.schema";
import { useUpdateVariant } from "../../hooks/product-variants/use-update-variant";
import type { ProductVariant } from "../../types/product-variants.types";

interface EditVariantSheetProps {
  productId: string;
  variant: ProductVariant | null;
  onClose: () => void;
}

export default function EditVariantSheet({ productId, variant, onClose }: EditVariantSheetProps) {
  const { mutateAsync, isPending } = useUpdateVariant(productId);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm<VariantInput>({
    resolver: zodResolver(variantSchema),
  });

  // sync form whenever the selected variant changes
  useEffect(() => {
    if (variant) {
      reset({
        name: variant.name,
        sku: variant.sku,
        description: variant.description ?? "",
        price_ksh: variant.price_ksh,
        wholesale_price_ksh: variant.wholesale_price_ksh,
        stock_quantity: variant.stock_quantity,
        weight_gms: variant.weight_gms,
        is_active: variant.is_active,
      });
    }
  }, [variant, reset]);

  const onSubmit: SubmitHandler<VariantInput> = async (data) => {
    if (!variant) return;
    try {
      await mutateAsync({ variantId: variant.id, input: data });
      onClose();
    } catch {
      // error toast handled in the hook
    }
  };

  return (
    <Sheet
      open={!!variant}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent className="sm:max-w-135 p-4 overflow-y-auto">
        <SheetHeader className="px-0">
          <SheetTitle>Edit variant</SheetTitle>
          <SheetDescription>
            Updating <span className="font-medium text-foreground">{variant?.name}</span>
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
          <FieldGroup className="space-y-4">
            {/* ── Name + SKU ── */}
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input disabled={isPending} {...register("name")} />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel>SKU</FieldLabel>
              <Input disabled={isPending} {...register("sku")} />
              {errors.sku && <FieldError>{errors.sku.message}</FieldError>}
            </Field>

            {/* ── Prices ── */}
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel>Price (KSH)</FieldLabel>
                <Input type="number" min={0} step={0.01} disabled={isPending} {...register("price_ksh")} />
                {errors.price_ksh && <FieldError>{errors.price_ksh.message}</FieldError>}
              </Field>

              <Field>
                <FieldLabel>Wholesale (KSH)</FieldLabel>
                <Input type="number" min={0} step={0.01} disabled={isPending} {...register("wholesale_price_ksh")} />
                {errors.wholesale_price_ksh && <FieldError>{errors.wholesale_price_ksh.message}</FieldError>}
              </Field>
            </div>

            {/* ── Stock + Weight ── */}
            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel>Stock qty</FieldLabel>
                <Input type="number" min={0} disabled={isPending} {...register("stock_quantity")} />
                {errors.stock_quantity && <FieldError>{errors.stock_quantity.message}</FieldError>}
              </Field>

              <Field>
                <FieldLabel>Weight (g)</FieldLabel>
                <Input type="number" min={10} disabled={isPending} {...register("weight_gms")} />
                {errors.weight_gms && <FieldError>{errors.weight_gms.message}</FieldError>}
              </Field>
            </div>

            {/* ── Description ── */}
            <Field>
              <FieldLabel>
                Description <span className="text-muted-foreground font-normal text-xs">(optional)</span>
              </FieldLabel>
              <Textarea rows={3} disabled={isPending} {...register("description")} />
              {errors.description && <FieldError>{errors.description.message}</FieldError>}
            </Field>

            {/* ── Active toggle ── */}
            <Controller
              name="is_active"
              control={control}
              render={({ field }) => (
                <Field orientation="horizontal" className="gap-3">
                  <div>
                    <FieldLabel>Active</FieldLabel>
                    <FieldDescription>Inactive variants won't appear in the storefront.</FieldDescription>
                  </div>
                  <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
                </Field>
              )}
            />
          </FieldGroup>

          <div className="flex items-center justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !isDirty}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
