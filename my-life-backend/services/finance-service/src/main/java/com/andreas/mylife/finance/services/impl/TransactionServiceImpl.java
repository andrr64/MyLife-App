package com.andreas.mylife.finance.services.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.andreas.mylife.finance.dto.request.TransactionRequest;
import com.andreas.mylife.finance.dto.response.TransactionResponse;
import com.andreas.mylife.finance.exception.BusinessValidationException;
import com.andreas.mylife.finance.exception.ResourceNotFoundException;
import com.andreas.mylife.finance.model.*;
import com.andreas.mylife.finance.repository.AccountRepository;
import com.andreas.mylife.finance.repository.CategoryRepository;
import com.andreas.mylife.finance.repository.TransactionRepository;
import com.andreas.mylife.finance.services.TransactionService;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional // WAJIB: Biar update saldo + simpan history jadi satu kesatuan
    public TransactionResponse createTransaction(UUID userId, TransactionRequest request) {
        log.info("Processing transaction for user: {}", userId);

        // 1. Validasi Tipe Transaksi
        TransactionType type;
        try {
            type = TransactionType.valueOf(request.getType().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BusinessValidationException("Invalid transaction type. Allowed: INCOME, EXPENSE, TRANSFER");
        }

        // 2. Ambil Akun Utama (Source Account)
        Account account = accountRepository.findByIdAndUserId(request.getAccountId(), userId)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found or unauthorized"));

        Transaction savedTransaction;

        // --- LOGIC CABANG 3 ARAH ---
        if (type == TransactionType.TRANSFER) {
            savedTransaction = handleTransfer(userId, account, request);
        } else {
            savedTransaction = handleIncomeExpense(userId, account, request, type);
        }

        return mapToResponse(savedTransaction);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TransactionResponse> getUserTransactions(UUID userId, Pageable pageable) {
        // Menggunakan repository yang sudah di-optimasi dengan JOIN FETCH
        // Param startDate/endDate bisa ditambahkan nanti untuk filter dashboard
        return transactionRepository.findHistory(userId, null, null, pageable)
                .map(this::mapToResponse);
    }

    @Override
    public TransactionResponse getTransactionDetail(UUID userId, UUID transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .filter(t -> t.getUserId().equals(userId)) // Security check
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));

        return mapToResponse(transaction);
    }

    // --- PRIVATE HELPER LOGIC ---

    private Transaction handleIncomeExpense(UUID userId, Account account, TransactionRequest request,
            TransactionType type) {
        // 1. Validasi Kategori
        if (request.getCategoryId() == null) {
            throw new BusinessValidationException("Category ID is required for Income/Expense");
        }
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        // 2. Validasi Hubungan Kategori vs Tipe
        // Gak boleh pilih Kategori 'Gaji' (INCOME) tapi tipenya EXPENSE
        if (!category.getType().name().equals(type.name())) { // jika tipe kategori != tipe transaksi, misal tipe
                                                              // kategori = INCOME dan tipe transaksi = EXPENSE maka ada
                                                              // kesalahan
            throw new BusinessValidationException(
                    String.format("Category '%s' is type %s, but transaction type is %s",
                            category.getName(), category.getType(), type));
        }

        // 3. Hitung Saldo Baru
        if (type == TransactionType.INCOME) {
            account.setBalance(account.getBalance().add(request.getAmount()));
        } else {
            account.setBalance(account.getBalance().subtract(request.getAmount()));
        }

        // 4. Build Transaction Object
        Transaction transaction = Transaction.builder()
                .userId(userId)
                .account(account)
                .category(category)
                .amount(request.getAmount()) // Simpan positif, tipe yang menentukan arah
                .type(type)
                .transactionDate(
                        request.getTransactionDate() != null ? request.getTransactionDate() : ZonedDateTime.now())
                .description(request.getDescription())
                .build();

        accountRepository.save(account); // Update Saldo
        return transactionRepository.save(transaction); // Simpan History
    }

    private Transaction handleTransfer(UUID userId, Account senderAccount, TransactionRequest request) {
        // 1. Validasi Target Account
        if (request.getTargetAccountId() == null) {
            throw new BusinessValidationException("Target Account ID is required for Transfer");
        }
        if (senderAccount.getId().equals(request.getTargetAccountId())) {
            throw new BusinessValidationException("Cannot transfer to the same account");
        }

        Account receiverAccount = accountRepository.findByIdAndUserId(request.getTargetAccountId(), userId)
                .orElseThrow(() -> new ResourceNotFoundException("Target account not found"));

        BigDecimal amount = request.getAmount();
        if (amount.compareTo(senderAccount.getBalance()) > 0) {
            throw new BusinessValidationException("Insufficient balance in the sender's account.");
        }

        // 2. Update Saldo Keduanya
        senderAccount.setBalance(senderAccount.getBalance().subtract(amount)); // Pengirim Berkurang
        receiverAccount.setBalance(receiverAccount.getBalance().add(amount)); // Penerima Bertambah

        ZonedDateTime txDate = request.getTransactionDate() != null ? request.getTransactionDate()
                : ZonedDateTime.now();

        // 3. Buat Transaksi PENGIRIM (Sender) -> Type TRANSFER
        // Disini kita set amount NEGATIF untuk pengirim biar visualisasinya jelas uang
        // keluar
        Transaction senderTx = Transaction.builder()
                .userId(userId)
                .account(senderAccount)
                .amount(amount.negate())
                .type(TransactionType.TRANSFER)
                .transactionDate(txDate)
                .description("Transfer to " + receiverAccount.getName() + ": " + request.getDescription())
                .build();

        // 4. Buat Transaksi PENERIMA (Receiver) -> Type TRANSFER
        Transaction receiverTx = Transaction.builder()
                .userId(userId)
                .account(receiverAccount)
                .amount(amount)
                .type(TransactionType.TRANSFER)
                .transactionDate(txDate)
                .description("Received from " + senderAccount.getName() + ": " + request.getDescription())
                .build();

        // 5. PAIRING (Jodohkan mereka)
        senderTx.setTransferPair(receiverTx);
        receiverTx.setTransferPair(senderTx);

        // 6. Save All (Update Saldo & Save Tx)
        accountRepository.save(senderAccount);
        accountRepository.save(receiverAccount);
        transactionRepository.save(receiverTx);
        return transactionRepository.save(senderTx); // Return sisi pengirim sebagai response utama
    }

    private TransactionResponse mapToResponse(Transaction tx) {
        return TransactionResponse.builder()
                .id(tx.getId())
                .accountId(tx.getAccount().getId())
                .accountName(tx.getAccount().getName())
                // Handle Null Category (karena Transfer category-nya null)
                .categoryId(tx.getCategory() != null ? tx.getCategory().getId() : null)
                .categoryName(tx.getCategory() != null ? tx.getCategory().getName() : "Transfer")
                .amount(tx.getAmount())
                .type(tx.getType().name())
                .description(tx.getDescription())
                .transactionDate(tx.getTransactionDate())
                .createdAt(tx.getCreatedAt())
                // Handle Transfer Pair ID (Kalau ada pasangannya)
                .transferPairId(tx.getTransferPair() != null ? tx.getTransferPair().getId() : null)
                .build();
    }
}