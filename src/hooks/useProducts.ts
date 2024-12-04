import axios from "axios";
import { useQuery } from "react-query";
import { Product } from "../entities";

export const useProducts = () =>
  useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: () => axios.get("/products").then((res) => res.data),
  });