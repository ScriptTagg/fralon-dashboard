import { logout } from "./logout.repository";

export const logoutService = {
  async logout() {
    return logout();
  },
};
