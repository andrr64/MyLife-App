'use client';

import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  ChevronRight,
  ChevronDown,
  Settings,
  LogOut,
  Moon,
  Sun,
  Wallet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { AuthService } from '@/services/user/AuthService';
import toast from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';
import { URLPath } from '@/app/path';
// Sesuaikan path import ini dengan lokasi file useUserStore kamu
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserStore } from '@/store/useUserStore';

const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  const [openMenus, setOpenMenus] = useState<string[]>(['Dashboard']);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Ambil user dari Store
  const { fetchUser, user, error, isInitialized } = useUserStore();

  useEffect(() => {
    if (!isInitialized){
      fetchUser();
    }
  }, [])
  
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

  const isActive = (path: string) => pathname === path;

  const isParentActive = (subMenu: any[]) => {
    return subMenu?.some((sub) => isActive(sub.href));
  };

  const menuItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: URLPath.home,
    },
    {
      label: 'Finance',
      icon: Wallet,
      href: URLPath.finance.root,
      subMenu: [],
    },
    {
      label: 'Schedule',
      icon: Calendar,
      subMenu: [
        {
          label: 'Calendar',
          href: URLPath.schedule.calendar,
        },
        {
          label: 'Task',
          href: URLPath.schedule.task,
        },
      ],
    },
  ];

  // Helper untuk mendapatkan nama belakang (Last Name)
  // Logic: Split spasi -> Ambil elemen terakhir (slice -1)
  const getLastName = () => {
    if (error){
      return 'Unknown (Error)'
    }
    if (!user?.fullName) return 'Guest';
    const names = user.fullName.split(' ');
    // slice(-1) mengembalikan array berisi 1 elemen terakhir, jadi perlu [0]
    return names.slice(-1)[0]; 
  };

  if (!mounted) {
    return (
      <aside className="w-[260px] h-screen border-r bg-background p-5 animate-pulse" />
    );
  }

  return (
    <aside className="w-[260px] h-screen sticky top-0 border-r border-border bg-background p-5 flex flex-col justify-between">
      {/* top */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* logo */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center rounded-lg font-bold text-lg">
            F
          </div>
          <div>
            <p className="font-semibold text-base">MyLife</p>
            <p className="text-xs text-muted-foreground">
              All-in-one personal management
            </p>
          </div>
        </div>

        {/* menu */}
        <nav className="space-y-1">
          {menuItems.map((menu) => {
            const hasSubMenu = menu.subMenu && menu.subMenu.length > 0;
            const isOpen = openMenus.includes(menu.label);
            const isMeActive = !hasSubMenu && isActive(menu.href || '');
            const isChildActive = hasSubMenu && isParentActive(menu.subMenu);

            return (
              <div key={menu.label}>
                <button
                  onClick={() => {
                    if (hasSubMenu) {
                      toggleMenu(menu.label);
                    } else if (menu.href) {
                      router.push(menu.href);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors mb-1
                    ${
                      isMeActive
                        ? 'bg-primary/10 text-primary'
                        : isChildActive
                        ? 'text-foreground font-semibold'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    }
                  `}
                >
                  <div className="flex items-center">
                    <menu.icon
                      className={`w-4 h-4 mr-3 ${
                        isMeActive ? 'text-primary' : ''
                      }`}
                    />
                    {menu.label}
                  </div>

                  {hasSubMenu &&
                    (isOpen ? (
                      <ChevronDown className="w-4 h-4 opacity-50" />
                    ) : (
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    ))}
                </button>

                {/* Submenu Area */}
                {hasSubMenu && (
                  <div
                    className={`ml-4 pl-3 border-l border-border transition-all duration-300 overflow-hidden ${
                      isOpen ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="space-y-1 pb-2">
                      {menu.subMenu.map((sub: any) => {
                        const isSubActive = isActive(sub.href);
                        return (
                          <Button
                            key={sub.label}
                            variant="ghost"
                            onClick={() => router.push(sub.href)}
                            className={`w-full justify-start h-9 text-sm font-normal
                              ${
                                isSubActive
                                  ? 'bg-accent text-accent-foreground font-medium'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-transparent '
                              }
                            `}
                          >
                            {sub.label}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* bottom */}
      <div className="mt-auto pt-4">
        <Separator className="mb-4" />
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {theme === 'dark' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
            <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={(v) => setTheme(v ? 'dark' : 'light')}
          />
        </div>
        
        <Button variant="ghost" className="w-full justify-start mb-2 text-sm">
          <Settings className="w-4 h-4 mr-3" /> Settings
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start text-sm text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
          onClick={async () => {
            try {
              await AuthService.logout();
              toast.success('Logout success');
              router.push(URLPath.auth.login);
            } catch {
              toast.error('Failed to logout');
            }
          }}
        >
          <LogOut className="w-4 h-4 mr-3" /> Logout
        </Button>

        <Separator className="my-4" />

        {/* USER PROFILE SECTION */}
        <div className="flex items-center justify-between">
          <div className="flex items-center w-full">
            
            {/* Avatar dengan Fallback Inisial */}
            <Avatar className="w-9 h-9 mr-2">
                <AvatarImage src={user?.avatar || ""} />
                <AvatarFallback>{getLastName().charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="overflow-hidden flex-1">
              <p className="text-sm font-medium truncate w-full">
                {/* Tampilkan Last Name */}
                {getLastName()}
              </p>
              <p className="text-xs text-muted-foreground truncate w-full">
                {/* Tampilkan Email */}
                {user?.email || 'No Email'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;