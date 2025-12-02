import { http } from "@/http/http_helper"
import { ApiResponse } from "@/types/api_response"
import { CategoryResponse } from "@/types/dto/finance/response/category_response"

const BASE = "/api/proxy/finance-service/category"

export class CategoryService {
    
    // Method private/generic agar scalable (bisa dipakai ulang)
    private static getCategoriesByType(type: "INCOME" | "EXPENSE") {
        // Menggunakan URLSearchParams (Utility bawaan JS)
        // Cara ini paling 'scalable' karena mudah jika nanti ada tambahan parameter lain (misal: &active=true)
        const params = new URLSearchParams();
        params.append("type", type);

        // toString() otomatis menghasilkan format: "type=INCOME"
        return http.get<ApiResponse<CategoryResponse[]>>(`${BASE}?${params.toString()}`);
    }

    static getIncomeCategories(){
        return this.getCategoriesByType("INCOME");
    }

    static getExpenseCategories(){
        return this.getCategoriesByType("EXPENSE");
    }
}