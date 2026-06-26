// modules/products/schemas/product-variant.schema.ts
import { z } from "zod";

export const variantSchema = z.object({
  name: z.string().min(1, "Variant name is required"),
  sku: z.string().min(1, "SKU is required"),
  description: z.string().optional(),
  price_ksh: z.number().min(0, "Price must be 0 or more"),
  wholesale_price_ksh: z.number().min(0, "Wholesale price must be 0 or more"),
  stock_quantity: z.number().int().min(0, "Stock must be 0 or more"),
  weight_gms: z.number().min(10, "Weight must be at least 10g"),
  is_active: z.boolean(),
});

export type VariantInput = z.infer<typeof variantSchema>;
