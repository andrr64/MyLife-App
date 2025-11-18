package com.andreas.mylife.finance_service.services;

import com.andreas.mylife.finance_service.dto.request.AccountRequest;
import com.andreas.mylife.finance_service.dto.response.AccountResponse;

import java.util.List;
import java.util.UUID;

public interface AccountService {

    AccountResponse createAccount(UUID userId, AccountRequest request);

    List<AccountResponse> getAccountsByUserId(UUID userId);
}