package com.jee.back.controller;

import com.jee.back.constant.SUCCESS_MESSAGE;
import com.jee.back.dto.*;
import com.jee.back.repository.UserRepository;
import com.jee.back.service.UserService;
import com.jee.back.util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final CookieUtil cookieUtil;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginDTO loginDTO,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) {
        return ResponseEntity.ok().body(userService.login(loginDTO, request, response));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(HttpServletResponse response) {
        cookieUtil.clearCookies(response);
        SecurityContextHolder.clearContext();
        log.info(ApiResponse.success(SUCCESS_MESSAGE.LOGOUT, null));
        return ResponseEntity.ok(ApiResponse.success(SUCCESS_MESSAGE.LOGOUT, null));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody RegisterUserDTO registerUserDTO) {
        return ResponseEntity.ok(userService.register(registerUserDTO));
    }

    @GetMapping("/login/github")
    public ResponseEntity<Void> loginWithGitHub() {
        return ResponseEntity.status(HttpStatus.FOUND)
                .header("Location", "/oauth2/authorization/github")
                .build();
    }
}
