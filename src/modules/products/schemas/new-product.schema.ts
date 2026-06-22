import z from "zod";

export const newProductSchema = z.object({
  name: z.string().min(3, "Name must be 3 or more characters").max(200, "Name is too long"),
  category_id: z.uuid("Select a category").min(10, "Please provide a valid category"),
  description: z.string("Enter a description").optional(),
  is_active: z.boolean(),
});

export const variantSchema = z.object({
  name: z.string().min(1, "Variant name is required"),
  sku: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be positive"),
  stock: z.coerce.number().int().min(0, "Stock must be 0 or more"),
  isActive: z.boolean().default(true),
});

export type NewProductInput = z.infer<typeof newProductSchema>;
