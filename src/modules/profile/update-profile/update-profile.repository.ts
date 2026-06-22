import { ApiCustomError } from "@/shared/errors/api-error";
import { supabase } from "@/shared/lib/supabase/client";
import type { Profile } from "./update-profile.types";
import type { ProfileUpdateInput } from "./update-profile.schema";

export const updateProfile = async (userId: string, data: Partial<ProfileUpdateInput>): Promise<Profile> => {
  const { data: profile, error } = await supabase
    .from("profiles")
    .update({ ...data })
    .eq("id", userId)
    .select("*, addresses(*)")
    .single<Profile>();
  if (error) throw new ApiCustomError("Failed to update profile", 500);

  return profile;
};
