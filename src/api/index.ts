import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
})

api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (isAxiosError(error)) {
      toast.error(error.response?.data?.message || error.message);
    } else {
      toast.error('An unexpected error occurred');
    }

    return Promise.reject(error);
  }
);