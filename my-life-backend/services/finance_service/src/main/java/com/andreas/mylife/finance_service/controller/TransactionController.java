package com.andreas.mylife.finance_service.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.andreas.mylife.finance_service.common.ApiPath;
import com.andreas.mylife.finance_service.dto.request.TransactionRequest;
import com.andreas.mylife.finance_service.dto.response.ApiResponse;
import com.andreas.mylife.finance_service.services.TransactionService;
import com.andreas.mylife.finance_service.util.UserIdExtractor;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(ApiPath.TRANSACTION)
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @PostMapping("/add-transaction")
    public ApiResponse<Object> getUserTransaction(
            @Valid @RequestBody TransactionRequest req) {
        return ApiResponse.success(
                transactionService.addTransaction(UserIdExtractor.extractUserId(), req));
    }
}
