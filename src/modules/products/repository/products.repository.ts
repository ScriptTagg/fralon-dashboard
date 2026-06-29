import { supabase } from "@/shared/lib/supabase/client";
import { ApiCustomError } from "@/shared/errors/api-error";
import type { QueryData } from "@supabase/supabase-js";
import type { Product } from "../types/products.types";
import type { NewProductInput } from "../schemas/new-product.schema";
import type { UpdateProductInput } from "../schemas/udate-product.schema";
import type { Json } from "@/shared/lib/supabase/database.types";

const productWithRelationsQuery = supabase
  .from("products")
  .select("*, categories(*), product_images(*), product_variants(*)")
  .single();

export type ProductWithRelations = QueryData<typeof productWithRelationsQuery>;

export const productsRepository = {
  async getProducts(): Promise<ProductWithRelations[]> {
    const { data: products, error } = await supabase
      .from("products")
      .select("*, categories(*), product_images(*), product_variants(*)")
      .order("created_at", { ascending: false });

    if (error) {
      throw new ApiCustomError("Failed to fetch products", 500);
    }
    return products;
  },

  async getSingleProduct(productId: string): Promise<ProductWithRelations> {
    const { data: product, error } = await supabase
      .from("products")
      .select("*, categories(*), product_images(*), product_variants(*)")
      .eq("id", productId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw new ApiCustomError("Product not found", 404);
      }
      throw new ApiCustomError("Failed to fetch product", 500);
    }
    return product;
  },

  async createProduct(data: NewProductInput & { slug: string }): Promise<Product> {
    const { data: product, error } = await supabase.from("products").insert(data).select().single();
    console.log("Creation data;", data);
    if (error) {
      console.log("Creation error;", error);
      throw new ApiCustomError("Failed to create product", 500);
    }
    return product;
  },

  async updateProduct(productId: string, input: UpdateProductInput): Promise<Product> {
    const { data, error } = await supabase.from("products").update(input).eq("id", productId).select().single();

    if (error) {
      throw new ApiCustomError("Failed to update product", 500);
    }

    return data;
  },
  async updateMetadata(productId: string, metadata: Record<string, string>): Promise<void> {
    const { error } = await supabase
      .from("products")
      .update({ metadata: metadata as Json })
      .eq("id", productId);

    if (error) throw new ApiCustomError("Failed to update attributes", 500);
  },
};
