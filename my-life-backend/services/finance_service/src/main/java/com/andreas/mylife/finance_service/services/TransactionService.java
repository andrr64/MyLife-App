package com.andreas.mylife.finance_service.services;

import java.util.UUID;

import com.andreas.mylife.finance_service.dto.request.TransactionRequest;
import com.andreas.mylife.finance_service.model.Transaction;

public interface TransactionService {
    Transaction addTransaction(UUID userId, TransactionRequest transactionRequest);
}
