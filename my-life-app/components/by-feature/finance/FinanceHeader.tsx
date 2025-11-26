import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FinanceHeader() {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 space-y-2">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Finance</h2>
                <p className="text-muted-foreground">
                    Monitor pendapatan, pengeluaran, dan saldo rekening Anda.
                </p>
            </div>
            <div className="flex items-center space-x-2">
                <Button variant="outline" className="hidden sm:flex">
                    <CalendarDateRangePickerIcon />
                    <span className="ml-2">Okt 2024 - Nov 2024</span>
                </Button>
                <Button>
                    <Download className="mr-2 h-4 w-4" /> Download Report
                </Button>
            </div>
        </div>
    );
}

function CalendarDateRangePickerIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 opacity-50"
        >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
    );
}