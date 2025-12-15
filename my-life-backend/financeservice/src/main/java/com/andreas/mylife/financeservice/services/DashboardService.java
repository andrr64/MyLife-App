package com.andreas.mylife.financeservice.services;

import com.andreas.mylife.common.dto.ValueByCategory;
import com.andreas.mylife.financeservice.dto.response.CashFlowChartResponse;
import org.springframework.cglib.core.Local;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface DashboardService {
    BigDecimal getPrevMonthBalance(Instant refDate, UUID userId);
    BigDecimal getIncomeThisMonth(UUID userId);
    BigDecimal getExpenseThisMonth(UUID userId);
    String getCurrentBalanceDisplay(UUID userId, boolean flag);
    List<ValueByCategory<BigDecimal>> getThisMonthExpenseSummary(UUID userId);
}
