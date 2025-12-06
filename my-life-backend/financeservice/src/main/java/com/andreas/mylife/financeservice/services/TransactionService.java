package com.andreas.mylife.financeservice.services;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.andreas.mylife.financeservice.dto.request.TransactionRequest;
import com.andreas.mylife.financeservice.dto.response.TransactionResponse;

public interface TransactionService {
    TransactionResponse createTransaction(UUID userId, TransactionRequest request);
    Page<TransactionResponse> getUserTransactions(UUID userId, Pageable pageable);
    TransactionResponse getTransactionDetail(UUID userId, UUID transactionId);

    List<TransactionResponse> getRecentTransaction(UUID userId, Long limit);
}
