package fit.iuh.laptify_backend.order.service;

import fit.iuh.laptify_backend.order.dto.request.OrderCreationRequest;
import fit.iuh.laptify_backend.order.dto.response.OrderDisplayResponse;
import fit.iuh.laptify_backend.order.dto.response.OrderResponse;
import fit.iuh.laptify_backend.product.dto.common.PageRequest;
import fit.iuh.laptify_backend.product.dto.common.PageResponse;

import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderCreationRequest request);
    OrderResponse getOrderByTrackingCode(String trackingCode);
    OrderResponse getOrderById(Long orderId);
    PageResponse<List<OrderDisplayResponse>> getOrders(PageRequest page);
}
