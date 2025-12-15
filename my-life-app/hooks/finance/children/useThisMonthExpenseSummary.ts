import { DashboardService } from "@/services/finance/DashboardService";
import { ValueByCategoryResponse } from "@/types/dto/finance/response/value_by_category_response";
import { useCallback, useEffect, useState } from "react";

export function useThisMonthExpenseSummary() {
    const [expenseSummary, setExpenseSummary] = useState<ValueByCategoryResponse<number>[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await DashboardService.getThisMonthExpensePieChart();
            if (response.data) {
                setExpenseSummary(response.data);
            } else {
                throw new Error("No data received");
            }
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        expenseSummary,
        loading,
        error,
        fetchData
    };
}