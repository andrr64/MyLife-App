package com.andreas.mylife.finance_service.dto.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TransactionRequest {
    @NotBlank
    @Size(max = 128, message = "Max 128 chars.")
    private String title;

    @NotNull(message = "Insert account id")
    private Long accountId;

    @NotNull
    @Positive
    private BigDecimal amount; // numeric(19, 2)

    @NotNull
    private Long categoryId;

    @Size(max = 255)
    private String description;
}