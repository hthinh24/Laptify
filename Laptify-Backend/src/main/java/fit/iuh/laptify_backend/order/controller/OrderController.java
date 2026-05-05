package fit.iuh.laptify_backend.order.controller;

import fit.iuh.laptify_backend.order.dto.request.*;
import fit.iuh.laptify_backend.order.dto.response.OrderDisplayResponse;
import fit.iuh.laptify_backend.order.dto.response.OrderResponse;
import fit.iuh.laptify_backend.order.service.OrderService;
import fit.iuh.laptify_backend.product.dto.common.PageRequest;
import fit.iuh.laptify_backend.product.dto.common.PageResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/orders")
public class OrderController {
    private final OrderService orderService;

    @GetMapping("/latest-placement-info")
    public ResponseEntity<?> getLatestSavedCustomerInfo(
            @AuthenticationPrincipal(expression = "id") Long userId
    ){
        return ResponseEntity.ok(orderService.getLatestCustomerPlacementInfo(userId));
    }

    @GetMapping("/track-order/{tracking_code}")
    public ResponseEntity<OrderResponse> getOrderByTrackingCode(@PathVariable(name = "tracking_code") String trackingCode){
        return ResponseEntity.ok(orderService.getOrderByTrackingCode(trackingCode));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable("id") Long orderId){
        return ResponseEntity.ok(orderService.getOrderById(orderId));
    }

    @GetMapping()
    public ResponseEntity<PageResponse<List<OrderDisplayResponse>>> getOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size)
    {
        PageRequest pageRequest = new PageRequest(page, size);
        return ResponseEntity.ok(orderService.getOrders(pageRequest));
    }

    @GetMapping("/search")
    public ResponseEntity<PageResponse<List<OrderDisplayResponse>>> searchOrder(
            @ModelAttribute OrderFilter request,
            @PageableDefault(direction = Sort.Direction.DESC, sort = "orderDate") Pageable pageable)
    {
        log.info("REQUEST " + request.toString());
        return ResponseEntity.ok(orderService.searchOrderByFilter(pageable, request));
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderCreationRequest request){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(orderService.createOrder(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderResponse> updateOrder(
        @PathVariable("id") Long orderId,
        @RequestBody OrderUpdatingRequest request
    ){
        return ResponseEntity
                .ok(orderService.updateOrder(request, orderId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderResponse> updateOrder(
            @PathVariable("id") Long orderId,
            @RequestBody OrderStatusUpdatingRequest request
            ){
        return ResponseEntity
                .ok(orderService.updateOrderStatus(request, orderId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteOrderById(
            @PathVariable("id") Long orderId
    ){
        return ResponseEntity
                .ok(orderService.deleteOrderById( orderId));
    }
}
