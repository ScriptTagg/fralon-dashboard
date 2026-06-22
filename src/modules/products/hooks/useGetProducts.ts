"use client";
import { useQuery } from "@tanstack/react-query";
import { productsService } from "../products.service";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productsService.getProducts,
  });
};
