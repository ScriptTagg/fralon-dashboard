// modules/products/repository/product-images.repository.ts

import { supabase } from "@/shared/lib/supabase/client";
import type { ProductImage, ProductImageWithUrl } from "../types/product-image.types";
import { ApiCustomError } from "@/shared/errors/api-error";

const BUCKET = "products";

function deriveUrl(storagePath: string): string {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
  return data.publicUrl;
}

function withUrl(image: ProductImage): ProductImageWithUrl {
  return { ...image, url: deriveUrl(image.storage_path) };
}

export const productImagesRepository = {
  async getImages(productId: string): Promise<ProductImageWithUrl[]> {
    const { data, error } = await supabase
      .from("product_images")
      .select("*")
      .eq("product_id", productId)
      .order("sort_order", { ascending: true, nullsFirst: false });

    if (error) throw new ApiCustomError("Failed to fetch images", 500);
    return data.map(withUrl);
  },

  // called after useSupabaseUpload confirms the files are in storage
  async saveImageRecords(
    productId: string,
    storagePaths: string[],
    variantId?: string | null,
  ): Promise<ProductImageWithUrl[]> {
    // get current count for sort_order offset + primary detection
    const { count, error: countError } = await supabase
      .from("product_images")
      .select("*", { count: "exact", head: true })
      .eq("product_id", productId);

    if (countError) throw new ApiCustomError("Failed to check existing images", 500);

    const existingCount = count ?? 0;
    const isVeryFirst = existingCount === 0;

    const records = storagePaths.map((path, i) => ({
      product_id: productId,
      variant_id: variantId ?? null,
      storage_path: path,
      is_primary: isVeryFirst && i === 0,
      sort_order: existingCount + i,
    }));

    const { data, error } = await supabase.from("product_images").insert(records).select();

    if (error) throw new ApiCustomError("Failed to save image records", 500);
    return data.map(withUrl);
  },

  async deleteImage(image: ProductImage): Promise<void> {
    const { error: storageError } = await supabase.storage.from(BUCKET).remove([image.storage_path]);

    if (storageError) throw new ApiCustomError("Failed to remove image from storage", 500);

    const { error } = await supabase.from("product_images").delete().eq("id", image.id);

    if (error) throw new ApiCustomError("Failed to delete image record", 500);
  },

  async setPrimaryImage(productId: string, imageId: string): Promise<void> {
    const { error: clearError } = await supabase
      .from("product_images")
      .update({ is_primary: false })
      .eq("product_id", productId);

    if (clearError) throw new ApiCustomError("Failed to clear primary image", 500);

    const { error } = await supabase.from("product_images").update({ is_primary: true }).eq("id", imageId);

    if (error) throw new ApiCustomError("Failed to set primary image", 500);
  },
};
