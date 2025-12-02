package com.andreas.mylife.financeservice.services;

import com.andreas.mylife.financeservice.dto.response.CashFlowChartResponse;
import org.springframework.cglib.core.Local;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface DashboardService {
    BigDecimal getPrevMonthBalance(LocalDate referenceDate, UUID userId);
    BigDecimal getMontlyIncomes(LocalDate refDate, UUID userId);
    BigDecimal getMonthlyExpenses(LocalDate refDate, UUID userId);
    List<CashFlowChartResponse> getCashFlowChartData(Local refDate, UUID userId);
}
