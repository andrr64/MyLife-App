package com.mylife.user.service;

import com.mylife.user.dto.request.LoginRequest;
import com.mylife.user.dto.request.RegisterRequest;
import com.mylife.user.dto.response.AuthResponse;

public interface AuthService {
    void register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
    AuthResponse createRefreshToken(String refreshToken);
}
