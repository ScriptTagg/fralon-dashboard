"use client";
import { useQuery } from "@tanstack/react-query";
import { productsService } from "../products.service";

export const useGetSingleProduct = (productId: string) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => productsService.getSingleProduct(productId),
    enabled: !!productId,
  });
};
