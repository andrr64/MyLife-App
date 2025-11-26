import React from 'react';
import {
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Data Dummy (Bisa dipindahkan ke props nantinya jika sudah ada API)
const TRANSACTIONS = [
    { id: 1, name: 'Spotify Premium', category: 'Subscription', date: '2024-11-26', amount: -55000, status: 'Success' },
    { id: 2, name: 'Freelance Project A', category: 'Income', date: '2024-11-25', amount: 2500000, status: 'Success' },
    { id: 3, name: 'Indomaret Point', category: 'Groceries', date: '2024-11-24', amount: -125000, status: 'Success' },
    { id: 4, name: 'Transfer to Mom', category: 'Family', date: '2024-11-23', amount: -500000, status: 'Pending' },
];

export function RecentTransactionsWidget() {
    const formatIDR = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Mutasi terakhir bulan ini.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {TRANSACTIONS.map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div
                                    className={`p-2 rounded-full ${item.amount > 0
                                            ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30'
                                            : 'bg-red-100 text-red-600 dark:bg-red-900/30'
                                        }`}
                                >
                                    {item.amount > 0 ? (
                                        <ArrowDownRight className="w-4 h-4" />
                                    ) : (
                                        <ArrowUpRight className="w-4 h-4" />
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {item.category}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div
                                    className={`text-sm font-medium ${item.amount > 0 ? 'text-emerald-600' : ''
                                        }`}
                                >
                                    {item.amount > 0 ? '+' : ''}
                                    {formatIDR(item.amount)}
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
    );
}