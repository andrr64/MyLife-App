package com.andreas.mylife.finance_service.services.impl;

import java.sql.SQLException;
import java.util.UUID;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
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
        try {
            // Pastikan akun user valid
            Account acc = accountRepository.findByUserId(userId)
                    .orElseThrow(() -> new BusinessValidationException("Akun tidak ditemukan untuk user tersebut"));

            // Buat transaksi baru
            Transaction transaction = Transaction.builder()
                    .amount(req.getAmount())
                    .accountId(acc.getId()) // ambil ID dari akun yang ditemukan
                    .categoryId(req.getCategoryId())
                    .title(req.getTitle())
                    .description(req.getDescription())
                    .build();

            return transactionRepository.save(transaction);

        } catch (DataIntegrityViolationException ex) {
            String message = extractSqlMessage(ex);
            throw new BusinessValidationException(message);

        } catch (Exception ex) {
            throw new BusinessValidationException("Terjadi kesalahan saat menyimpan transaksi");
        }
    }

    /**
     * Ekstrak pesan detail dari SQLException (misalnya FK constraint)
     */
    private String extractSqlMessage(Throwable ex) {
        String message = "Database integrity error";

        if (ex instanceof DataIntegrityViolationException dive && dive.getCause() != null) {
            Throwable cause = dive.getCause();
            if (cause instanceof ConstraintViolationException cve && cve.getSQLException() != null) {
                message = cve.getSQLException().getMessage();
            } else if (cause.getCause() instanceof SQLException sqlEx) {
                message = sqlEx.getMessage();
            }
        } else if (ex.getCause() instanceof SQLException sqlEx) {
            message = sqlEx.getMessage();
        }

        return message;
    }
}
