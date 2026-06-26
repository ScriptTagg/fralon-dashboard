import type { Database } from "@/shared/lib/supabase/database.types";

export type Product = Database["public"]["Tables"]["products"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type ProductImage = Database["public"]["Tables"]["product_images"]["Row"];
