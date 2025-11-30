'use client';

import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { AccountResponse } from '@/types/dto/finance/response/account_response';
import { Calendar, CreditCard, Hash, Wallet } from 'lucide-react';
import { getAccountIcon } from '@/utils/IconMapper';

interface DetailAccountDialogProps {
    account: AccountResponse;
    children: React.ReactNode;
}

export function DetailAccountDialog({ account, children }: DetailAccountDialogProps) {
    const { icon: Icon, bg } = getAccountIcon(account.type);

    const formatIDR = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
        }).format(value);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("id-ID", {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <div className="flex items-center gap-4 mb-2">
                        <div className={`p-3 rounded-full ${bg}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <DialogTitle>{account.name}</DialogTitle>
                            <DialogDescription>Detail informasi akun Anda.</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Balance Card Big */}
                    <div className="p-6 border rounded-xl bg-muted/30 flex flex-col items-center justify-center text-center space-y-2">
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Saldo</p>
                        <h2 className="text-3xl font-bold text-primary">{formatIDR(account.balance)}</h2>
                    </div>

                    {/* Details List */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center text-muted-foreground text-sm">
                                <Hash className="w-4 h-4 mr-3" /> Account ID
                            </div>
                            <span className="text-xs font-mono bg-muted px-2 py-1 rounded">{account.id.split('-')[0]}...</span>
                        </div>

                        <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center text-muted-foreground text-sm">
                                <Wallet className="w-4 h-4 mr-3" /> Tipe Akun
                            </div>
                            <span className="text-sm font-medium">{account.type}</span>
                        </div>

                        <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center text-muted-foreground text-sm">
                                <CreditCard className="w-4 h-4 mr-3" /> Mata Uang
                            </div>
                            <span className="text-sm font-medium">{account.currency || 'IDR'}</span>
                        </div>

                        <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center text-muted-foreground text-sm">
                                <Calendar className="w-4 h-4 mr-3" /> Dibuat Pada
                            </div>
                            <span className="text-sm font-medium">{formatDate(account.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}