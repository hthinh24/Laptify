import { axiosClient } from "@/lib/axiosClient.js";

export const getProducts = ({ page = 0, size = 5 }) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  return axiosClient.get(`/v1/products?${params.toString()}`);
};

export const searchProductsByProductsByCriteria = ({ params }) => {
  return axiosClient.get(`/v1/products/filter?${params}`);
};

export const getProductSummaries = ({ page = 0, size = 5 }) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  return axiosClient.get(`/v1/products/summaries?${params.toString()}`);
};

export const createProduct = (data) => {
  return axiosClient.post(`/v1/products`, data);
};

export const getProductById = (id) => {
  return axiosClient.get(`/v1/products/${id}`);
};
