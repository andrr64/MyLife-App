package com.andreas.mylife.finance_service.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.andreas.mylife.finance_service.dto.request.AccountRequest;
import com.andreas.mylife.finance_service.dto.response.AccountResponse;
import com.andreas.mylife.finance_service.exception.BusinessValidationException;
import com.andreas.mylife.finance_service.mapper.AccountMapper;
import com.andreas.mylife.finance_service.model.Account;
import com.andreas.mylife.finance_service.model.Transaction;
import com.andreas.mylife.finance_service.model.TxCategory;
import com.andreas.mylife.finance_service.repository.AccountRepository;
import com.andreas.mylife.finance_service.repository.TransactionRepository;
import com.andreas.mylife.finance_service.repository.TxCategoryRepository;
import com.andreas.mylife.finance_service.services.AccountService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccountServiceImpl implements AccountService {
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;
    private final TxCategoryRepository txCategoryRepository;

    @Override
    @Transactional
    public void addAccount(UUID userID, AccountRequest req) {
        if (accountRepository.isNameLikeExists(req.getName())) {
            throw new BusinessValidationException("Akun '" + req.getName() + "' sudah ada! gunakan nama lain.");
        }
        Optional<TxCategory> userCategory = txCategoryRepository.findCategoryByNameLike("Initial balance", userID);
        if (userCategory.isEmpty()) {
            log.info("Initial balance not found, try to create one.....");
            TxCategory category = TxCategory.builder()
                    .name("Initial balance")
                    .userId(userID)
                    .effect(true)
                    .build();
            userCategory = Optional.of(txCategoryRepository.save(category));
            log.info("Add \"initial balance\" category for user -> " + userID.toString() + " success.");
        }
        Account account = Account.builder()
                .amount(req.getInitialAmount())
                .userId(userID)
                .name(req.getName())
                .description(req.getDescription())
                .build();
        Account savedAccount = accountRepository.save(account);
        Transaction transaction = Transaction.builder()
                .account(savedAccount)
                .amount(req.getInitialAmount())
                .category(userCategory.get())
                .description("initial balance for " + req.getName())
                .title("initial balance for '" + req.getName() + "'")
                .build();
        transactionRepository.save(transaction);
    }

    @Override
    public List<AccountResponse> getAccounts(UUID userId, Long accountId) {
        // Jika accountId diberikan → ambil satu akun spesifik
        if (accountId != null) {
            Optional<Account> account = accountRepository.findByIdAndUserId(accountId, userId);
            if (account.isEmpty()) {
                throw new BusinessValidationException("Akun dengan ID tersebut tidak ditemukan.");
            }
            return AccountMapper.toResponseList(List.of(account.get()));
        }

        // Jika accountId null → ambil semua akun untuk user
        List<Account> accounts = accountRepository.findByUserId(userId);
        if (accounts.isEmpty()) {
            throw new BusinessValidationException("Tidak ada akun untuk user ini.");
        }

        return AccountMapper.toResponseList(accounts);
    }
}