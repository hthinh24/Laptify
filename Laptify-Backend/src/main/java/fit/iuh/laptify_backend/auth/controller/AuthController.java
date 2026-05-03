package fit.iuh.laptify_backend.auth.controller;

import fit.iuh.laptify_backend.auth.dto.request.UserLoginRequest;
import fit.iuh.laptify_backend.auth.dto.request.UserRegisterRequest;
import fit.iuh.laptify_backend.auth.dto.response.AuthResult;
import fit.iuh.laptify_backend.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public void register(@RequestBody UserRegisterRequest request) {
        authService.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest request) {
        AuthResult authResult = authService.login(request);

        return ResponseEntity.ok()
                .header("Set-Cookie", authResult.getRefreshToken().toString())
                .body(authResult.getAuthResponse());
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@CookieValue("REFRESH_TOKEN") String refreshToken) {
        AuthResult authResult = authService.refreshToken(refreshToken);

        return ResponseEntity.ok()
                .header("Set-Cookie", authResult.getRefreshToken().toString())
                .body(authResult.getAuthResponse());
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@CookieValue(name = "REFRESH_TOKEN") String refreshToken){
        ResponseCookie responseCookie = authService.logout(refreshToken);
        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .build();
    }
}
