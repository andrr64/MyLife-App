package com.andreas.mylife.userservice.service.impl;

import java.util.UUID;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.andreas.mylife.userservice.dto.request.LoginRequest;
import com.andreas.mylife.userservice.dto.request.RegisterRequest;
import com.andreas.mylife.userservice.dto.response.AuthResponse;
import com.andreas.mylife.userservice.exception.EmailAlreadyException;
import com.andreas.mylife.userservice.model.User;
import com.andreas.mylife.userservice.repository.UserRepository;
import com.andreas.mylife.userservice.service.AuthService;
import com.andreas.mylife.userservice.util.JwtUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    @Transactional
    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyException();
        }
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        userRepository.save(user);
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(
                () -> new BadCredentialsException("Invalid credential."));
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid credential.");
        }
        String accessToken = jwtUtil.generateToken(user);
        String refreshToken = jwtUtil.generateToken(user);
        return new AuthResponse(accessToken, refreshToken);
    }

    @Override
    public AuthResponse createRefreshToken(String refreshToken) {
        // 1. Validasi Token (Signature & Expiry)
        // Kita ekstrak subject (UserId) dari token. Kalau expired/invalid, ini akan
        // throw error JJWT
        String userId = jwtUtil.extractUsername(refreshToken);

        // 2. Cek apakah user benar-benar ada di DB
        User user = userRepository.findById(UUID.fromString(userId))
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 3. (Opsional tapi Recommended) Cek validitas token spesifik
        if (!jwtUtil.isTokenValid(refreshToken, userId)) {
            throw new RuntimeException("Invalid Refresh Token");
        }

        // 4. Generate Access Token Baru
        String newAccessToken = jwtUtil.generateToken(user);

        // 5. (Opsional) Refresh Token Rotation
        // Best practicenya: Saat refresh, ganti juga refresh tokennya biar makin aman
        String newRefreshToken = jwtUtil.generateRefreshToken(user);

        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
    }

}
