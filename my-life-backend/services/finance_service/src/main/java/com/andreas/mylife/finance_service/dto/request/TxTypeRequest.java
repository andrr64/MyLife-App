package com.andreas.mylife.finance_service.dto.request;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TxTypeRequest {
    @NotNull
    @Size(max = 64)
    private String name;

    @NotNull
    private boolean effect;
}
