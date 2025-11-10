package com.andreas.mylife.finance_service.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Data // Gunakan @Data agar Getter, Setter, toString, dll otomatis ada
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

    private Integer statusCode;

    private String message;

    private T data;

    private Object details; // FIELD INI WAJIB ADA untuk menampung error validasi

    // --- FACTORY METHODS ---

    // 1. Sukses basic
    public static <T> ApiResponse<T> success(String message) {
        return ApiResponse.<T>builder()
                .statusCode(HttpStatus.OK.value())
                .message(message)
                .build();
    }

    // 2. Sukses dengan data
    public static <T> ApiResponse<T> success(T data, String message) {
        return ApiResponse.<T>builder()
                .statusCode(HttpStatus.OK.value())
                .message(message)
                .data(data)
                .build();
    }

    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.<T>builder()
                .statusCode(HttpStatus.OK.value())
                .message("Ok")
                .data(data)
                .build();
    }

    // 3. Error standar
    public static <T> ApiResponse<T> error(HttpStatus status, String message) {
        return ApiResponse.<T>builder()
                .statusCode(status.value()) // Masukkan status code agar frontend tau
                .message(message)
                .build();
    }

    // 4. Error dengan details (BUG KAMU DISINI TADI)
    public static <T> ApiResponse<T> error(HttpStatus status, String message, Object details) {
        return ApiResponse.<T>builder()
                .statusCode(status.value())
                .message(message)
                .details(details) // TADI INI HILANG, makanya response validasi kosong
                .build();
    }
}