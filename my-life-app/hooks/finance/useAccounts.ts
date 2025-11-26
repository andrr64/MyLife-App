// hooks/useAccounts.ts
import { useState, useEffect } from 'react';
import { AccountService } from '@/services/finance/AccountService';
import { AccountResponse } from '@/types/dto/finance/response/account_response';

export function useAccounts() {
    const [data, setData] = useState<AccountResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Panggil Service
                const response = await AccountService.getUserAccounts();

                // Asumsi response.data adalah wrapper ApiResponse, dan didalamnya ada field 'data'
                // Sesuaikan dengan struktur Axios/Http Helper kamu
                if (response.data) {
                    setData(response.data); // Ambil array akunnya
                } else {
                    throw new Error("No data received");
                }
            } catch (err: any) {
                console.error("Failed to fetch accounts:", err);
                setError(err.message || "Gagal memuat data akun.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
}