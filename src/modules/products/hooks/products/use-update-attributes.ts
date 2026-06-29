// modules/products/hooks/use-update-attributes.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { productsService } from "../../services/products.service";

export function useUpdateAttributes(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attributes: Record<string, string>) => productsService.updateMetadata(productId, attributes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", productId] });
      toast.success("Attributes saved");
    },
    onError: () => {
      toast.error("Failed to save attributes", {
        description: "Something went wrong. Please try again.",
      });
    },
  });
}
