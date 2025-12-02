import { CategoryService } from "@/services/finance/CategoryService";
import { CategoryResponse } from "@/types/dto/finance/response/category_response";
import { useEffect, useState } from "react";

export function useCategories(){
    const [incomeCt, setIncomeCt] = useState<CategoryResponse[]>([]);
    const [expenseCt, setExpenseCt] = useState<CategoryResponse[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [errorIncome, setErrorIncome] = useState<string | null>(null);
    const [errorExpense, setErrorExpense] = useState<string | null>(null);

    useEffect(() => { 
        const fetchCategories = async () => {
            setLoading(true);
            setErrorIncome(null);
            setErrorExpense(null);

            try {
                const incomeCTresponse = await CategoryService.getIncomeCategories();
                const expenseCTresponse = await CategoryService.getExpenseCategories();
                
                if (incomeCTresponse.data){
                    setIncomeCt(incomeCTresponse.data);
                }
                if (expenseCTresponse.data){
                    setExpenseCt(expenseCTresponse.data);
                }
            } catch (error: any) {
                setErrorIncome(error.message || 'An error occurred');
                setErrorExpense(error.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { incomeCt, expenseCt, loading, errorIncome, errorExpense };
}