'use client';

import React from 'react';
import { Plus, AlertCircle, RefreshCw } from 'lucide-react';
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
import { getAccountIcon } from '@/utils/IconMapper';

interface AccountsWidgetProps {
  accounts: AccountResponse[];
  loading: boolean;
  error: string | null;
}

export function AccountsWidget({ accounts, loading, error }: AccountsWidgetProps) {
  
  const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
    }).format(value);
  };

  return (
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
      
      {/* Tambahkan min-h agar card tidak 'melompat' ukurannya saat transisi */}
      <CardContent className="min-h-[200px]">
        
        {/* AnimatePresence mode="wait": Tunggu elemen lama hilang dulu baru elemen baru muncul */}
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
              initial={{ opacity: 0, y: 10 }} // Mulai dari agak bawah
              animate={{ opacity: 1, y: 0 }}  // Muncul ke posisi asli
              exit={{ opacity: 0, y: -10 }}   // Hilang ke atas
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
              <Button
                variant="link"
                className="text-primary p-0 h-auto font-normal"
              >
                + Tambah Akun Baru
              </Button>
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
                  // Item List dengan Staggered Animation (Muncul satu per satu)
                  <motion.div
                    key={acc.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ 
                        duration: 0.3, 
                        delay: index * 0.1 // Delay bertahap: item 1 (0s), item 2 (0.1s), item 3 (0.2s)...
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
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">
                        {formatIDR(acc.balance)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}