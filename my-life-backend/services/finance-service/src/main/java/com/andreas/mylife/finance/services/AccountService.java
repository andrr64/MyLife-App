package com.andreas.mylife.finance.services;

import java.util.List;
import java.util.UUID;

import com.andreas.mylife.finance.dto.request.AccountRequest;
import com.andreas.mylife.finance.dto.response.AccountResponse;

public interface AccountService {

    AccountResponse createAccount(UUID userId, AccountRequest request);

    List<AccountResponse> getAccountsByUserId(UUID userId);
}