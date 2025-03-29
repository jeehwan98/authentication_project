package com.jee.back.dto;

import java.util.Collections;

public class ApiResponse<T> {
    private boolean success;
    private Object message;
    private T data;

    public static <T> ApiResponse<T> success(String message, T data) {
        ApiResponse<T> response = new ApiResponse<>();
        response.success = true;
        response.message = message;
        response.data = data;
        return response;
    }

    public static <T> ApiResponse<T> failure(String key, String errorMessage) {
        ApiResponse<T> response = new ApiResponse<>();
        response.success = false;
        response.message = Collections.singletonMap(key, errorMessage); // Returns a Map
        response.data = null;
        return response;
    }

    public boolean isSuccess() { return success; }
    public Object getMessage() { return message; }
    public T getData() { return data; }
}
