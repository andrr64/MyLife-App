package com.andreas.mylife.finance_service.services.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.andreas.mylife.finance_service.dto.request.TransactionRequest;
import com.andreas.mylife.finance_service.exception.BusinessValidationException;
import com.andreas.mylife.finance_service.model.Account;
import com.andreas.mylife.finance_service.model.Transaction;
import com.andreas.mylife.finance_service.model.TxCategory;
import com.andreas.mylife.finance_service.repository.AccountRepository;
import com.andreas.mylife.finance_service.repository.TransactionRepository;
import com.andreas.mylife.finance_service.repository.TxCategoryRepository;
import com.andreas.mylife.finance_service.services.TransactionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

        private final TransactionRepository transactionRepository;
        private final AccountRepository accountRepository;
        private final TxCategoryRepository tCategoryRepository;

        @Override
        public Transaction addTransaction(UUID userId, TransactionRequest req) {
                Account acc = accountRepository.findAccountByUserId(userId)
                                .orElseThrow(() -> new BusinessValidationException("Akun tidak ditemukan."));
                TxCategory category = tCategoryRepository.findById(req.getCategoryId()).orElseThrow(
                                () -> new BusinessValidationException("Kategori tidak ditemukan"));
                // Buat transaksi baru
                Transaction transaction = Transaction.builder()
                                .amount(req.getAmount())
                                .account(acc)
                                .category(category)
                                .title(req.getTitle())
                                .description(req.getDescription())
                                .build();
                return transactionRepository.save(transaction);
        }

        @Override
        public List<Transaction> getTransactions(UUID userID, Long accountID) {
                Account account = accountRepository.findByIdAndUserId(accountID, userID).orElseThrow(
                                () -> new BusinessValidationException("Akun tidak ditemukan"));
                return account.getTransactions();
        }
}