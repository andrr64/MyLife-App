package com.andreas.mylife.finance_service.services.impl;

import com.andreas.mylife.finance_service.dto.request.AccountRequest;
import com.andreas.mylife.finance_service.dto.response.AccountResponse;
import com.andreas.mylife.finance_service.exception.BusinessValidationException;
import com.andreas.mylife.finance_service.model.Account;
import com.andreas.mylife.finance_service.repository.AccountRepository;
import com.andreas.mylife.finance_service.services.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

        private final AccountRepository accountRepository;

        @Override
        @Transactional // Wajib: untuk memastikan data tersimpan atomik
        public AccountResponse createAccount(UUID userId, AccountRequest request) {
                log.info("Creating account for user: {}, name: {}", userId, request.getName());

                // 1. Validasi Bisnis: Cek nama duplikat di user yg sama
                boolean exists = accountRepository.existsByUserIdAndName(userId, request.getName());
                if (exists) {
                        throw new BusinessValidationException(
                                        "Account with name '" + request.getName() + "' already exists.");
                }

                // 2. Mapping Request ke Entity
                Account account = Account.builder()
                                .userId(userId)
                                .name(request.getName())
                                .type(request.getType()) // Nanti bisa divalidasi against Enum
                                .currency("IDR") // Default IDR, bisa dibuat dinamis kalau perlu
                                .balance(request.getInitialBalance() != null ? request.getInitialBalance()
                                                : BigDecimal.ZERO)
                                .build();

                // 3. Save ke DB
                Account savedAccount = accountRepository.save(account);

                // 4. Return Response
                return mapToResponse(savedAccount);
        }

        @Override
        @Transactional(readOnly = true) // Optimasi: Beri tahu DB ini cuma baca data
        public List<AccountResponse> getAccountsByUserId(UUID userId) {
                // Ambil data, lalu stream convert ke DTO
                return accountRepository.findByUserId(userId)
                                .stream()
                                .map(this::mapToResponse)
                                .collect(Collectors.toList());
        }

        // --- Helper Methods (Manual Mapper) ---
        // Nanti kalau project makin besar, bisa pindah ke MapStruct
        private AccountResponse mapToResponse(Account account) {
                return AccountResponse.builder()
                                .id(account.getId())
                                .name(account.getName())
                                .type(account.getType())
                                .balance(account.getBalance())
                                .currency(account.getCurrency())
                                .createdAt(account.getCreatedAt())
                                .build();
        }
}