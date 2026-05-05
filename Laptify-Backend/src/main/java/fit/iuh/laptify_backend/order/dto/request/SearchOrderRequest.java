package fit.iuh.laptify_backend.order.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class SearchOrderRequest {
    private String orderId;
    private String phoneNumber;
    private String status;
    private @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate orderDate;
    private int page = 0;
    private int size = 20;

    public OrderFilter toOrderFilter() {
        return new OrderFilter(orderId, phoneNumber, status, orderDate);
    }

    public fit.iuh.laptify_backend.product.dto.common.PageRequest toPageRequest() {
        return new fit.iuh.laptify_backend.product.dto.common.PageRequest(page, size);
    }
}
