package com.andreas.mylife.common.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.andreas.mylife.common.dto.ApiResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.http.MediaType;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class TokenAuthenticationEntryPoint implements AuthenticationEntryPoint {

    // 1. Jangan di-new manual!
    private final ObjectMapper objectMapper;

    // 2. Inject lewat Constructor (Spring akan memberimu ObjectMapper yang sudah disetting)
    public TokenAuthenticationEntryPoint(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {

        // Set Status Code 401
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // Set Content Type JSON
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        // Buat Object Error
        ApiResponse<Object> apiResponse = ApiResponse.error(
                org.springframework.http.HttpStatus.UNAUTHORIZED,
                "Unauthorized: Please login first."
        );

        // Tulis Manual ke Response Stream
        // Sekarang objectMapper ini SUDAH BISA membaca LocalDateTime
        response.getWriter().write(objectMapper.writeValueAsString(apiResponse));
    }
}