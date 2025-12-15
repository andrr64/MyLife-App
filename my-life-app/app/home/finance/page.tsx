'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FinanceHeader } from '@/components/by-feature/finance/FinanceHeader';
import { FinanceStats } from '@/components/by-feature/finance/FinanceStats';
import { AccountsWidget } from '@/components/by-feature/finance/widgets/AccountWidget';
import { RecentTransactionsWidget } from '@/components/by-feature/finance/widgets/RecentTransactionWidget';
import { ExpenseDonutChart } from '@/components/by-feature/finance/charts/PieChart';
import { useFinanceDashboard } from '@/hooks/finance/useFinanceDashboard';

function FinancePage() {
    // 1. Single hook call for all finance data & logic
    const { 
        accounts, 
        totalBalance, 
        stats, 
        incomeCategories, 
        expenseCategories, 
        isLoading, 
        error, 
        refreshKey, 
        expenseSummary,
        handleTransactionSuccess 
    } = useFinanceDashboard();

    return (
        <div className="flex-1 space-y-6 p-8 pt-6 bg-background min-h-screen">
            <FinanceHeader />

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics" disabled>Analytics</TabsTrigger>
                    <TabsTrigger value="reports" disabled>Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <FinanceStats 
                        totalBalance={totalBalance} 
                        isLoading={isLoading} 
                        thisMonthIncome={stats.income}
                        thisMonthExpense={stats.expense}
                    />

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <div className='col-span-3'>
                            {/* Uses refreshKey to force redraw when data updates */}
                            <ExpenseDonutChart key={`chart-${refreshKey}`} data={expenseSummary} />
                        </div>

                        <div className="col-span-3 space-y-4">
                            <AccountsWidget
                                accounts={accounts}
                                loading={isLoading}
                                incomeCategories={incomeCategories}
                                expenseCategories={expenseCategories}
                                error={error}
                                onTransactionSuccess={handleTransactionSuccess}
                            />
                            
                            <RecentTransactionsWidget key={`tx-${refreshKey}`} />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default FinancePage;