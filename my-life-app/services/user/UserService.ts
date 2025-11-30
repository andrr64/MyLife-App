import { http } from "@/http/http_helper";
import { ApiResponse } from "@/types/api_response";
import { UserResponse } from "@/types/dto/user/response/user_response";

const BASE = "/api/proxy/user-service/user";

export class UserService {
    static me(){
        return http.get<ApiResponse<UserResponse>>(`${BASE}/me`)
    }
}