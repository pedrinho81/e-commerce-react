import { useQuery } from "react-query";
import { ProductService } from "../services/product.service";
import { isAxiosError } from "axios";
import { useState, useMemo } from "react";

export const useProducts = () => {
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [sortById, setSortById] = useState<ProductsSortEnum>(ProductsSortEnum.ASC)
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
    queryKey: ["products", sortById],
    queryFn: async () => await ProductService.getAll(sortById),
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

  return { products, isProductsLoading, productsError, sortById, setSearch, setSortById, };
};

export enum ProductsSortEnum {
  ASC = 'asc',
  DESC = 'desc'
}