'use client';

import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AccountService } from '@/services/finance/AccountService';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function AddAccountDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // State Form
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    initialBalance: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validasi sederhana
      if (!formData.name || !formData.type) {
        toast.error('Nama dan Tipe Akun wajib diisi');
        return;
      }

      await AccountService.createAccount({
        name: formData.name,
        type: formData.type as 'BANK' | 'CASH' | 'E_WALLET',
        initialBalance: Number(formData.initialBalance),
      });

      toast.success('Akun berhasil dibuat!');
      setOpen(false); // Tutup modal
      setFormData({ name: '', type: '', initialBalance: 0 }); // Reset form

      // Refresh halaman untuk memuat data baru
      router.refresh(); 
      window.location.reload(); // Fallback hard refresh agar data update instan
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Gagal membuat akun');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button (Tombol Plus) */}
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="h-8 w-8">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      {/* Konten Modal */}
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Account</DialogTitle>
            <DialogDescription>
              Tambahkan sumber dana baru untuk memonitor keuangan Anda.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Input Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="name"
                placeholder="e.g. BCA Utama"
                className="col-span-3"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            {/* Select Type */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <div className="col-span-3">
                <Select
                  onValueChange={(val) =>
                    setFormData({ ...formData, type: val })
                  }
                  value={formData.type}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BANK">Bank Account</SelectItem>
                    <SelectItem value="CASH">Cash / Tunai</SelectItem>
                    <SelectItem value="E_WALLET">E-Wallet (OVO, GoPay, dll)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Input Initial Balance */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="balance" className="text-right">
                Balance
              </Label>
              <Input
                id="balance"
                type="number"
                placeholder="0"
                className="col-span-3"
                min={0}
                value={formData.initialBalance}
                onChange={(e) =>
                  setFormData({ ...formData, initialBalance: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Account
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}