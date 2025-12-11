'use client';

import React from 'react';
import {
    TrendingUp,
    TrendingDown,
    Wallet,
    DollarSign,
    CreditCard,
    Activity,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';

// Helper format IDR
const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value);
};

interface FinanceStatsProps {
    totalBalance: number;
    isLoading: boolean;
    thisMonthIncome: number;
    thisMonthExpense: number;
}

export function FinanceStats({ totalBalance, isLoading, thisMonthIncome, thisMonthExpense }: FinanceStatsProps) {

    // Variabel animasi untuk container (stagger children)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1 // Muncul berurutan dengan jeda 0.1s
            }
        }
    };

    // Variabel animasi untuk setiap item card
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* 1. Total Balance (Dynamic) */}
            <motion.div variants={itemVariants}>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold h-8 flex items-center">
                            <AnimatePresence mode="wait">
                                {isLoading ? (
                                    <motion.div
                                        key="skeleton"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="w-full"
                                    >
                                        <Skeleton className="h-8 w-3/4" />
                                    </motion.div>
                                ) : (
                                    <motion.span
                                        key="value"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ type: "spring", stiffness: 100 }}
                                    >
                                        {formatIDR(totalBalance)}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <span className="text-emerald-500 flex items-center mr-1">
                                <TrendingUp className="w-3 h-3 mr-1" /> +20.1%
                            </span>
                            dari bulan lalu
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* 2. Income (Static/Dummy for now) */}
            <motion.div variants={itemVariants}>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Income</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            {formatIDR(thisMonthIncome)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">+4 project baru</p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* 3. Expenses (Static/Dummy) */}
            <motion.div variants={itemVariants}>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                            {formatIDR(thisMonthExpense)}
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <span className="text-red-500 flex items-center mr-1">
                                <TrendingDown className="w-3 h-3 mr-1" /> +4%
                            </span>
                            lebih boros
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            {/* 4. Subscriptions (Static/Dummy) */}
            <motion.div variants={itemVariants}>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4 Active</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Netflix, Spotify, Adobe
                        </p>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}