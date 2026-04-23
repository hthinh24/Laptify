import { axiosClient } from "@/lib/axiosClient.js";

export const getProducts = ({ page = 0, size = 5 }) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  return axiosClient.get(`/v1/products?${params.toString()}`);
};

export const createProduct = (data) => {
  return axiosClient.post(`/v1/products`, data);
};

export const getProductById = (id) => {
  return axiosClient.get(`/v1/products/${id}`);
};
