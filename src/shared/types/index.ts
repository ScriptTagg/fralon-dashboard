import type { User as SupabaseUser } from "@supabase/supabase-js";

export type UserRoles = "admin" | "staff" | "customer";
export type User = SupabaseUser;
