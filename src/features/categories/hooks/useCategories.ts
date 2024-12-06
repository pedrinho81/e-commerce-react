import { useQuery } from "react-query";
import { Category } from "../../../entities";
import { CategoryService } from "../services/category.service";

export const useCategories = () => {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: async () => await CategoryService.getAll(),
  });
  return { categories, isLoadingCategories, categoriesError };
};

export enum CategoriesEnum {
  ALL = "all",
}
