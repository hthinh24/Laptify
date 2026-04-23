package fit.iuh.laptify_backend.auth.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import fit.iuh.laptify_backend.auth.config.JwtProperties;
import fit.iuh.laptify_backend.auth.dto.common.JwtClaimsDto;
import fit.iuh.laptify_backend.auth.dto.common.JwtGenerationDto;
import fit.iuh.laptify_backend.auth.entity.User;
import fit.iuh.laptify_backend.auth.exception.InvalidToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.text.ParseException;
import java.util.Date;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtTokenProvider {
    private final JwtProperties jwtProperties;

    private SecretKey getSecretKey() {
        byte[] keyBytes = jwtProperties.getSecretKey().getBytes();
        return new SecretKeySpec(keyBytes, JWSAlgorithm.HS256.getName());
    }

    public JwtGenerationDto generateAccessToken(User user) {
        return buildToken(user, jwtProperties.getExpirationMs(), true);
    }

    public JwtGenerationDto generateRefreshToken(User user) {
        return buildToken(user, jwtProperties.getRefreshExpirationMs(), false);
    }

    private JwtGenerationDto buildToken(User user, long expirationMs, boolean isAccessToken) {
        try {
            // Create JWT claims
            Date now = new Date();
            Date expiryDate = new Date(now.getTime() + expirationMs);

            String jid = UUID.randomUUID().toString();

            JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                    .subject(user.getEmail())
                    .claim("jid", jid)
                    .claim("userId" , user.getId().toString())
                    .claim("role", user.getRole().getName().toString())
                    .claim("type", isAccessToken ? "access" : "refresh")
                    .issuer(jwtProperties.getIssuer())
                    .issueTime(now)
                    .expirationTime(expiryDate)
                    .build();

            // Create signed JWT
            SignedJWT signedJWT = new SignedJWT(
                    new JWSHeader.Builder(JWSAlgorithm.HS256).build(),
                    claimsSet
            );

            // Sign with HMAC-SHA512
            signedJWT.sign(new MACSigner(getSecretKey()));

            return new JwtGenerationDto(jid, signedJWT.serialize());

        } catch (JOSEException e) {
            throw new RuntimeException("Error building JWT token", e);
        }
    }

    public JwtClaimsDto extractClaimsFromRefreshToken(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);

            // Verify signature
            if (!signedJWT.verify(new MACVerifier(getSecretKey()))) {
                throw new RuntimeException("Invalid token signature");
            }

            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();

            // Check expiration
            Date now = new Date();
            if (claims.getExpirationTime().before(now)) {
                throw new RuntimeException("Token expired");
            }

            // Check type (phải là refresh)
            String type = (String) claims.getClaim("type");
            boolean isRefresh = "refresh".equals(type);

            if (!isRefresh) {
                throw new RuntimeException("Not a refresh token");
            }

            // Map sang DTO
            JwtClaimsDto dto = new JwtClaimsDto();
            dto.setUserId(Long.parseLong((String) claims.getClaim("userId")));
            dto.setJid((String) claims.getClaim("jid"));
            dto.setEmail(claims.getSubject());
            dto.setRefresh(true);

            return dto;

        } catch (Exception e) {
            throw new RuntimeException("Error parsing refresh token", e);
        }
    }


    public void validateToken(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);

            // Verify signature
            MACVerifier verifier = new MACVerifier(getSecretKey());
            boolean signatureValid = signedJWT.verify(verifier);

            if (!signatureValid) {
                throw new InvalidToken();
            }

            // Check expiration
            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();
            Date expirationTime = claims.getExpirationTime();
            Date now = new Date();

            if(expirationTime == null || expirationTime.before(now)){
                throw new InvalidToken();
            }

        } catch (JOSEException | ParseException e) {
            throw new InvalidToken();
        }
    }


    public long getRefreshTokenExpiration() {
        return jwtProperties.getRefreshExpirationMs();
    }
}
