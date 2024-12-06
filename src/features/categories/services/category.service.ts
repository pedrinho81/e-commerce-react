import { api } from "../../../api";
import { Category } from "../../../entities";

const categoryUrl = "/products/categories";
export const CategoryService = {
  getAll: async (): Promise<Category[]> => {
    const { data } = await api.get(categoryUrl);
    return data;
  },
};
