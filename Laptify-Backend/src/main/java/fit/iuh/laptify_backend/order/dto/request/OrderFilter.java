package fit.iuh.laptify_backend.order.dto.request;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
@Setter
public class OrderFilter {
    private String orderId;;
    private String phoneNumber;
    private String status;
    private LocalDate orderDate;
}
