// src/services/AuthService.ts

import { http } from "@/http/http_helper";
import { ApiResponse } from "@/types/api_response";
import { LoginRequest } from "@/types/dto/user/request/login";
import { RegisterRequest } from "@/types/dto/user/request/register";
import { AuthResponse } from "@/types/dto/user/response/auth_response";
const BASE = "/api/proxy/user-service/auth";
export class AuthService {
    static login(data: LoginRequest) {
        return http.post<ApiResponse<AuthResponse>>(`${BASE}/login`, data);
    }

    static register(data: RegisterRequest) {
        return http.post<ApiResponse<string>>(`${BASE}/register`, data);
    }
}
