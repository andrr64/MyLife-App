package com.andreas.mylife.financeservice.controller;

import com.andreas.mylife.common.dto.ApiResponse;
import com.andreas.mylife.common.util.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import com.andreas.mylife.financeservice.common.ApiPath;
import com.andreas.mylife.financeservice.dto.request.TransactionRequest;
import com.andreas.mylife.financeservice.dto.response.TransactionResponse;
import com.andreas.mylife.financeservice.services.TransactionService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(ApiPath.TRANSACTION) // Pastikan path nya misal "/api/v1/transactions"
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping("/add")
    public ApiResponse<TransactionResponse> createTransaction(
            @Valid @RequestBody TransactionRequest request) {

        UUID userId = SecurityUtils.getCurrentUserId();
        TransactionResponse response = transactionService.createTransaction(userId, request);

        return ApiResponse.success(response);
    }

    @GetMapping
    public ApiResponse<Page<TransactionResponse>> getHistory(
            @PageableDefault(size = 10, sort = "transactionDate", direction = Sort.Direction.DESC) Pageable pageable) {

        UUID userId = SecurityUtils.getCurrentUserId();
        Page<TransactionResponse> response = transactionService.getUserTransactions(userId, pageable);

        return ApiResponse.success(response);
    }

    @GetMapping("/{id}")
    public ApiResponse<TransactionResponse> getDetail(@PathVariable UUID id) {
        UUID userId = SecurityUtils.getCurrentUserId();
        return ApiResponse.success(transactionService.getTransactionDetail(userId, id));
    }

    @GetMapping("/recent")
    public ApiResponse<List<TransactionResponse>> getRecentTransaction(
            @RequestParam(defaultValue = "5") Long limit
    ) {
        return ApiResponse.success(transactionService.getRecentTransaction(
                SecurityUtils.getCurrentUserId(),
                limit
        ));
    }
}