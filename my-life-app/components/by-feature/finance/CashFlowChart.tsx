import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export function CashFlowChart() {
    return (
        <Card className="col-span-4 h-full">
            <CardHeader>
                <CardTitle>Cash Flow</CardTitle>
                <CardDescription>
                    Perbandingan performa keuangan tahun ini.
                </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                {/* Dummy Chart Visual using pure Tailwind */}
                <div className="h-[350px] w-full flex items-end justify-between px-4 gap-2">
                    {[40, 60, 45, 80, 55, 70, 90, 65, 50, 75, 85, 95].map((h, i) => (
                        <div
                            key={i}
                            className="group relative flex flex-col items-center gap-2 w-full"
                        >
                            <div
                                className="w-full bg-primary/20 hover:bg-primary transition-all duration-300 rounded-t-md cursor-pointer"
                                style={{ height: `${h}%` }}
                            />
                            <span className="text-[10px] text-muted-foreground">
                                {
                                    ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][
                                    i
                                    ]
                                }
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}