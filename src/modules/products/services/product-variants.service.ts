// modules/products/services/product-variants.service.ts
import { productVariantsRepository } from "../repository/product-variants.repository";
import type { VariantInput } from "../schemas/product-variant.schema";

export const productVariantsService = {
  getVariants(productId: string) {
    return productVariantsRepository.getVariants(productId);
  },
  createVariant(productId: string, input: VariantInput) {
    return productVariantsRepository.createVariant(productId, input);
  },
  updateVariant(variantId: string, input: VariantInput) {
    return productVariantsRepository.updateVariant(variantId, input);
  },
  deleteVariant(variantId: string) {
    return productVariantsRepository.deleteVariant(variantId);
  },
};
