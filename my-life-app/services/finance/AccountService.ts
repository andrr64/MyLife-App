import { http } from "@/http/http_helper"
import { ApiResponse } from "@/types/api_response"
import { AccountRequest } from "@/types/dto/finance/request/account_request";
import { AccountResponse } from "@/types/dto/finance/response/account_response"

const BASE = "/api/proxy/finance-service/account"

export class AccountService {
    static getUserAccounts(){
        return http.get<ApiResponse<AccountResponse[]>> (`${BASE}`);
    }
    
    static createAccount(data: AccountRequest) {
        return http.post<ApiResponse<string>>(`${BASE}/add`, data);
    }
}