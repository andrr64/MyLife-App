package com.andreas.mylife.userservice.service;

import com.andreas.mylife.common.dto.ApiResponse;
import com.andreas.mylife.userservice.dto.response.UserResponse;

import java.util.UUID;

public interface UserService {
    UserResponse getUserInfo(UUID userId);
}
