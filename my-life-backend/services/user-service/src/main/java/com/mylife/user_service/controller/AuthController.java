package com.mylife.user_service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mylife.user_service.dto.request.LoginRequest;
import com.mylife.user_service.dto.request.RegisterRequest;
import com.mylife.user_service.dto.response.ApiResponse;
import com.mylife.user_service.dto.response.AuthResponse;
import com.mylife.user_service.service.AuthService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user-service/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ApiResponse<String> register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
        return ApiResponse.success("User registered successfully.");
    }

    @PostMapping("/refresh")
    public ApiResponse<AuthResponse> refreshToken(
            @CookieValue(name = "refresh_token", required = false) String refreshToken,
            HttpServletResponse response) {
        
        // 1. Cek Token
        if (refreshToken == null || refreshToken.isEmpty()) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return ApiResponse.error(HttpStatus.UNAUTHORIZED, "Refresh Token is missing");
        }

        try {
            // 2. Panggil Service
            AuthResponse newTokens = authService.createRefreshToken(refreshToken);

            // 3. Buat Cookie Access Token Baru
            ResponseCookie accessCookie = ResponseCookie.from("access_token", newTokens.getAccessToken())
                    .httpOnly(true)
                    .secure(false) // Masih HTTP
                    .sameSite("Lax")
                    .path("/")
                    .maxAge(15 * 60) // 15 menit
                    .build();

            // 4. Buat Cookie Refresh Token Baru (Rotation)
            ResponseCookie refreshCookie = ResponseCookie.from("refresh_token", newTokens.getRefreshToken())
                    .httpOnly(true)
                    .secure(false) // Masih HTTP
                    .sameSite("Lax")
                    .path("/")
                    .maxAge(60 * 60 * 24 * 7) // 7 hari
                    .build();

            // 5. Set Cookies via HttpServletResponse
            response.addHeader("Set-Cookie", accessCookie.toString());
            response.addHeader("Set-Cookie", refreshCookie.toString());

            // 6. Return Body
            return ApiResponse.success(newTokens);

        } catch (Exception e) {
            // Hapus cookies jika error
            ResponseCookie cleanAccess = ResponseCookie.from("access_token", "")
                    .path("/")
                    .maxAge(0)
                    .build();
            ResponseCookie cleanRefresh = ResponseCookie.from("refresh_token", "")
                    .path("/")
                    .maxAge(0)
                    .build();
            
            response.addHeader("Set-Cookie", cleanAccess.toString());
            response.addHeader("Set-Cookie", cleanRefresh.toString());
            
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return ApiResponse.error(HttpStatus.UNAUTHORIZED, "Refresh failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletResponse response) {
        
        AuthResponse tokens = authService.login(request);

        // KEMBALIKAN KODE LAMA: Set Access Token ke Cookie
        ResponseCookie accessCookie = ResponseCookie.from("access_token", tokens.getAccessToken())
                .httpOnly(true)
                .secure(false) // Masih HTTP
                .sameSite("Lax")
                .path("/")
                .maxAge(15 * 60) // 15 menit
                .build();

        // Set Refresh Token ke Cookie
        ResponseCookie refreshCookie = ResponseCookie.from("refresh_token", tokens.getRefreshToken())
                .httpOnly(true)
                .secure(false) // Masih HTTP
                .sameSite("Lax")
                .path("/")
                .maxAge(60 * 60 * 24 * 7) // 7 hari
                .build();

        response.addHeader("Set-Cookie", accessCookie.toString());
        response.addHeader("Set-Cookie", refreshCookie.toString());
        
        return ApiResponse.success(tokens);
    }
}