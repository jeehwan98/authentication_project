package com.jee.back.util;

import com.jee.back.entity.Role;
import com.jee.back.entity.User;
import io.jsonwebtoken.*;
import jakarta.annotation.PostConstruct;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Log4j2
@Component
public class JwtTokenUtil {
    private static String SECRET_KEY;
    public static final long ACCESS_TOKEN_EXPIRATION = 60 * 60 * 1000;      // 1 hour
    public static final long REFRESH_TOKEN_EXPIRATION = 7 * 24 * 60 * 1000; // 7 days
    @Value("${jwt.secret-key}")
    private String secretKey;
    @PostConstruct
    public void init() {
        SECRET_KEY = secretKey;
    }

    Map<String, Object> claims = new HashMap<>();

    public String generateAccessToken(User user) {
        claims = createClaims(user);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public String generateRefreshToken(User user) {
        claims = createClaims(user);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public Map<String, Object> createClaims(User user) {
        claims.put("id", user.getId());
        claims.put("email", user.getEmail());
        claims.put("role", user.getRole());
        claims.put("image", user.getImage());
        claims.put("name", user.getName());
        claims.put("createdAt", user.getCreatedAt());
        return claims;
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String extractedEmail = extractEmail(token);
        return (extractedEmail.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
