"use client";
import { useMutation } from "@tanstack/react-query";
import type { NewProductInput } from "../schemas/new-product.schema";
import { productsService } from "../products.service";
import { toast } from "sonner";

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data: NewProductInput) => productsService.createProduct(data),
    onSuccess: () => {
      toast.success("Product created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
