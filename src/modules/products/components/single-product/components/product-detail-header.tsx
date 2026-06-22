// modules/products/components/ProductDetailHeader.tsx
import Link from "next/link";
import { Badge } from "@/shared/components/ui/badge";
import type { ProductWithRelations } from "@/modules/products/products.repository";

export default function ProductDetailHeader({ product }: { product: ProductWithRelations }) {
  return (
    <div className="space-y-1">
      <nav className="text-xs text-muted-foreground">
        <Link href="/products" className="hover:underline">
          Products
        </Link>
        <span className="mx-1">/</span>
        <span>{product.name}</span>
      </nav>
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-medium">{product.name}</h1>
        <Badge variant={product.is_active ? "default" : "secondary"}>{product.is_active ? "Active" : "Inactive"}</Badge>
      </div>
    </div>
  );
}
