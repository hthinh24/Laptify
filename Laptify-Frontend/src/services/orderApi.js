import { axiosClient } from "@/lib/axiosClient.js";
import { useSearchParams } from "react-router-dom";

export const createOrder = (order) => {
  return axiosClient.post('/v1/orders', order);
};

export const getOrderById = (id) => {
  return axiosClient.get(`/v1/orders/${id}`);
};

export const getOrderByTrackingCode = (trackingcode) => {
  const params = new useSearchParams({
    trackingCode: trackingcode,
  });

  return axiosClient.get(`/v1/orders/${params.toString()}`);
};
