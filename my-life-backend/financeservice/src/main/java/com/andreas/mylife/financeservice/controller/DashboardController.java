package com.andreas.mylife.financeservice.controller;


import com.andreas.mylife.common.dto.ApiResponse;
import com.andreas.mylife.common.util.SecurityUtils;
import com.andreas.mylife.financeservice.common.ApiPath;
import com.andreas.mylife.financeservice.services.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping(ApiPath.DASHBOARD)
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/previous-month-balance")
    public ApiResponse<BigDecimal> getPrevMonthBalance(){
        UUID userId = SecurityUtils.getCurrentUserId();
        return ApiResponse.success(dashboardService.getPrevMonthBalance(LocalDate.now(), userId));
    }
}
