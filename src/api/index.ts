import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
})

api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (isAxiosError(error)) {
      toast.error(error.response?.data?.message || error.message);
    } else {
      toast.error('An unexpected error occurred');
    }

    // Re-throw the error to allow specific handling if needed
    return Promise.reject(error);
  }
);