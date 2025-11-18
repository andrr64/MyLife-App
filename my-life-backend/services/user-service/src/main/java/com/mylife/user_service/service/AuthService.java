package com.mylife.user_service.service;

import com.mylife.user_service.dto.request.LoginRequest;
import com.mylife.user_service.dto.request.RegisterRequest;
import com.mylife.user_service.dto.response.AuthResponse;

public interface AuthService {
    void register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
    AuthResponse createRefreshToken(String refreshToken);
}
