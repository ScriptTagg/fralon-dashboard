// modules/products/services/product-images.service.ts
import { productImagesRepository } from "../repository/product-images.repository";
import type { ProductImage } from "../types/product-image.types";

export const productImagesService = {
  getImages(productId: string) {
    return productImagesRepository.getImages(productId);
  },
  saveImageRecords(productId: string, storagePaths: string[], variantId?: string | null) {
    return productImagesRepository.saveImageRecords(productId, storagePaths, variantId);
  },
  deleteImage(image: ProductImage) {
    return productImagesRepository.deleteImage(image);
  },
  setPrimaryImage(productId: string, imageId: string) {
    return productImagesRepository.setPrimaryImage(productId, imageId);
  },
};
