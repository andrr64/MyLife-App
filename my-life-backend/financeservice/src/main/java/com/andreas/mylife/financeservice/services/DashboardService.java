package com.andreas.mylife.financeservice.services;

import com.andreas.mylife.common.dto.PieChartItem;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface DashboardService {
    BigDecimal getPrevMonthBalance(Instant refDate, UUID userId);
    BigDecimal getIncomeThisMonth(UUID userId);
    BigDecimal getExpenseThisMonth(UUID userId);
    String getCurrentBalanceDisplay(UUID userId, boolean flag);
    List<PieChartItem<BigDecimal>> getThisMonthExpensePieChartByCategoryName(UUID userId);
}
