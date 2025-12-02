import { http } from "@/http/http_helper";
import { TransactionRequest } from "@/types/dto/finance/request/transaction_request";
import { TransactionResponse } from "@/types/dto/finance/response/transaction_response";

const BASE = "/api/proxy/finance-service/transaction"; // Usually REST uses plural, adjust if your backend is strict on /transaction

export class TransactionService {
    static createTransaction(data: TransactionRequest) {
        // Mengirim POST request
        return http.post<TransactionResponse>(`${BASE}/add`, data);
    }
}