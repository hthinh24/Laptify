package fit.iuh.laptify_backend.auth.service.impl;

import fit.iuh.laptify_backend.advice.exception.UnauthorizedException;
import fit.iuh.laptify_backend.auth.dto.common.JwtClaimsDto;
import fit.iuh.laptify_backend.auth.dto.common.JwtGenerationDto;
import fit.iuh.laptify_backend.auth.dto.request.UserLoginRequest;
import fit.iuh.laptify_backend.auth.dto.request.UserRegisterRequest;
import fit.iuh.laptify_backend.auth.dto.response.AuthResult;
import fit.iuh.laptify_backend.auth.dto.response.AuthResponse;
import fit.iuh.laptify_backend.auth.dto.response.UserSessionResponse;
import fit.iuh.laptify_backend.auth.entity.*;
import fit.iuh.laptify_backend.auth.repository.RefreshTokenRepository;
import fit.iuh.laptify_backend.auth.repository.RoleRepository;
import fit.iuh.laptify_backend.auth.repository.UserRepository;
import fit.iuh.laptify_backend.auth.service.AuthService;
import fit.iuh.laptify_backend.auth.service.JwtTokenProvider;
import fit.iuh.laptify_backend.cart.entity.Cart;
import fit.iuh.laptify_backend.advice.exception.ResourceAlreadyExisted;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.UUID;

@Service
@RequiredArgsConstructor

public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !(auth.getPrincipal() instanceof UserPrincipal)) {
            return null;
        }

        UserPrincipal user =  (UserPrincipal) auth.getPrincipal();
        Long userId = user.getId();
        return userRepository.findById(userId)
                .orElseThrow(() -> new UnauthorizedException("User not found"));
    }

    @Override
    public void register(UserRegisterRequest request) {
        if(userRepository.existsUserByEmail((request.getEmail()))){
            throw new ResourceAlreadyExisted("Email already existed");
        }

        String hashedPassword = bCryptPasswordEncoder.encode(request.getPassword());

        User user = new User(request.getEmail(), request.getName(), hashedPassword);
        Role role = roleRepository.findByName(RoleName.USER);

        if(role == null){
            throw new EntityNotFoundException("Role " + RoleName.USER + " not found");
        }

        Cart cart = new Cart(user);

        user.setRole(role);
        user.setCart(cart);

        userRepository.save(user);
    }


    @Override
    public AuthResult login(UserLoginRequest request) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());

        Authentication authentication = authenticationManager.authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        RefreshToken tokenEntity = buildRefreshToken(user);

        refreshTokenRepository.save(tokenEntity);

        return buildAuthResult(user, tokenEntity.getToken());
    }

    @Override
    @Transactional
    public AuthResult refreshToken(String refreshToken) {
        jwtTokenProvider.validateToken(refreshToken);

        JwtClaimsDto claimsDto =  jwtTokenProvider.extractClaimsFromRefreshToken(refreshToken);

        User user = userRepository.findById(claimsDto.getUserId())
                .orElseThrow(() -> new UnauthorizedException("User not found"));

        String jid = claimsDto.getJid();
//        delete old
        refreshTokenRepository.deleteById(jid);

        RefreshToken tokenEntity = buildRefreshToken(user);

//        save new one
        refreshTokenRepository.save(tokenEntity);

        return buildAuthResult(user, tokenEntity.getToken());
    }


    private AuthResult buildAuthResult(User user, String refreshToken) {
        String accessToken = buildAccessToken(user);

        UserSessionResponse userSession = new UserSessionResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().getName().toString()
        );

        AuthResponse authResponse = new AuthResponse(userSession, accessToken);

        ResponseCookie refreshTokenCookie = ResponseCookie
                .from("REFRESH_TOKEN", refreshToken)
                .httpOnly(true)
                .path("/")
                .sameSite("Lax")
                .maxAge(Duration.ofMillis(jwtTokenProvider.getRefreshTokenExpiration()))
                .build();

        return new AuthResult(authResponse, refreshTokenCookie);
    }

    private String buildAccessToken(User user) {
        return jwtTokenProvider.generateAccessToken(user).getToken();
    }

    private RefreshToken buildRefreshToken(User user) {
        JwtGenerationDto dto = jwtTokenProvider.generateRefreshToken(user);
        return new RefreshToken(dto.getJid(), dto.getToken(), user);
    }

}
