package com.mylife.user_service.service.impl;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mylife.user_service.dto.request.LoginRequest;
import com.mylife.user_service.dto.request.RegisterRequest;
import com.mylife.user_service.dto.response.AuthResponse;
import com.mylife.user_service.model.User;
import com.mylife.user_service.repository.UserRepository;
import com.mylife.user_service.service.AuthService;
import com.mylife.user_service.util.JwtUtil;

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
            throw new RuntimeException("Email already registered");
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

}
