'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAccounts } from '@/hooks/finance/useAccounts';
import { FinanceHeader } from '@/components/by-feature/finance/FinanceHeader';
import { FinanceStats } from '@/components/by-feature/finance/FinanceStats';
import { CashFlowChart } from '@/components/by-feature/finance/CashFlowChart';
import { AccountsWidget } from '@/components/by-feature/finance/widgets/AccountWidget';
import { RecentTransactionsWidget } from '@/components/by-feature/finance/widgets/RecentTransactionWidget';
import { useCategories } from '@/hooks/finance/useCategory';

// Hooks
// Components

function FinancePage() {
    // 1. Data Fetching
    const { data: accounts, loading, error } = useAccounts();
    const categoriyHook = useCategories();

    // 2. Logic (Calculate Total Balance for KPI)
    const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);

    return (
        <div className="flex-1 space-y-6 p-8 pt-6 bg-background min-h-screen">

            {/* 1. HEADER */}
            <FinanceHeader />

            {/* 2. TABS & CONTENT */}
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics" disabled>Analytics</TabsTrigger>
                    <TabsTrigger value="reports" disabled>Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">

                    {/* A. KPI CARDS */}
                    <FinanceStats totalBalance={totalBalance} isLoading={loading} />

                    {/* B. MAIN GRID */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                        {/* Left: Chart */}
                        <CashFlowChart />

                        {/* Right: Widgets */}
                        <div className="col-span-3 space-y-4">
                            <AccountsWidget
                                accounts={accounts}
                                loading={loading}
                                incomeCategories={categoriyHook.incomeCt}
                                expenseCategories={categoriyHook.expenseCt}
                                error={error}
                            />
                            <RecentTransactionsWidget />
                        </div>

                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default FinancePage;