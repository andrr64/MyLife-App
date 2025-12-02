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

// UPDATE PROPS: Menerima kategori terpisah
interface AddTransactionDialogProps {
  accounts: AccountResponse[];
  incomeCategories: CategoryResponse[];
  expenseCategories: CategoryResponse[];
}

// Helper untuk mendapatkan waktu lokal format YYYY-MM-DDTHH:mm
const getCurrentLocalISOString = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
};

export function AddTransactionDialog({ 
  accounts, 
  incomeCategories, 
  expenseCategories 
}: AddTransactionDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // State Form
  const [formData, setFormData] = useState({
    type: 'EXPENSE',
    accountId: '',
    targetAccountId: '',
    categoryId: '',
    amount: '',
    description: '',
    date: getCurrentLocalISOString(),
  });

  // LOGIC: Menentukan list kategori mana yang ditampilkan berdasarkan Tipe Transaksi
  const activeCategories = formData.type === 'INCOME' ? incomeCategories : expenseCategories;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Validasi Basic
      if (!formData.accountId || !formData.amount) {
        toast.error('Akun asal dan jumlah uang wajib diisi');
        setLoading(false);
        return;
      }

      // 2. Validasi Conditional
      if (formData.type === 'TRANSFER' && !formData.targetAccountId) {
        toast.error('Tujuan transfer wajib dipilih');
        setLoading(false);
        return;
      }
      if (formData.type !== 'TRANSFER' && !formData.categoryId) {
        toast.error('Kategori wajib dipilih');
        setLoading(false);
        return;
      }

      // 3. Prepare Payload
      const payload = {
        accountId: formData.accountId,
        type: formData.type,
        amount: Number(formData.amount),
        description: formData.description,
        transactionDate: new Date(formData.date).toISOString(),
        // Conditional Fields
        ...(formData.type === 'TRANSFER'
          ? { targetAccountId: formData.targetAccountId }
          : { categoryId: formData.categoryId }),
      };

      // TODO: Integrasikan dengan TransactionService disini
      console.log('Payload to Backend:', payload);

      // Simulasi Network Call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success('Transaksi berhasil disimpan!');
      setOpen(false);

      // Reset Form ke default state
      setFormData({
        type: 'EXPENSE',
        accountId: '',
        targetAccountId: '',
        categoryId: '',
        amount: '',
        description: '',
        date: getCurrentLocalISOString(),
      });

      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error('Gagal menyimpan transaksi');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSetNow = () => {
    handleChange('date', getCurrentLocalISOString());
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
                  onValueChange={(val) => {
                    // Reset conditional fields saat ganti tipe
                    setFormData(prev => ({ ...prev, type: val, categoryId: '', targetAccountId: '' }));
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

            {/* 2. Source Account (Mapped from Props) */}
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

            {/* 3. Conditional Fields (Category OR Target Account) */}
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
                        .filter(acc => acc.id !== formData.accountId) // Prevent transfer to self
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
                    value={formData.categoryId}
                    onValueChange={(val) => handleChange('categoryId', val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* Render kategori berdasarkan tipe yang dipilih (activeCategories) */}
                      {activeCategories.length > 0 ? (
                        activeCategories.map((cat) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-muted-foreground text-center">
                          Tidak ada kategori tersedia
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
                  value={formData.amount}
                  onChange={(e) => handleChange('amount', e.target.value)}
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
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
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