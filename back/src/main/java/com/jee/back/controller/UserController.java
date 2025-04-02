package com.jee.back.controller;

import com.jee.back.dto.ApiResponse;
import com.jee.back.dto.UserResponse;
import com.jee.back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping()
    public ResponseEntity<ApiResponse> getUsers() {
        return ResponseEntity.ok(ApiResponse.success("users", userService.getAllUsers()));
    }
}
