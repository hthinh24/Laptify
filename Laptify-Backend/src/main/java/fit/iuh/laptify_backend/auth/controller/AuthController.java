package fit.iuh.laptify_backend.auth.controller;

import fit.iuh.laptify_backend.auth.dto.request.UserRegisterRequest;
import fit.iuh.laptify_backend.auth.dto.request.UserLoginRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterRequest request) {

        System.out.println("Register API called");
        System.out.println(request.getName());
        System.out.println(request.getEmail());
        System.out.println(request.getPassword());

        return ResponseEntity.ok("Register success");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginRequest request) {

        System.out.println("Login API called");
        System.out.println(request.getEmail());
        System.out.println(request.getPassword());

        return ResponseEntity.ok("Login success");
    }
}