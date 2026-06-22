"use client";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/query-client";
import { toast } from "sonner";
import { updateProfileService } from "./update-profile.service";
import type { ProfileUpdateInput } from "./update-profile.schema";
import { useAuth } from "@/modules/auth/shared/useAuth";

export const useUpdateProfile = () => {
  const { user } = useAuth();
  if (!user) throw new Error("Please login to perform this action");

  return useMutation({
    mutationFn: (data: Partial<ProfileUpdateInput>) => updateProfileService.updateProfile(user.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
      toast.success("Profile updated successfully");
    },
    onError: (_error) => {
      toast.error("Failed to update profile");
    },
  });
};
