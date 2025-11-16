package com.andreas.mylife.finance_service.services;

import java.util.UUID;

import com.andreas.mylife.finance_service.dto.request.AccountRequest;

public interface AccountService {
    void addAccount(UUID userID, AccountRequest req );
}
