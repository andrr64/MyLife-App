package com.andreas.mylife.finance_service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TxCategoryResponse {
    private Long id;
    private String name;
    private TxTypeResponse txType;
}
