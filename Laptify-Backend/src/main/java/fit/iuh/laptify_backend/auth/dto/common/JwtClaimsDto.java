package fit.iuh.laptify_backend.auth.dto.common;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class JwtClaimsDto {
    private Long userId;
    private String jid;
    private String email;
    private boolean isRefresh;
}
