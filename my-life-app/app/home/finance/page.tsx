'use client';

import React from 'react';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    CreditCard,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    MoreHorizontal,
    Download,
    Landmark,    // Icon Bank
    Smartphone,  // Icon E-Wallet
    WalletCards, // Icon Cash
    Plus         // Icon Tambah
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// --- DATA DUMMY ---

const transactions = [
    {
        id: 1,
        name: 'Spotify Premium',
        category: 'Subscription',
        date: '2024-11-26',
        amount: -55000,
        status: 'Success',
    },
    {
        id: 2,
        name: 'Freelance Project A',
        category: 'Income',
        date: '2024-11-25',
        amount: 2500000,
        status: 'Success',
    },
    {
        id: 3,
        name: 'Indomaret Point',
        category: 'Groceries',
        date: '2024-11-24',
        amount: -125000,
        status: 'Success',
    },
    {
        id: 4,
        name: 'Transfer to Mom',
        category: 'Family',
        date: '2024-11-23',
        amount: -500000,
        status: 'Pending',
    },
];

const accounts = [
    {
        id: 1,
        name: 'BCA Tahapan',
        number: '**** 4589',
        balance: 8500000,
        icon: Landmark,
        // Styling khusus agar warna icon berbeda-beda
        bg: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    },
    {
        id: 2,
        name: 'GoPay',
        number: '0812-****-9988',
        balance: 450000,
        icon: Smartphone,
        bg: 'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400',
    },
    {
        id: 3,
        name: 'Cash / Petty',
        number: 'Wallet',
        balance: 1200000,
        icon: WalletCards,
        bg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    },
];

// --- HELPER FUNCTIONS ---

const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
};

// --- MAIN COMPONENT ---

function FinancePage() {
    return (
        <div className="flex-1 space-y-6 p-8 pt-6 bg-background min-h-screen">

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Finance</h2>
                    <p className="text-muted-foreground">
                        Monitor pendapatan, pengeluaran, dan saldo rekening Anda.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" className="hidden sm:flex">
                        <CalendarDateRangePicker />
                        <span className="ml-2">Okt 2024 - Nov 2024</span>
                    </Button>
                    <Button>
                        <Download className="mr-2 h-4 w-4" /> Download Report
                    </Button>
                </div>
            </div>

            {/* Tabs Layout */}
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics" disabled>Analytics</TabsTrigger>
                    <TabsTrigger value="reports" disabled>Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">

                    {/* 1. KPI Cards (Top Row) */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Balance
                                </CardTitle>
                                <Wallet className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatIDR(10150000)}</div>
                                <p className="text-xs text-muted-foreground flex items-center mt-1">
                                    <span className="text-emerald-500 flex items-center mr-1">
                                        <TrendingUp className="w-3 h-3 mr-1" /> +20.1%
                                    </span>
                                    dari bulan lalu
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Income
                                </CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                    {formatIDR(8250000)}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    +4 project baru
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Expenses
                                </CardTitle>
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                    {formatIDR(3400000)}
                                </div>
                                <p className="text-xs text-muted-foreground flex items-center mt-1">
                                    <span className="text-red-500 flex items-center mr-1">
                                        <TrendingDown className="w-3 h-3 mr-1" /> +4%
                                    </span>
                                    lebih boros
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Subscriptions
                                </CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">4 Active</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Netflix, Spotify, Adobe
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* 2. Main Grid Content */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                        {/* Left Column: Chart (Takes 4 columns) */}
                        <Card className="col-span-4 h-full">
                            <CardHeader>
                                <CardTitle>Cash Flow</CardTitle>
                                <CardDescription>
                                    Perbandingan performa keuangan tahun ini.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                {/* Dummy Chart Visual using pure Tailwind */}
                                <div className="h-[350px] w-full flex items-end justify-between px-4 gap-2">
                                    {[40, 60, 45, 80, 55, 70, 90, 65, 50, 75, 85, 95].map((h, i) => (
                                        <div key={i} className="group relative flex flex-col items-center gap-2 w-full">
                                            <div
                                                className="w-full bg-primary/20 hover:bg-primary transition-all duration-300 rounded-t-md cursor-pointer"
                                                style={{ height: `${h}%` }}
                                            />
                                            <span className="text-[10px] text-muted-foreground">
                                                {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Right Column: Accounts & Transactions (Takes 3 columns) */}
                        <div className="col-span-3 space-y-4">

                            {/* --- A. ACCOUNTS CARD --- */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <div className="space-y-1">
                                        <CardTitle className="text-base">My Accounts</CardTitle>
                                        <CardDescription>Sumber dana tersedia.</CardDescription>
                                    </div>
                                    <Button size="icon" variant="outline" className="h-8 w-8">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {accounts.map((acc) => (
                                        <div
                                            key={acc.id}
                                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-md ${acc.bg}`}>
                                                    <acc.icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{acc.name}</p>
                                                    <p className="text-xs text-muted-foreground">{acc.number}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold">{formatIDR(acc.balance)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* --- B. TRANSACTIONS CARD --- */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Transactions</CardTitle>
                                    <CardDescription>
                                        Mutasi terakhir bulan ini.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {transactions.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    {/* Icon Panah (Merah/Hijau) */}
                                                    <div className={`p-2 rounded-full ${item.amount > 0 ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'bg-red-100 text-red-600 dark:bg-red-900/30'}`}>
                                                        {item.amount > 0 ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                                                    </div>

                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium leading-none">{item.name}</p>
                                                        <p className="text-xs text-muted-foreground">{item.category}</p>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <div className={`text-sm font-medium ${item.amount > 0 ? 'text-emerald-600' : ''}`}>
                                                        {item.amount > 0 ? '+' : ''}{formatIDR(item.amount)}
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">{item.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Separator className="my-4" />

                                    <Button variant="ghost" className="w-full text-xs">
                                        View All Transactions <MoreHorizontal className="ml-2 w-4 h-4" />
                                    </Button>
                                </CardContent>
                            </Card>

                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

// Icon SVG Kalender kecil
function CalendarDateRangePicker() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 opacity-50"
        >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
    )
}

export default FinancePage;