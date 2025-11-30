'use client';
import Sidebar from "@/components/Sidebar";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const { fetchUser, isInitialized } = useUserStore();

  useEffect(() => {
    if (!isInitialized){
      fetchUser();
    }
  }, [])

  return (
    <div className="flex min-h-screen">

      {/* Sidebar kiri */}
      <Sidebar />

      {/* Konten berubah sesuai route */}
      <main className="flex-1 p-4">
        {children}
      </main>

    </div>
  );
}
