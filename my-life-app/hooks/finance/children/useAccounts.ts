import { useState, useEffect, useCallback } from 'react';
import { AccountService } from '@/services/finance/AccountService';
import { AccountResponse } from '@/types/dto/finance/response/account_response';

export function useAccounts() {
    const [data, setData] = useState<AccountResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAccounts = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await AccountService.getUserAccounts();
            if (response.data) {
                setData(response.data);
            } else {
                throw new Error("No data received");
            }
        } catch (err: any) {
            console.error("Failed to fetch accounts:", err);
            setError(err.message || "Gagal memuat data akun.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAccounts();
    }, [fetchAccounts]);

    return { data, loading, error, refetch: fetchAccounts };
}
