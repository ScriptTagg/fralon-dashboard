import type { User } from "@/shared/types";
import { login } from "./login.repository";
import type { LoginInput } from "./login.schema";

export const loginService = {
  async login(data: LoginInput): Promise<User> {
    return login(data);
  },
};
