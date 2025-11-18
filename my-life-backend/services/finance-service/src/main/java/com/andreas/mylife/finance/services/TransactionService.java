package com.andreas.mylife.finance.services;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.andreas.mylife.finance.dto.request.TransactionRequest;
import com.andreas.mylife.finance.dto.response.TransactionResponse;

public interface TransactionService {
    TransactionResponse createTransaction(UUID userId, TransactionRequest request);
    Page<TransactionResponse> getUserTransactions(UUID userId, Pageable pageable);
    TransactionResponse getTransactionDetail(UUID userId, UUID transactionId);
    
}
