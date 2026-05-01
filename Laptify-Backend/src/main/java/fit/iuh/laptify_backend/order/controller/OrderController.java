package fit.iuh.laptify_backend.order.controller;

import fit.iuh.laptify_backend.order.dto.request.OrderCreationRequest;
import fit.iuh.laptify_backend.order.dto.response.OrderDisplayResponse;
import fit.iuh.laptify_backend.order.dto.response.OrderResponse;
import fit.iuh.laptify_backend.order.service.OrderService;
import fit.iuh.laptify_backend.product.dto.common.PageRequest;
import fit.iuh.laptify_backend.product.dto.common.PageResponse;
import fit.iuh.laptify_backend.product.dto.response.ProductSummaryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/orders")
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<OrderResponse> getOrderByTrackingCode(@RequestParam(name = "tracking_code") String trackingCode){
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

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderCreationRequest request){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(orderService.createOrder(request));
    }
}
