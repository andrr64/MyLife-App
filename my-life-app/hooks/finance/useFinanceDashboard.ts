import { useState } from 'react';
import { useAccounts } from '@/hooks/finance/children/useAccounts';
import { useCategories } from '@/hooks/finance/children/useCategory';
import { useFinanceStats } from '@/hooks/finance/children/useFinanceStats';
import { useThisMonthExpenseSummary } from './children/useThisMonthExpenseSummary';

export function useFinanceDashboard() {
  // 1. State for forcing re-renders of child widgets
  const [refreshKey, setRefreshKey] = useState(0);

  // 2. Aggregate all hooks
  const { 
    data: accounts, 
    loading: accountsLoading, 
    error: accountsError, 
    refetch: refetchAccounts 
  } = useAccounts();

  const { 
    incomeCt: incomeCategories, 
    expenseCt: expenseCategories 
  } = useCategories();

  const { 
    loading: statsLoading, 
    thisMonthIncome, 
    thisMonthExpense, 
    fetchData: refetchStats 
  } = useFinanceStats();

  const {
    loading: expenseSummaryLoading,
    expenseSummary: expenseSummaryData,
    error: expenseSummaryError,
    fetchData: refetchExpenseSummary
  } = useThisMonthExpenseSummary(); 

  // 3. Derived Computations
  const totalBalance = accounts?.reduce((acc: number, curr: any) => acc + (curr.balance || 0), 0) || 0;

  // 4. Centralized Action Handler
  const handleTransactionSuccess = () => {
    console.log("Transaction Success Triggered!");
    
    // Refresh data
    refetchAccounts();
    refetchStats();
    refetchExpenseSummary();
    
    // Force widgets to update
    setRefreshKey((prev) => prev + 1);
  };

  return {
    // Data
    accounts,
    incomeCategories,
    expenseCategories,
    totalBalance,
    stats: {
      income: thisMonthIncome?.value || 0,
      expense: thisMonthExpense?.value || 0,
    },
    expenseSummary: expenseSummaryData,
    // UI State
    isLoading: accountsLoading || statsLoading || expenseSummaryLoading,
    error: accountsError || expenseSummaryError ,
    refreshKey,

    // Actions
    handleTransactionSuccess,
  };
}