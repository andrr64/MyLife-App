package com.andreas.mylife.financeservice.services;

import java.util.List;
import java.util.UUID;

import com.andreas.mylife.financeservice.dto.request.AccountRequest;
import com.andreas.mylife.financeservice.dto.response.AccountResponse;

public interface AccountService {

    AccountResponse createAccount(UUID userId, AccountRequest request);

    List<AccountResponse> getAccountsByUserId(UUID userId);
}