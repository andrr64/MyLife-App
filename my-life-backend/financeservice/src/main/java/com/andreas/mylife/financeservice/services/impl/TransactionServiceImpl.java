package com.andreas.mylife.financeservice.services.impl;

import com.andreas.mylife.common.exception.BusinessValidationException;
import com.andreas.mylife.common.exception.ResourceNotFoundException;
import com.andreas.mylife.financeservice.dto.request.TransactionRequest;
import com.andreas.mylife.financeservice.dto.response.TransactionResponse;
import com.andreas.mylife.financeservice.model.*;
import com.andreas.mylife.financeservice.repository.AccountRepository;
import com.andreas.mylife.financeservice.repository.CategoryRepository;
import com.andreas.mylife.financeservice.repository.TransactionRepository;
import com.andreas.mylife.financeservice.services.TransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public TransactionResponse createTransaction(UUID userId, TransactionRequest request) {
        log.info("Processing transaction for user: {}", userId);

        TransactionType type;
        try {
            type = TransactionType.valueOf(request.getType().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BusinessValidationException("Invalid transaction type. Allowed: INCOME, EXPENSE, TRANSFER");
        }

        Account account = accountRepository.findByIdAndUserId(request.getAccountId(), userId)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found or unauthorized"));

        // KONVERSI WAKTU: Ambil dari request (ZonedDateTime) -> Convert ke Instant (UTC)
        // Jika request null, pakai Instant.now()
        Instant transactionTime = request.getTransactionDate() != null
                ? request.getTransactionDate()
                : Instant.now();

        Transaction savedTransaction;
        if (type == TransactionType.TRANSFER) {
            savedTransaction = handleTransfer(userId, account, request, transactionTime);
        } else {
            savedTransaction = handleIncomeExpense(userId, account, request, type, transactionTime);
        }

        return mapToResponse(savedTransaction);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TransactionResponse> getUserTransactions(UUID userId, Pageable pageable) {
        // Repo sekarang terima Instant, bukan ZonedDateTime.
        // Karena parameter filter history belum ada di interface method ini, kita kirim null
        return transactionRepository.findHistory(userId, null, null, pageable)
                .map(this::mapToResponse);
    }

    @Override
    public TransactionResponse getTransactionDetail(UUID userId, UUID transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .filter(t -> t.getUserId().equals(userId))
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));
        return mapToResponse(transaction);
    }

    @Override
    public List<TransactionResponse> getRecentTransaction(UUID userId, Long limit) {
        return transactionRepository.recentTransaction(limit, userId).stream().map(this::mapToResponse).toList();
    }

    // --- PRIVATE METHODS ---

    private Transaction handleIncomeExpense(UUID userId, Account account, TransactionRequest request,
                                            TransactionType type, Instant transactionTime) {
        if (request.getCategoryId() == null) {
            throw new BusinessValidationException("Category ID is required for Income/Expense");
        }
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        if (!category.getType().name().equals(type.name())) {
            throw new BusinessValidationException("Category type mismatch");
        }

        // Update Balance
        if (type == TransactionType.INCOME) {
            account.setBalance(account.getBalance().add(request.getAmount()));
        } else {
            account.setBalance(account.getBalance().subtract(request.getAmount()));
        }
        accountRepository.save(account);

        Transaction transaction = Transaction.builder()
                .userId(userId)
                .account(account)
                .category(category)
                .amount(request.getAmount())
                .type(type)
                .transactionDate(transactionTime) // SUDAH INSTANT
                .description(request.getDescription())
                .build();

        return transactionRepository.save(transaction);
    }

    private Transaction handleTransfer(UUID userId, Account senderAccount, TransactionRequest request, Instant transactionTime) {
        if (request.getTargetAccountId() == null) {
            throw new BusinessValidationException("Target Account ID is required");
        }
        if (senderAccount.getId().equals(request.getTargetAccountId())) {
            throw new BusinessValidationException("Cannot transfer to same account");
        }

        Account receiverAccount = accountRepository.findByIdAndUserId(request.getTargetAccountId(), userId)
                .orElseThrow(() -> new ResourceNotFoundException("Target account not found"));

        BigDecimal amount = request.getAmount();
        if (amount.compareTo(senderAccount.getBalance()) > 0) {
            throw new BusinessValidationException("Insufficient balance");
        }

        senderAccount.setBalance(senderAccount.getBalance().subtract(amount));
        receiverAccount.setBalance(receiverAccount.getBalance().add(amount));
        accountRepository.save(senderAccount);
        accountRepository.save(receiverAccount);

        Transaction senderTx = Transaction.builder()
                .userId(userId)
                .account(senderAccount)
                .amount(amount.negate())
                .type(TransactionType.TRANSFER)
                .transactionDate(transactionTime) // SUDAH INSTANT
                .description("Transfer to " + receiverAccount.getName() + ": " + request.getDescription())
                .build();

        Transaction receiverTx = Transaction.builder()
                .userId(userId)
                .account(receiverAccount)
                .amount(amount)
                .type(TransactionType.TRANSFER)
                .transactionDate(transactionTime) // SUDAH INSTANT
                .description("Received from " + senderAccount.getName() + ": " + request.getDescription())
                .build();

        senderTx.setTransferPair(receiverTx);
        receiverTx.setTransferPair(senderTx);

        transactionRepository.save(receiverTx);
        return transactionRepository.save(senderTx);
    }

    private TransactionResponse mapToResponse(Transaction tx) {
        return TransactionResponse.builder()
                .id(tx.getId())
                .accountId(tx.getAccount().getId())
                .accountName(tx.getAccount().getName())
                .categoryId(tx.getCategory() != null ? tx.getCategory().getId() : null)
                .categoryName(tx.getCategory() != null ? tx.getCategory().getName() : "Transfer")
                .amount(tx.getAmount())
                .type(tx.getType().name())
                .description(tx.getDescription())
                .transactionDate(tx.getTransactionDate()) // Return Instant (UTC)
                .createdAt(tx.getCreatedAt())             // Return Instant (UTC)
                .transferPairId(tx.getTransferPair() != null ? tx.getTransferPair().getId() : null)
                .build();
    }
}