'use client';
import Sidebar from "@/components/Sidebar";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { URLPath } from "../path";
import { AuthService } from "@/services/user/AuthService";
import toast from "react-hot-toast";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const { fetchUser, isInitialized, isUnauthorized, reset } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) {
      fetchUser();
    }
  }, [])

  useEffect(() => {
    const check = async () => {
      if (isUnauthorized) {
        reset();
        toast.error("Unauthorized: re-login!")
        await AuthService.logout();
        router.replace(URLPath.auth.login);
      }
    }
    check();
  }, [isUnauthorized])

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
