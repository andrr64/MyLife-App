package com.andreas.mylife.userservice.service;

import com.andreas.mylife.userservice.dto.request.LoginRequest;
import com.andreas.mylife.userservice.dto.request.RegisterRequest;
import com.andreas.mylife.userservice.dto.response.AuthResponse;

public interface AuthService {
    void register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
    AuthResponse createRefreshToken(String refreshToken);
}
