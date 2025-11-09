package com.mylife.user_service.dto.response;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    private String message;
    private T data;

    // 1. Sukses tanpa data (misal: DELETE /logout)
    public static <T> ApiResponse<T> success(String message) {
        return ApiResponse.<T>builder()
                .message(message)
                .build();
    }

    // 2. Sukses dengan data (misal: GET /profile)
    public static <T> ApiResponse<T> success(T data, String message) {
        return ApiResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }

    // 3. Error standar
    public static <T> ApiResponse<T> error(HttpStatus status, String message) {
        return ApiResponse.<T>builder()
                .message(message)
                .build();
    }

    // 4. Error dengan details (misal: validasi form gagal)
    public static <T> ApiResponse<T> error(HttpStatus status, String message, Object details) {
        return ApiResponse.<T>builder()
                .message(message)
                .build();
    }
}
