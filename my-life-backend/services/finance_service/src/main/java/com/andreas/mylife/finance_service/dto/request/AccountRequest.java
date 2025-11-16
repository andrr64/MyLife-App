package com.andreas.mylife.finance_service.dto.request;

import java.math.BigDecimal;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AccountRequest {
    @NotBlank
    @Size(max = 128)
    private String name;
    
    @NotNull
    @Positive
    private BigDecimal initialAmount;

    @Nullable
    @Size(max = 256)
    private String description;
}
