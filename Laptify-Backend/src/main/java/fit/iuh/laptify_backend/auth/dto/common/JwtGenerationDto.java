package fit.iuh.laptify_backend.auth.dto.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class JwtGenerationDto {
    private String jid;
    private String token;
}
