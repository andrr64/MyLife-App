package com.andreas.mylife.finance_service.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.andreas.mylife.finance_service.common.ApiPath;
import com.andreas.mylife.finance_service.dto.request.AccountRequest;
import com.andreas.mylife.finance_service.dto.response.ApiResponse;
import com.andreas.mylife.finance_service.services.AccountService;
import com.andreas.mylife.finance_service.util.UserIdExtractor;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping(ApiPath.ACCOUNT)
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @PostMapping("/add-account")
    public ApiResponse<Object> addAccount(
        @Valid @RequestBody AccountRequest request) {
        accountService.addAccount(
            UserIdExtractor.extractUserId(), 
            request
        );
        return ApiResponse.success("OK");
    }
}
