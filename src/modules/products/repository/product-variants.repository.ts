// modules/products/repository/product-variants.repository.ts

import { supabase } from "@/shared/lib/supabase/client";
import type { VariantInput } from "../schemas/product-variant.schema";
import type { ProductVariant } from "../types/product-variants.types";
import { ApiCustomError } from "@/shared/errors/api-error";

export const productVariantsRepository = {
  async getVariants(productId: string): Promise<ProductVariant[]> {
    const { data, error } = await supabase
      .from("product_variants")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: true });

    if (error) throw new ApiCustomError("Failed to fetch variants", 500);
    return data;
  },

  async createVariant(productId: string, input: VariantInput): Promise<ProductVariant> {
    const { data, error } = await supabase
      .from("product_variants")
      .insert({ ...input, product_id: productId })
      .eq("product_id", productId)
      .select("*")
      .single();

    if (error) {
      console.log(error);
      throw new ApiCustomError(`Failed to create variant :: ${error}`, 500);
    }
    return data;
  },

  async updateVariant(variantId: string, input: VariantInput): Promise<ProductVariant> {
    const { data, error } = await supabase.from("product_variants").update(input).eq("id", variantId).select().single();

    if (error) throw new ApiCustomError("Failed to update variant", 500);
    return data;
  },

  async deleteVariant(variantId: string): Promise<void> {
    const { error } = await supabase.from("product_variants").delete().eq("id", variantId);

    if (error) throw new ApiCustomError("Failed to delete variant", 500);
  },
};
