package com.jee.back.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class LoginResponse {
    private UserResponse user;
    private String accessToken;
    private String refreshToken;

    public LoginResponse(UserResponse user, String accessToken, String refreshToken) {
        this.user = user;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
