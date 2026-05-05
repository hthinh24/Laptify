package fit.iuh.laptify_backend.order.dto.request;

import fit.iuh.laptify_backend.order.entity.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class OrderUpdatingRequest {
    private String customerName;
    private String address;
    private String phoneNumber;
}
