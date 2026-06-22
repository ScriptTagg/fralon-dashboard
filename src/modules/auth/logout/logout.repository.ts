import { ApiCustomError } from "@/shared/errors/api-error";
import { supabase } from "@/shared/lib/supabase/client";

/* export const logout = async (): Promise<void> => {
  const response = await api.post("/profile/logout");
  if (!response.data.success) throw new ApiCustomError(response.data.message, response.data.statusCode);
  return response.data; 
}; */
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new ApiCustomError("Failed to log out", error.status ?? 500);
  return { success: true };
};
