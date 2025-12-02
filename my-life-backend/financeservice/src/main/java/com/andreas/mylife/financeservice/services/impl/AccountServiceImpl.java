package com.andreas.mylife.financeservice.services.impl;

import com.andreas.mylife.common.exception.BusinessValidationException;
import com.andreas.mylife.common.exception.ResourceConflictException;
import com.andreas.mylife.financeservice.dto.request.AccountRequest;
import com.andreas.mylife.financeservice.dto.response.AccountResponse;
import com.andreas.mylife.financeservice.model.Account;
import com.andreas.mylife.financeservice.model.AccountType;
import com.andreas.mylife.financeservice.repository.AccountRepository;
import com.andreas.mylife.financeservice.services.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    @Override
    @Transactional
    public AccountResponse createAccount(UUID userId, AccountRequest request) {
        log.info("Creating account for user: {}, name: {}", userId, request.getName());

        if (accountRepository.existsByUserIdAndName(userId, request.getName())) {
            throw new ResourceConflictException("Account with name '" + request.getName() + "' already exists.");
        }

        AccountType accountType;
        try {
            accountType = AccountType.valueOf(request.getType().toUpperCase());
        } catch (IllegalArgumentException e) {
            String allowedTypes = Arrays.stream(AccountType.values())
                    .map(Enum::name)
                    .collect(Collectors.joining(", "));
            throw new BusinessValidationException("Invalid account type. Allowed: [" + allowedTypes + "]");
        }

        Account account = Account.builder()
                .userId(userId)
                .name(request.getName())
                .type(accountType)
                .currency("IDR")
                .isActive(true)
                .balance(request.getInitialBalance() != null ? request.getInitialBalance() : BigDecimal.ZERO)
                .build();

        // createdAt otomatis diisi Hibernate, tapi response butuh data persist
        Account savedAccount = accountRepository.save(account);

        return mapToResponse(savedAccount);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AccountResponse> getAccountsByUserId(UUID userId) {
        Sort sort = Sort.by(Sort.Order.asc("type"), Sort.Order.asc("name"));
        return accountRepository.findByUserId(userId, sort)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private AccountResponse mapToResponse(Account account) {
        return AccountResponse.builder()
                .id(account.getId())
                .name(account.getName())
                .type(account.getType().name())
                .balance(account.getBalance())
                .currency(account.getCurrency())
                // Kirim Instant langsung (UTC). Frontend yang format ke Local Time user.
                .createdAt(account.getCreatedAt())
                .build();
    }
}