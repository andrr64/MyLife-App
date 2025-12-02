package com.andreas.mylife.financeservice.dto.response;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CashFlowChartResponse {
    private String month;
    private BigDecimal income;
    private BigDecimal expense;
}
