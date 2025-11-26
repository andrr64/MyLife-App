import { Landmark, Smartphone, WalletCards, Wallet } from 'lucide-react';

export const getAccountIcon = (type: string) => {
    // Pastikan type di-uppercase agar match dengan ENUM backend (BANK, E_WALLET, CASH)
    switch (type?.toUpperCase()) {
        case 'BANK': 
            return { icon: Landmark, bg: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' };
        case 'E_WALLET': 
            return { icon: Smartphone, bg: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30' };
        case 'CASH': 
            return { icon: WalletCards, bg: 'bg-green-100 text-green-600 dark:bg-green-900/30' };
        default: 
            return { icon: Wallet, bg: 'bg-gray-100 text-gray-600 dark:bg-gray-800' };
    }
};