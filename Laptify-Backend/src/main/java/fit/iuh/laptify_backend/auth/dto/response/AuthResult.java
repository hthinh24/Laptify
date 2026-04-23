package fit.iuh.laptify_backend.auth.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseCookie;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AuthResult {
    private AuthResponse authResponse;
    private ResponseCookie refreshToken;
}
