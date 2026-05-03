package fit.iuh.laptify_backend.order.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class CustomerOrderInfoResponse {
    private String customerName;
    private String phoneNumber;
    private String email;
    private String address;
}
