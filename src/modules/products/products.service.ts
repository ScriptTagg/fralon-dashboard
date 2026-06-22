import { slugify } from "@/shared/utils/slugify";
import { productsRepository } from "./products.repository";
import type { NewProductInput } from "./schemas/new-product.schema";
import type { UpdateProductInput } from "./schemas/udate-product.schema";

export const productsService = {
  getProducts() {
    return productsRepository.getProducts();
  },
  getSingleProduct(productId: string) {
    return productsRepository.getSingleProduct(productId);
  },
  createProduct(data: NewProductInput) {
    const slug = slugify(data.name);
    return productsRepository.createProduct({ ...data, slug });
  },
  updateProduct(productId: string, input: UpdateProductInput) {
    return productsRepository.updateProduct(productId, input);
  },
};
