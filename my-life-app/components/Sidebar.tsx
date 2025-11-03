'use client';

import React, { useEffect, useState } from 'react';
import {
    LayoutDashboard,
    Bell,
    Calendar,
    ChevronRight,
    ChevronDown,
    Settings,
    LogOut,
    Moon,
    Sun,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';

const Sidebar = () => {
    const { theme, setTheme } = useTheme();
    const [openMenus, setOpenMenus] = useState<string[]>(['Dashboard']);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => setMounted(true), 300);
    }, []);

    const toggleMenu = (label: string) => {
        setOpenMenus((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label]
        );
    };

    const menuItems = [
        {
            label: 'Dashboard',
            icon: LayoutDashboard,
            subMenu: [{ label: 'Overview' }, { label: 'Reports' }, { label: 'Analytics' }],
        },
        {
            label: 'Activity',
            icon: Bell,
            subMenu: [{ label: 'Notifications' }, { label: 'Logs' }],
        },
        {
            label: 'Schedule',
            icon: Calendar,
            subMenu: [{ label: 'Calendar' }, { label: 'Tasks' }],
        },
    ];

    // ========= 🦴 Skeleton State ==========
    if (!mounted) {
        return (
            <aside className="w-[260px] h-screen border-r border-border bg-background p-5 flex flex-col justify-between animate-pulse">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-muted rounded-lg" />
                        <div className="space-y-1">
                            <div className="w-20 h-3 bg-muted rounded" />
                            <div className="w-16 h-2 bg-muted rounded" />
                        </div>
                    </div>
                    <div className="space-y-3 mb-8">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="w-full h-4 bg-muted rounded" />
                        ))}
                    </div>
                </div>

                <div>
                    <Separator className="mb-4" />
                    <div className="space-y-3 mb-4">
                        <div className="w-full h-4 bg-muted rounded" />
                        <div className="w-full h-4 bg-muted rounded" />
                        <div className="w-full h-4 bg-muted rounded" />
                    </div>

                    <Separator className="my-4" />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-muted rounded-full" />
                            <div>
                                <div className="w-20 h-3 bg-muted rounded mb-1" />
                                <div className="w-16 h-2 bg-muted rounded" />
                            </div>
                        </div>
                        <div className="w-4 h-4 bg-muted rounded" />
                    </div>
                </div>
            </aside>
        );
    }

    // ========= Normal Sidebar ==========
    return (
        <aside className="w-[260px] h-screen border-r border-border bg-background p-5 flex flex-col justify-between transition-all">
            {/* ===== TOP ===== */}
            <div>
                {/* Logo */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center rounded-lg font-bold text-lg">
                        F
                    </div>
                    <div>
                        <p className="font-semibold text-base leading-tight">FinTrack</p>
                        <p className="text-xs text-muted-foreground">Finance App</p>
                    </div>
                </div>

                {/* ===== MENU ===== */}
                <nav className="space-y-2">
                    {menuItems.map((menu) => {
                        const isOpen = openMenus.includes(menu.label);
                        return (
                            <div key={menu.label}>
                                <button
                                    onClick={() => toggleMenu(menu.label)}
                                    className="w-full flex items-center justify-between px-2 py-2 rounded-md hover:bg-accent text-sm font-medium text-foreground/80 transition-colors"
                                >
                                    <div className="flex items-center">
                                        <menu.icon className="w-4 h-4 mr-3" />
                                        {menu.label}
                                    </div>
                                    {isOpen ? (
                                        <ChevronDown className="w-4 h-4 transition-transform" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 transition-transform" />
                                    )}
                                </button>

                                {/* ===== Submenu (animated expand/collapse) ===== */}
                                <div
                                    className={`ml-9 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${isOpen
                                            ? 'max-h-40 opacity-100'
                                            : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="mt-1 space-y-1">
                                        {menu.subMenu.map((sub) => (
                                            <Button
                                                key={sub.label}
                                                variant="ghost"
                                                className="w-full justify-start text-sm text-muted-foreground hover:text-foreground hover:bg-accent"
                                            >
                                                {sub.label}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </nav>
            </div>

            {/* ===== BOTTOM ===== */}
            <div>
                <Separator className="mb-4" />

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                        {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                        <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                    </div>
                    <Switch
                        checked={theme === 'dark'}
                        onCheckedChange={(val) => setTheme(val ? 'dark' : 'light')}
                    />
                </div>

                <Button variant="ghost" className="w-full justify-start mb-2 text-sm text-foreground/80">
                    <Settings className="w-4 h-4 mr-3" /> Settings
                </Button>

                <Button
                    variant="ghost"
                    className="w-full justify-start text-sm text-red-500 hover:text-red-600"
                >
                    <LogOut className="w-4 h-4 mr-3" /> Logout
                </Button>

                <Separator className="my-4" />

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img
                            src="https://i.pravatar.cc/40?img=12"
                            alt="Profile"
                            className="w-9 h-9 rounded-full object-cover mr-2"
                        />
                        <div>
                            <p className="text-sm font-medium leading-tight">John Doe</p>
                            <p className="text-xs text-muted-foreground">john.doe@mail.com</p>
                        </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-muted-foreground cursor-pointer" />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
