// modules/products/schemas/update-product.schema.ts
import { z } from "zod";

export const updateProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  slug: z.string().min(1, "Slug is required"),
  category_id: z.string().uuid("Select a category"),
  description: z.string().optional(),
  is_active: z.boolean(),
});

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
