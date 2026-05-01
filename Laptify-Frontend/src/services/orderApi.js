import { axiosClient } from "@/lib/axiosClient.js";

export const createOrder = (order) => {
  return axiosClient.post('/v1/orders', order);
};

export const getOrderById = (id) => {
  return axiosClient.get(`/v1/orders/${id}`);
};

export const getOrderByTrackingCode = (trackingcode) => {
  return axiosClient.get(`/v1/orders?tracking_code=${trackingcode}`);
};
