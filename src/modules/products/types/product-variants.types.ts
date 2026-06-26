import type { Database } from "@/shared/lib/supabase/database.types";

export type ProductVariant = Database["public"]["Tables"]["product_variants"]["Row"];
