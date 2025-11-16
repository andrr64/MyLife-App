package com.andreas.mylife.finance_service.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.andreas.mylife.finance_service.dto.response.AccountResponse;
import com.andreas.mylife.finance_service.model.Account;

public class AccountMapper {

    public static AccountResponse toResponse(Account account) {
        return AccountResponse.builder()
                .id(account.getId())
                .name(account.getName())
                .amount(account.getAmount())
                .description(account.getDescription())
                .createdAt(account.getCreatedAt())
                .updatedAt(account.getUpdatedAt())
                .build();
    }

    public static List<AccountResponse> toResponseList(List<Account> accounts) {
        return accounts.stream()
                .map(AccountMapper::toResponse)
                .collect(Collectors.toList());
    }
}
