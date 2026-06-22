import { supabase } from "@/shared/lib/supabase/client";
import type { Category } from "../types/categories.types";
import { ApiCustomError } from "@/shared/errors/api-error";

export const categoriesRepository = {
  async getCategories(): Promise<Pick<Category, "id" | "name">[]> {
    const { data: categories, error } = await supabase.from("categories").select("id, name").order("name");

    if (error) throw new ApiCustomError("Failed to fetch categories", 500);
    return categories;
  },
};
