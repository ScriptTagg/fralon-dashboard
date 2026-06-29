// modules/products/schemas/product-attributes.schema.ts
import type { Json } from "@/shared/lib/supabase/database.types";
import { z } from "zod";

export const attributeRowSchema = z.object({
  key: z.string().min(1, "Key is required"),
  value: z.string().min(1, "Value is required"),
});

export const attributesFormSchema = z.object({
  attributes: z.array(attributeRowSchema).refine(
    (rows) => {
      const keys = rows.map((r) => r.key.trim().toLowerCase());
      return new Set(keys).size === keys.length;
    },
    { message: "Attribute keys must be unique" },
  ),
});

export type AttributeRow = z.infer<typeof attributeRowSchema>;
export type AttributesFormValues = z.infer<typeof attributesFormSchema>;

function isStringRecord(value: Json): value is Record<string, string> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every((v) => typeof v === "string")
  );
}

// reads from product.metadata
export function toFormAttributes(raw: Json): AttributeRow[] {
  if (!isStringRecord(raw)) return [];
  return Object.entries(raw).map(([key, value]) => ({ key, value }));
}

export function toRecordAttributes(rows: AttributeRow[]): Record<string, string> {
  return rows.reduce<Record<string, string>>((acc, { key, value }) => ({ ...acc, [key.trim()]: value.trim() }), {});
}
