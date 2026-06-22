import { useMutation } from "@tanstack/react-query";
import type { LoginInput } from "./login.schema";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/utils/get-error-message";
import { loginService } from "./login.service";
import { authBreadcrumbs } from "@/shared/lib/sentry/sentry-breadcrumbs";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginInput) => loginService.login(data),
    onMutate: () => {
      authBreadcrumbs("Login attempt started");
    },
    onSuccess: (data) => {
      authBreadcrumbs("Login successful", {
        userId: data.id,
        email: data.email,
      });
      toast.success("Login successfull");
    },
    onError: (error) => {
      authBreadcrumbs("Login failed", {
        error: String(error),
      });
      toast.error(getErrorMessage(error));
    },
  });
};
