import { api } from "../../../api";
import { Product } from "../../../entities";
import { ProductsSortEnum } from "../hooks/useProducts";

const apiProductsUrl = "/products";

export const ProductService = {
  getAll: async (sort: ProductsSortEnum): Promise<Product[]> => {
    const { data } = await api.get(apiProductsUrl, {
      params: {
        sort,
      },
    });

    return data;
  },
};
