import type { Database } from "@/shared/lib/supabase/database.types";

export type Category = Database["public"]["Tables"]["categories"]["Row"];
