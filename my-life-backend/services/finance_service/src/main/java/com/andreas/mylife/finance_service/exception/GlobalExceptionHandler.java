package com.andreas.mylife.finance_service.exception;

import com.andreas.mylife.finance_service.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 1. Handle Resource Not Found (404)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleResourceNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error(HttpStatus.NOT_FOUND, ex.getMessage()));
    }

    // 2. Handle Business Validation & Conflict (400 / 409)
    @ExceptionHandler({ BusinessValidationException.class, ResourceConflictException.class })
    public ResponseEntity<ApiResponse<Object>> handleBusinessException(RuntimeException ex) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        if (ex instanceof ResourceConflictException) {
            status = HttpStatus.CONFLICT;
        }
        return ResponseEntity.status(status)
                .body(ApiResponse.error(status, ex.getMessage()));
    }

    // 3. Handle Validation Error (@Valid di DTO) (400)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Object>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error(HttpStatus.BAD_REQUEST, "Validation Failed", errors));
    }

    // 4. Handle General Exception (500) - Jaring pengaman terakhir
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGeneralException(Exception ex) {
        ex.printStackTrace(); // PENTING: Log error asli di server
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred"));
    }
}