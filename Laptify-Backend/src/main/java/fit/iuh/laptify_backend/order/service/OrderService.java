package fit.iuh.laptify_backend.order.service;

import fit.iuh.laptify_backend.order.dto.request.OrderCreationRequest;
import fit.iuh.laptify_backend.order.dto.request.OrderFilter;
import fit.iuh.laptify_backend.order.dto.request.OrderStatusUpdatingRequest;
import fit.iuh.laptify_backend.order.dto.request.OrderUpdatingRequest;
import fit.iuh.laptify_backend.order.dto.response.CustomerOrderInfoResponse;
import fit.iuh.laptify_backend.order.dto.response.OrderDisplayResponse;
import fit.iuh.laptify_backend.order.dto.response.OrderResponse;
import fit.iuh.laptify_backend.order.entity.OrderStatus;
import fit.iuh.laptify_backend.product.dto.common.PageRequest;
import fit.iuh.laptify_backend.product.dto.common.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.ListResourceBundle;

public interface OrderService {
    OrderResponse createOrder(OrderCreationRequest request);
    OrderResponse getOrderByTrackingCode(String trackingCode);
    OrderResponse getOrderById(Long orderId);
    PageResponse<List<OrderDisplayResponse>> getOrders(PageRequest page);
    CustomerOrderInfoResponse getLatestCustomerPlacementInfo(Long userId);
    OrderResponse updateOrder(OrderUpdatingRequest request, Long orderId);
    OrderResponse updateOrderStatus(OrderStatusUpdatingRequest orderStatus, Long orderId);
    PageResponse<List<OrderDisplayResponse>> searchOrderByFilter(Pageable page, OrderFilter orderFilter);
    Long deleteOrderById(Long orderId);
}
