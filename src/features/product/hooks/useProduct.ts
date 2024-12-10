import { useQuery } from "react-query";
import { ProductService } from "../services/product.service";
import { isAxiosError } from "axios";

export const useProduct = (id: number) => {
  const {
    data: product,
    isLoading: isProductLoading,
    error: productError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => await ProductService.getDetail(id),
    onError: (err) => {
      if (isAxiosError(err)) return err.message;
      else return "An unexpected error occurred";
    },
  });
  console.log(product);
  return {
    product,
    isProductLoading,
    productError,
  };
};
