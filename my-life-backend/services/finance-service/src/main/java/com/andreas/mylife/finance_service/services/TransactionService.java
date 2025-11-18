package com.andreas.mylife.finance_service.services;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.andreas.mylife.finance_service.dto.request.TransactionRequest;
import com.andreas.mylife.finance_service.dto.response.TransactionResponse;

public interface TransactionService {
    TransactionResponse createTransaction(UUID userId, TransactionRequest request);
    Page<TransactionResponse> getUserTransactions(UUID userId, Pageable pageable);
    TransactionResponse getTransactionDetail(UUID userId, UUID transactionId);
    
}
