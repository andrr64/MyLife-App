// src/http/http_helper.ts

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

class HttpHelper {
    constructor(private baseUrl = "") { }

    private async request<T>(
        method: HttpMethod,
        url: string,
        body?: any,
        headers: Record<string, string> = {}
    ): Promise<T> {
        const res = await fetch(this.baseUrl + url, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        const json = await res.json().catch(() => null);

        if (!res.ok) {
            throw {
                status: res.status,
                message: json?.message ?? "Request failed",
                details: json?.details ?? null,
            };
        }

        return json as T;
    }

    get<T>(url: string, headers?: Record<string, string>) {
        return this.request<T>("GET", url, undefined, headers);
    }

    post<T>(url: string, data?: any, headers?: Record<string, string>) {
        return this.request<T>("POST", url, data, headers);
    }

    put<T>(url: string, data?: any, headers?: Record<string, string>) {
        return this.request<T>("PUT", url, data, headers);
    }

    delete<T>(url: string, headers?: Record<string, string>) {
        return this.request<T>("DELETE", url, undefined, headers);
    }
}

export const http = new HttpHelper();
