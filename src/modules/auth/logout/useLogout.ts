import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient } from "@/shared/lib/query-client";
import { authBreadcrumbs } from "@/shared/lib/sentry/sentry-breadcrumbs";
import { logoutService } from "./logout.service";

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutService.logout,
    onMutate: () => {
      authBreadcrumbs("Logout started");
    },
    onSuccess: () => {
      authBreadcrumbs("Logout successful");
      queryClient.clear();
      toast.success("Logout successful");
    },
    onError: (error) => {
      authBreadcrumbs("Logout failed", { error: String(error) });
      queryClient.clear();
    },
  });
};
