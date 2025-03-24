package com.jee.back.filter;

import com.jee.back.util.JwtTokenUtil;
import com.jee.back.utils.AuthConstants;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/** filter that intercepts requests and validates JWT token */
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsService userDetailsService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader(AuthConstants.AUTH_HEADER);

        try {
            if (header != null && !header.equalsIgnoreCase("")) {
                String token = splitHeader(header);

                if (jwtTokenUtil.validateToken(token)) {
                    String email = jwtTokenUtil.extractEmail(token);
                    System.out.println("email?: " + email);
                    UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                    Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    filterChain.doFilter(request, response);
                }
            }
        } catch (Exception e) {
            throw e;
        }

        filterChain.doFilter(request, response);
    }

    private String splitHeader(String header) {
        if (header != null) {
            return header.split(" ")[1];
        } else {
            return null;
        }
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AuthConstants.AUTH_HEADER);
        System.out.println("bearerToken: " + bearerToken);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(AuthConstants.TOKEN_TYPE)) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
