import { http } from "@/http/http_helper"
import { ApiResponse } from "@/types/api_response"
import { BigDecimalResponse } from "@/types/dto/finance/response/bigdecimal_response"

const BASE = "/api/proxy/finance-service/dashboard"

export class DashboardService {
    static getThisMonthIncome() {
        return http.get<ApiResponse<BigDecimalResponse>>(`${BASE}/income-this-month`)
    }
    static getThisMonthExpense() {
        return http.get<ApiResponse<BigDecimalResponse>>(`${BASE}/expense-this-month`)
    }
}
