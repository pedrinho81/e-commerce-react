import { useQuery } from "react-query";
import { ProductService } from "../services/product.service";
import { isAxiosError } from "axios";
import { useState, useMemo } from "react";

interface UseProductsProps {
  category?: string;
}

export const useProducts = ({ category = "" }: UseProductsProps = {}) => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [sortById, setSortById] = useState<ProductsSortEnum>(
    ProductsSortEnum.ASC
  );
  useMemo(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const {
    data: allProducts,
    isLoading: isProductsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["products", sortById, category],
    queryFn: async () =>
      category
        ? await ProductService.GetAllByCategory(category)
        : await ProductService.GetAll(sortById),
    onError: (err) => {
      if (isAxiosError(err)) return err.message;
      else return "An unexpected error occurred";
    },
  });

  const products = debouncedSearch
    ? allProducts?.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : allProducts;

  return {
    products,
    isProductsLoading,
    productsError,
    sortById,
    setSearch,
    setSortById,
  };
};

export enum ProductsSortEnum {
  ASC = "asc",
  DESC = "desc",
}
