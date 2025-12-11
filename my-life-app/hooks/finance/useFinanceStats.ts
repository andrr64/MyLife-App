import { DashboardService } from "@/services/finance/DashboardService";
import { BigDecimalResponse } from "@/types/dto/finance/response/bigdecimal_response";
import { useCallback, useEffect, useState } from "react";

export function useFinanceStats() {
    const [thisMonthIncome, setThisMonthIncome] = useState<BigDecimalResponse>({ value: 0 });
    const [thisMonthExpense, setThisMonthExpense] = useState<BigDecimalResponse>({ value: 0 });

    const [loading, setLoading] = useState<boolean>(false);
    const [errorThisMonthIncome, setErrorThisMonthIncome] = useState<string | null>(null);
    const [errorThisMonthExpense, setErrorThisMonthExpense] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const thisMonthIncomeResponse = await DashboardService.getThisMonthIncome();
            const thisMonthExpenseResponse = await DashboardService.getThisMonthExpense();

            if (thisMonthIncomeResponse.data) {
                setThisMonthIncome(thisMonthIncomeResponse.data);
            }

            if (thisMonthExpenseResponse.data) {
                setThisMonthExpense(thisMonthExpenseResponse.data);
            }
        } catch (error) {
            setErrorThisMonthIncome(error as any);
            setErrorThisMonthExpense(error as any);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [])

    return { thisMonthIncome, thisMonthExpense, loading, errorThisMonthIncome, errorThisMonthExpense, fetchData };
}
