package com.andreas.mylife.userservice.service.impl;

import com.andreas.mylife.userservice.dto.response.UserResponse;
import com.andreas.mylife.userservice.model.User;
import com.andreas.mylife.userservice.repository.UserRepository;
import com.andreas.mylife.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public UserResponse getUserInfo(UUID userId) {
        User user = userRepository.findById(userId).orElseThrow( () -> new BadCredentialsException("OK"));
        return UserResponse.builder()
                .fullName(user.getFullName())
                .build();
    }
}
