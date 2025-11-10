package com.andreas.mylife.finance_service.dto.request;

import java.math.BigDecimal;
import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class TransactionRequest {

    @NotNull
    private UUID userId;

    @NotNull
    @Positive
    private BigDecimal amount; // numeric(19, 2)

    @NotNull
    private Long categoryId;
}
