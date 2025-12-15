import { http } from "@/http/http_helper"
import { ApiResponse } from "@/types/api_response"
import { BigDecimalResponse } from "@/types/dto/finance/response/bigdecimal_response"
import { ValueByCategoryResponse } from "@/types/dto/finance/response/value_by_category_response"

const BASE = "/api/proxy/finance-service/dashboard"

export class DashboardService {
    static getThisMonthIncome() {
        return http.get<ApiResponse<BigDecimalResponse>>(`${BASE}/income-this-month`)
    }
    static getThisMonthExpense() {
        return http.get<ApiResponse<BigDecimalResponse>>(`${BASE}/expense-this-month`)
    }
    static getThisMonthExpensePieChart() {
        return http.get<ApiResponse<ValueByCategoryResponse<number>[]>>(`${BASE}/chart/pie/this-month-expense-by-category`)
    }
}
