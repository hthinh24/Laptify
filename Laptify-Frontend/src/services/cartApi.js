import { axiosClient } from '@/lib/axiosClient.js';

export const addToCart = (item) => {
  return axiosClient.post('/v1/carts', item);
};

export const getUserCart = ({ page = 0, size = 5 }) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  return axiosClient.get(`/v1/carts?${params.toString()}`);
};

export const getItemsUserCart = ({ page = 0, size = 5 }) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  return axiosClient.get(`/v1/carts/items?${params.toString()}`);
};

export const updateItemQuantity = (itemUpdatingRequest) => {
  return axiosClient.put(`/v1/carts`, itemUpdatingRequest);
};

export const removeItem = (skuCode) => {
  return axiosClient.delete(`/v1/carts/${skuCode}`);
};