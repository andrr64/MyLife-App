package com.andreas.mylife.financeservice.controller;

import com.andreas.mylife.common.dto.ApiResponse;
import com.andreas.mylife.common.dto.BigDecimalResponse;
import com.andreas.mylife.common.dto.PieChartItem;
import com.andreas.mylife.common.util.SecurityUtils;
import com.andreas.mylife.financeservice.common.ApiPath;
import com.andreas.mylife.financeservice.services.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(ApiPath.DASHBOARD)
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/previous-month-balance")
    public ApiResponse<BigDecimal> getPrevMonthBalance(){
        UUID userId = SecurityUtils.getCurrentUserId();

        // Pass Instant.now() (Waktu server saat ini dalam UTC)
        // Service layer yang akan mengonversinya ke Zone Jakarta untuk perhitungan bulan
        return ApiResponse.success(dashboardService.getPrevMonthBalance(Instant.now(), userId));
    }

    @GetMapping("/income-this-month")
    public ApiResponse<BigDecimalResponse> getIncomeThisMonth(){
        UUID userId = SecurityUtils.getCurrentUserId();

        // Pass Instant.now() (Waktu server saat ini dalam UTC)
        // Service layer yang akan mengonversinya ke Zone Jakarta untuk perhitungan bulan
        return ApiResponse.success(
                BigDecimalResponse.builder()
                        .value(dashboardService.getIncomeThisMonth(userId))
                        .build()
        );
    }

    @GetMapping("/expense-this-month")
    public ApiResponse<BigDecimalResponse> getExpenseThisMonth(){
        UUID userId = SecurityUtils.getCurrentUserId();

        // Pass Instant.now() (Waktu server saat ini dalam UTC)
        // Service layer yang akan mengonversinya ke Zone Jakarta untuk perhitungan bulan
        return ApiResponse.success(
                BigDecimalResponse.builder()
                        .value(dashboardService.getExpenseThisMonth(userId))
                        .build()
        );
    }

    @GetMapping("/current-balance-display")
    public ApiResponse<String> getCurrentBalanceDisplay(
            @RequestParam(required = false, defaultValue = "false") boolean hidden
    ){
        UUID userId = SecurityUtils.getCurrentUserId();
        return ApiResponse.success(dashboardService.getCurrentBalanceDisplay(userId, hidden));
    }

    @GetMapping("/chart/pie/this-month-expense-by-category")
    public ApiResponse<List<PieChartItem<BigDecimal>>> getThisMonthExpenseSummaryByCategoryname(){
        return ApiResponse.success(
                dashboardService.getThisMonthExpensePieChartByCategoryName(
                        SecurityUtils.getCurrentUserId()
                )
        );
    }
}