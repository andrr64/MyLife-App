'use client';

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AccountListSkeleton } from '@/components/skeletons/AccountListSkeleton';
import { AccountResponse } from '@/types/dto/finance/response/account_response';
import { motion, AnimatePresence } from 'framer-motion';
import { AddAccountDialog } from '../dialog/AddAccount';
import { DetailAccountDialog } from '../dialog/DetailAccount';
import { getAccountIcon } from '@/utils/IconMapper';
import { AddTransactionDialog } from '../dialog/AddTransaction';
import { CategoryResponse } from '@/types/dto/finance/response/category_response';

interface AccountsWidgetProps {
  accounts: AccountResponse[];
  incomeCategories: CategoryResponse[];
  expenseCategories: CategoryResponse[];
  onTransactionSuccess?: () => void;
  loading: boolean;
  error: string | null;
}

export function AccountsWidget({ accounts, incomeCategories, expenseCategories, onTransactionSuccess, loading, error }: AccountsWidgetProps) {

  const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card>
      <CardHeader className="flex space-y-4 flex-col pb-2">
        <div className='flex flex-row w-full justify-between'>
          <div className="space-y-1">
            <CardTitle className="text-base">My Accounts</CardTitle>
            <CardDescription>Sumber dana tersedia.</CardDescription>
          </div>
        </div>
        <div className='flex flex-row space-x-2'>
          <AddAccountDialog />

          {accounts.length > 0 && (
            <AddTransactionDialog 
              accounts={accounts} 
              incomeCategories={incomeCategories} 
              expenseCategories={expenseCategories}
              onSuccess={onTransactionSuccess}
            />
          )}
        </div>
      </CardHeader>

      <CardContent className="min-h-[200px]">
        <AnimatePresence mode="wait">
          {/* STATE 1: LOADING */}
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AccountListSkeleton />
            </motion.div>
          )}

          {/* STATE 2: ERROR */}
          {!loading && error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-6 text-red-500 space-y-2 border border-red-200 rounded-md bg-red-50 dark:bg-red-900/10"
            >
              <AlertCircle className="h-8 w-8" />
              <p className="text-sm font-medium">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
                className="mt-2"
              >
                <RefreshCw className="w-3 h-3 mr-2" /> Retry
              </Button>
            </motion.div>
          )}

          {/* STATE 3: SUCCESS BUT EMPTY */}
          {!loading && !error && accounts.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8 text-muted-foreground text-sm border border-dashed rounded-lg"
            >
              <p>Belum ada akun terdaftar.</p>
              <div className="mt-2 flex justify-center">
                <AddAccountDialog />
              </div>
            </motion.div>
          )}

          {/* STATE 4: SUCCESS WITH DATA */}
          {!loading && !error && accounts.length > 0 && (
            <motion.div
              key="list"
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-4"
            >
              {accounts.map((acc, index) => {
                const { icon: Icon, bg } = getAccountIcon(acc.type);

                return (
                  // BUNGKUS ITEM DENGAN DETAIL DIALOG
                  <DetailAccountDialog key={acc.id} account={acc}>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1
                      }}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-md transition-colors ${bg}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium group-hover:text-primary transition-colors">
                            {acc.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {/* Tampilkan no rekening jika ada, atau ID pendek */}
                            {`ID: ${acc.id.substring(0, 8)}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-foreground">
                          {formatIDR(acc.balance)}
                        </p>
                      </div>
                    </motion.div>
                  </DetailAccountDialog>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}