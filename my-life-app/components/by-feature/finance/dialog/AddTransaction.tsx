'use client';

import React, { useState } from 'react';
import { Plus, Loader2, ArrowRightLeft, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { AccountResponse } from '@/types/dto/finance/response/account_response';
import { CategoryResponse } from '@/types/dto/finance/response/category_response';
import { TransactionRequest } from '@/types/dto/finance/request/transaction_request';
import { TransactionService } from '@/services/finance/TransactionService'; // IMPORT SERVICE

interface AddTransactionDialogProps {
  accounts: AccountResponse[];
  onSuccess?: () => void;
  incomeCategories: CategoryResponse[];
  expenseCategories: CategoryResponse[];
}

// Helper: Get local ISO string for datetime-local input (YYYY-MM-DDTHH:mm)
const getCurrentLocalISOString = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
};

export function AddTransactionDialog({ 
  accounts, 
  incomeCategories, 
  expenseCategories,
  onSuccess
}: AddTransactionDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Initial State
  const initialFormState: TransactionRequest = {
    type: 'EXPENSE',
    accountId: '',
    targetAccountId: undefined, // Gunakan undefined biar bersih saat JSON stringify
    categoryId: undefined,      
    amount: 0,
    description: '',
    transactionDate: getCurrentLocalISOString(),
  };

  const [formData, setFormData] = useState<TransactionRequest>(initialFormState);

  // Logic: Filter kategori berdasarkan tipe transaksi
  const activeCategories = formData.type === 'INCOME' ? incomeCategories : expenseCategories;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // --- 1. Validasi Frontend ---
      if (!formData.accountId) {
        toast.error('Akun asal wajib dipilih');
        setLoading(false); 
        return;
      }
      if (formData.amount <= 0) {
        toast.error('Jumlah uang harus lebih dari 0');
        setLoading(false);
        return;
      }

      // Validasi Conditional
      if (formData.type === 'TRANSFER' && !formData.targetAccountId) {
        toast.error('Tujuan transfer wajib dipilih');
        setLoading(false);
        return;
      }
      if (formData.type === 'TRANSFER' && formData.accountId === formData.targetAccountId) {
        toast.error('Tidak bisa transfer ke akun yang sama');
        setLoading(false);
        return;
      }
      // Validasi Kategori (Hanya untuk Income/Expense)
      if (formData.type !== 'TRANSFER' && !formData.categoryId) {
        toast.error('Kategori wajib dipilih');
        setLoading(false);
        return;
      }

      // --- 2. Prepare Payload ---
      // Clone object agar state asli tidak bermutasi
      const payload: TransactionRequest = {
        ...formData,
        // Konversi string datetime-local kembali ke ISO-8601 UTC (Instant)
        transactionDate: new Date(formData.transactionDate).toISOString(),
      };

      // BERSIHKAN FIELD YANG TIDAK RELEVAN
      if (payload.type === 'TRANSFER') {
        // Jika Transfer, hapus categoryId
        delete (payload as any).categoryId;
      } else {
        // Jika Income/Expense, hapus targetAccountId
        delete payload.targetAccountId;
      }

      // --- 3. Call Backend API ---
      await TransactionService.createTransaction(payload);

      // --- 4. Success Handling ---
      toast.success('Transaksi berhasil disimpan!');
      setOpen(false);
      setFormData(initialFormState); // Reset form
      
      if (onSuccess){
        onSuccess();
      } else {
        window.location.reload(); // Fallback hard refresh agar data update instan
      }
    } catch (error: any) {
      console.error("Transaction Error:", error);
      // Coba ambil pesan error spesifik dari backend jika ada
      const errorMessage = error.response?.data?.message || error.message || 'Gagal menyimpan transaksi';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Generic Change Handler
  const handleChange = (key: keyof TransactionRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSetNow = () => {
    handleChange('transactionDate', getCurrentLocalISOString());
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-8 px-3 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span className="text-sm">Add Transaction</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>New Transaction</DialogTitle>
            <DialogDescription>
              Catat pemasukan, pengeluaran, atau transfer antar akun.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">

            {/* 1. Transaction Type */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Type</Label>
              <div className="col-span-3">
                <Select
                  value={formData.type}
                  onValueChange={(val: any) => {
                    // Reset field conditional saat tipe berubah biar bersih
                    setFormData(prev => ({ 
                      ...prev, 
                      type: val, 
                      categoryId: undefined, 
                      targetAccountId: undefined 
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EXPENSE">
                      <div className="flex items-center">
                        <TrendingDown className="w-4 h-4 mr-2 text-red-500" /> Expense
                      </div>
                    </SelectItem>
                    <SelectItem value="INCOME">
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-emerald-500" /> Income
                      </div>
                    </SelectItem>
                    <SelectItem value="TRANSFER">
                      <div className="flex items-center">
                        <ArrowRightLeft className="w-4 h-4 mr-2 text-blue-500" /> Transfer
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 2. Source Account */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">From Account</Label>
              <div className="col-span-3">
                <Select
                  value={formData.accountId}
                  onValueChange={(val) => handleChange('accountId', val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select source account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((acc) => (
                      <SelectItem key={acc.id} value={acc.id}>
                        {acc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 3. Conditional Fields */}
            {formData.type === 'TRANSFER' ? (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">To Account</Label>
                <div className="col-span-3">
                  <Select
                    value={formData.targetAccountId}
                    onValueChange={(val) => handleChange('targetAccountId', val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts
                        .filter(acc => acc.id !== formData.accountId) // Filter agar tidak transfer ke diri sendiri
                        .map((acc) => (
                          <SelectItem key={acc.id} value={acc.id}>
                            {acc.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Category</Label>
                <div className="col-span-3">
                  <Select
                    // Handle value: jika undefined/0/null set undefined agar placeholder muncul
                    value={formData.categoryId ? String(formData.categoryId) : undefined}
                    onValueChange={(val) => handleChange('categoryId', Number(val))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeCategories.length > 0 ? (
                        activeCategories.map((cat) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-muted-foreground text-center">
                          Tidak ada kategori {formData.type.toLowerCase()}
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* 4. Amount */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">Amount</Label>
              <div className="col-span-3">
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  min="0"
                  // Tampilkan kosong jika 0 agar UX lebih bersih saat ngetik
                  value={formData.amount === 0 ? '' : formData.amount}
                  onChange={(e) => handleChange('amount', Number(e.target.value))}
                />
              </div>
            </div>

            {/* 5. Date */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Date</Label>
              <div className="col-span-3 flex gap-2">
                <Input
                  id="date"
                  type="datetime-local"
                  className="flex-1"
                  value={formData.transactionDate}
                  onChange={(e) => handleChange('transactionDate', e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleSetNow}
                  title="Set to Current Time"
                >
                  <Clock className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* 6. Description */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="desc" className="text-right mt-2">Notes</Label>
              <div className="col-span-3">
                <Textarea
                  id="desc"
                  placeholder="Contoh: Makan siang nasi padang"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
              </div>
            </div>

          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Transaction
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}