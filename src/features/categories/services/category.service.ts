import { api } from "../../../api";
import { Category } from "../../../entities";

const categoryUrl = "/products/categories";
export const CategoryService = {
  GetAll: async (): Promise<Category[]> => {
    const { data } = await api.get(categoryUrl);
    return data;
  },
};
