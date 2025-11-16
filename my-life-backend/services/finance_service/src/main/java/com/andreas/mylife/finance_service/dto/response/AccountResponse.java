package com.andreas.mylife.finance_service.dto.response;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountResponse {
    private long id;
    private String name;
    private BigDecimal amount;
    private String description;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    private List<TransactionResponse> transactions;
}
