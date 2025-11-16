package com.andreas.mylife.finance_service.services.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.andreas.mylife.finance_service.dto.request.TransactionRequest;
import com.andreas.mylife.finance_service.exception.BusinessValidationException;
import com.andreas.mylife.finance_service.model.Account;
import com.andreas.mylife.finance_service.model.Transaction;
import com.andreas.mylife.finance_service.repository.AccountRepository;
import com.andreas.mylife.finance_service.repository.TransactionRepository;
import com.andreas.mylife.finance_service.services.TransactionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;

    @Override
    public Transaction addTransaction(UUID userId, TransactionRequest req) {
        Account acc = accountRepository.findByUserId(userId)
                .orElseThrow(() -> new BusinessValidationException("Akun tidak ditemukan."));

        // Buat transaksi baru
        Transaction transaction = Transaction.builder()
                .amount(req.getAmount())
                .accountId(acc.getId()) // ambil ID dari akun yang ditemukan
                .categoryId(req.getCategoryId())
                .title(req.getTitle())
                .description(req.getDescription())
                .build();

        return transactionRepository.save(transaction);
    }
}