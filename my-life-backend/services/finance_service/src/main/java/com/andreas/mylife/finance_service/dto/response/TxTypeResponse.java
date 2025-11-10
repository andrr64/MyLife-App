package com.andreas.mylife.finance_service.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TxTypeResponse {
    private Long id;
    private String name;
    private Boolean effect;
}
