package com.andreas.mylife.userservice.controller;

import com.andreas.mylife.common.util.SecurityUtils;
import com.andreas.mylife.userservice.dto.response.ApiResponse;
import com.andreas.mylife.userservice.dto.response.UserResponse;
import com.andreas.mylife.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/user-service/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ApiResponse<UserResponse> me(){
        UUID userId = SecurityUtils.getCurrentUserId();
        return ApiResponse.success(userService.getUserInfo(userId));
    }
}
