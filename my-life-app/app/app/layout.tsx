import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar'; // Import Sidebar wrapper tadi
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'MyLife by Andreas',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={inter.className}>

            {/* Sidebar membungkus seluruh konten halaman */}
            <Sidebar>
                {children}
            </Sidebar>

            <Toaster />
        </div>
    );
}