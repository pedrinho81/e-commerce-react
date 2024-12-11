import toast from "react-hot-toast";
import { api } from "../../../api";
import { Product } from "../../../entities";
import { ProductFormData } from "../schemas/productSchema";

const apiProductsUrl = "/products";

export const AdminProductService = {
  Update: async (product: ProductFormData): Promise<Product[]> => {
    const { data } = await api.put(`${apiProductsUrl}/${product.id}`, product);
    toast.success("Done");
    return data;
  },
};
