package com.andreas.mylife.finance_service.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class AccountRequest {

    @NotBlank(message = "Account name is required")
    @Size(max = 100)
    private String name;

    @NotBlank(message = "Account type is required (BANK, CASH, E_WALLET)")
    private String type;

    // Opsional: User bisa set saldo awal saat bikin akun (misal migrasi data)
    private BigDecimal initialBalance; 
}