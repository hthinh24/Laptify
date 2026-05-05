import { axiosClient } from '@/lib/axiosClient.js';

export const createOrder = (order) => {
  return axiosClient.post('/v1/orders', order);
};

export const getOrderById = (id) => {
  return axiosClient.get(`/v1/orders/${id}`);
};

export const getOrderByTrackingCode = (trackingcode) => {
  return axiosClient.get(`/v1/orders/track-order/${trackingcode}`);
};

export const getLatestCustomerPlacementInfo = () => {
  return axiosClient.get('/v1/orders/latest-placement-info');
};

export const getOrdersDisPlayForAdmin = ({ size = 5, page = 0 }) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });
  return axiosClient.get(`/v1/orders?${params.toString()}`);
};

export const searchOrderByFilter = ({ params }) => {
  return axiosClient.get(`/v1/orders/search?${params}`);
};

export const updateOrderStatusForAdmin = (request, id) => {
  return axiosClient.put(`/v1/orders/${id}/status`, request);
};

export const updateOrderForAdmin = (request, id) => {
  return axiosClient.put(`/v1/orders/${id}`, request);
};

export const deleteOrderById = ( id) => {
  return axiosClient.delete(`/v1/orders/${id}`);
};