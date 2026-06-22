"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { ProductWithRelations } from "../../products.repository";
import { timeDiff } from "@/shared/utils/time-diff";
import StatusBadge from "../StatusBadge";
import TableImage from "./TableImage";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<ProductWithRelations>[] = [
  {
    id: "image",
    cell: ({ row }) => (
      <TableImage href={row.original.product_images.find((img) => img.is_primary)?.storage_path || ""} />
    ),
    header: "",
  },
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => (
      <Link href={`/products/${row.original.id}`} className="hover:underline">
        {row.original.name}
      </Link>
    ),
  },
  {
    header: "Category",
    cell: ({ row }) => row.original.categories?.name ?? "—",
  },
  {
    cell: ({ row }) => <StatusBadge status={row.original.is_active ? "active" : "inactive"} />,
    header: "Status",
  },
  {
    header: "Variants",
    cell: ({ row }) => row.original.product_variants?.length ?? 0,
  },
  {
    header: "Price",
    cell: ({ row }) => {
      const variants = row.original.product_variants ?? [];
      if (variants.length === 0) return "—";

      const prices = variants.map((v) => v.price_ksh);
      const min = Math.min(...prices);
      const max = Math.max(...prices);

      return min === max ? `Ksh ${min.toLocaleString()}` : `Ksh ${min.toLocaleString()} – ${max.toLocaleString()}`;
    },
  },
  {
    header: "Stock",
    cell: ({ row }) => {
      const variants = row.original.product_variants ?? [];
      const totalStock = variants.reduce((sum, v) => sum + v.stock_quantity, 0);
      return totalStock;
    },
  },
  {
    header: "Updated",
    cell: ({ row }) => timeDiff(row.original.updated_at),
  },
];
