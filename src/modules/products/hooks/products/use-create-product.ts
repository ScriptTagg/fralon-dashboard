"use client";
import { useMutation } from "@tanstack/react-query";
import type { NewProductInput } from "../../schemas/new-product.schema";
import { productsService } from "../../services/products.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useCreateProduct = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: NewProductInput) => productsService.createProduct(data),
    onSuccess: (product) => {
      router.push(`/products/${product.id}?tab=variants`);
      toast.success("Product created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
