package com.jee.back.controller;

import com.jee.back.dto.*;
import com.jee.back.entity.User;
import com.jee.back.repository.UserRepository;
import com.jee.back.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@Log4j2
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginDTO loginDTO,
                                                     HttpServletRequest request,
                                                     HttpServletResponse response) {
        return ResponseEntity.ok().body(userService.login(loginDTO, request, response));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody RegisterUserDTO registerUserDTO) {
        ApiResponse response;
        Optional<User> existingUser = userRepository.findByEmail(registerUserDTO.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ApiResponse.failure("Email is taken"));
        }
        response = userService.register(registerUserDTO);
        return ResponseEntity.ok(response);
    }
}
