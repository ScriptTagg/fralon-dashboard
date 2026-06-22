import { categoriesRepository } from "../repository/categories.repository";

export const categoriesService = {
  async getCategories() {
    return categoriesRepository.getCategories();
  },
};
