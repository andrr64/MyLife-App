package com.andreas.mylife.finance_service.services;

import java.util.List;
import java.util.UUID;

import com.andreas.mylife.finance_service.dto.request.AccountRequest;
import com.andreas.mylife.finance_service.dto.response.AccountResponse;

public interface AccountService {
    void addAccount(UUID userID, AccountRequest req);

    List<AccountResponse> getAccounts(UUID userId, Long accountId);
}
