package fit.iuh.laptify_backend.order.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Instant;
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDisplayResponse {
    private Long id;
    private String customerName;
    private String phoneNumber;
    private Instant orderDate;
    private BigDecimal totalPrice;
    private String status;
}
