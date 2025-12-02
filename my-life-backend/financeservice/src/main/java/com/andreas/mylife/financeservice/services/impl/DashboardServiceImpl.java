package com.andreas.mylife.financeservice.services.impl;

import com.andreas.mylife.common.util.DateTimeUtils;
import com.andreas.mylife.financeservice.dto.response.CashFlowChartResponse;
import com.andreas.mylife.financeservice.repository.AccountRepository;
import com.andreas.mylife.financeservice.repository.TransactionRepository;
import com.andreas.mylife.financeservice.services.DashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;

    private ZonedDateTime convertToStartDayOfMonth(LocalDate refDate){
        return refDate.withDayOfMonth(1).atStartOfDay(ZoneId.of("Asia/Jakarta"));
    }

    private ZonedDateTime convertToEndDayOfMonth(ZonedDateTime refDate){
        return refDate.withDayOfMonth(-1);
    }

    @Override
    public BigDecimal getPrevMonthBalance(LocalDate referenceDate, UUID userId) {
        BigDecimal currentBalance = accountRepository.sumCurrentBalanceByUserId(userId);

        ZonedDateTime startTime = DateTimeUtils.toStartOfMonth(referenceDate);
        ZonedDateTime endTime = DateTimeUtils.nowJakarta();

        BigDecimal mutationThisMonth = transactionRepository.sumMutationByUserAndDateRange(userId, startTime, endTime);

        // Saldo bulan lalu = saldo sekarang - semua mutasi bulan ini
        return currentBalance.subtract(mutationThisMonth);
    }

    @Override
    public BigDecimal getMontlyIncomes(LocalDate refDate, UUID userId) {
        ZonedDateTime startTime = DateTimeUtils.toStartOfMonth(refDate);
        ZonedDateTime endTime = DateTimeUtils.toEndDayOfMonth(refDate);

        return null;
    }

    @Override
    public BigDecimal getMonthlyExpenses(LocalDate refDate, UUID userId) {
        ZonedDateTime startTime = DateTimeUtils.toStartOfMonth(refDate);
        ZonedDateTime endTime = DateTimeUtils.toEndDayOfMonth(refDate);

        return null;
    }

    @Override
    public List<CashFlowChartResponse> getCashFlowChartData(Local refDate, UUID userId) {
        return List.of();
    }
}
