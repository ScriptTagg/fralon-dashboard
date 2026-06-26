// modules/products/hooks/use-product-variants.ts
import { useQuery } from "@tanstack/react-query";
import { productVariantsService } from "../../services/product-variants.service";

export function useProductVariants(productId: string) {
  return useQuery({
    queryKey: ["products", productId, "variants"],
    queryFn: () => productVariantsService.getVariants(productId),
    enabled: !!productId,
  });
}
