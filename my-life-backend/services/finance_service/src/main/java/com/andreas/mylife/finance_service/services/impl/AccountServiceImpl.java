package com.andreas.mylife.finance_service.services.impl;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.andreas.mylife.finance_service.dto.request.AccountRequest;
import com.andreas.mylife.finance_service.exception.BusinessValidationException;
import com.andreas.mylife.finance_service.model.Account;
import com.andreas.mylife.finance_service.repository.AccountRepository;
import com.andreas.mylife.finance_service.repository.TransactionRepository;
import com.andreas.mylife.finance_service.services.AccountService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;

    @Override
    @Transactional
    public void addAccount(UUID userID, AccountRequest req) {
        if (accountRepository.isNameLikeExists(req.getName())) {
            throw new BusinessValidationException("Akun '" + req.getName() + "' sudah ada! gunakan nama lain.");
        }
        Account account = Account.builder()
                .amount(req.getInitialAmount())
                .userId(userID)
                .name(req.getName())
                .description(req.getDescription())
                .build();
        Account savedAccount = accountRepository.save(account);
    }
}