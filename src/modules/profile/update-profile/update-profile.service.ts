import { updateProfile } from "./update-profile.repository";
import type { ProfileUpdateInput } from "./update-profile.schema";

export const updateProfileService = {
  async updateProfile(userId: string, data: Partial<ProfileUpdateInput>) {
    return updateProfile(userId, data);
  },
};
