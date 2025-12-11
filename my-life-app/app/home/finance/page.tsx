'use client';

import { useState } from 'react'; // 1. Import useState
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAccounts } from '@/hooks/finance/useAccounts';
import { FinanceHeader } from '@/components/by-feature/finance/FinanceHeader';
import { FinanceStats } from '@/components/by-feature/finance/FinanceStats';
import { CashFlowChart } from '@/components/by-feature/finance/CashFlowChart';
import { AccountsWidget } from '@/components/by-feature/finance/widgets/AccountWidget';
import { RecentTransactionsWidget } from '@/components/by-feature/finance/widgets/RecentTransactionWidget';
import { useCategories } from '@/hooks/finance/useCategory';
import { useFinanceStats } from '@/hooks/finance/useFinanceStats';

function FinancePage() {
    // 2. State untuk memaksa refresh komponen anak (Chart & Recent Transaction)
    const [refreshKey, setRefreshKey] = useState(0);

    // 3. Panggil useAccounts SEKALI saja, ambil data DAN refetch-nya
    const { 
        data: accounts, 
        loading, 
        error, 
        refetch: refetchAccounts 
    } = useAccounts();
    const categoryHook = useCategories();
    const financeStatesHook = useFinanceStats();

    // Logic KPI
    const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);

    // 4. Buat handler terpusat saat transaksi sukses
    const handleTransactionSuccess = () => {
        console.log("Transaction Success Triggered!");

        // A. Refresh data akun (agar saldo update)
        refetchAccounts();
        financeStatesHook.fetchData();

        // B. Ubah key untuk memaksa Chart & History re-mount (fetch ulang data baru)
        setRefreshKey(prev => prev + 1);
    };

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
                        isLoading={financeStatesHook.loading} 
                        thisMonthIncome={financeStatesHook.thisMonthIncome.value}
                        thisMonthExpense={financeStatesHook.thisMonthExpense.value}
                    />

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        {/* 5. Pasang key={refreshKey} disini.
                           Saat refreshKey berubah, komponen ini akan destroy & create ulang,
                           otomatis memanggil API fetch data grafiknya lagi.
                        */}
                        <CashFlowChart key={`chart-${refreshKey}`} />

                        <div className="col-span-3 space-y-4">
                            <AccountsWidget
                                accounts={accounts}
                                loading={loading}
                                incomeCategories={categoryHook.incomeCt}
                                expenseCategories={categoryHook.expenseCt}
                                error={error}
                                // 6. Pass handler yang benar
                                onTransactionSuccess={handleTransactionSuccess}
                            />
                            
                            {/* Pasang key disini juga biar list transaksi update */}
                            <RecentTransactionsWidget key={`tx-${refreshKey}`} />
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default FinancePage;