'use client';

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
// Loader2 ditambahkan, URLPath, useLoading, LoadingModal dihapus
import { Moon, Sun, Eye, EyeOff, Loader2 } from "lucide-react";

// --- Import Komponen Shadcn ---
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { URLPath } from "@/app/path";
import { useLoading } from "@/hooks/useLoading";
import toast from "react-hot-toast";
// Hapus import hook dan modal global
// import { useLoading } from "@/hooks/useLoading";
// import { LoadingModal } from "@/components/modal/LoadingModal";


/**
 * KONTEKS APLIKASI (MyLife)
 */
const APP_NAME = "MyLife";
const COPYRIGHT_NAME = "Andreas";

/**
 * Komponen Theme Toggle (Shadcn Switch)
 */
const ThemeToggle = () => {
    // ... (Kode ThemeToggle tetap sama)
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => { setMounted(true) }, []);

    if (!mounted) {
        // Placeholder untuk menghindari hydration mismatch
        return <div className="w-24 h-6" />;
    }

    const isDark = theme === "dark";

    return (
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Moon className="w-4 h-4" />
            <Switch
                id="theme-switch"
                checked={isDark}
                onCheckedChange={() => setTheme(isDark ? 'light' : 'dark')}
                aria-label="Toggle theme"
            />
            <Sun className="w-4 h-4" />
        </div>
    );
};


const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "", // <-- Sudah 'email'
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const loading = useLoading();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // Hapus hook global
    // const loading = useLoading(false); 

    // Modifikasi handleSubmit untuk pakai state lokal
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        loading.toggle();

        try {
            console.log("Login data:", formData);
            // TODO: Simulasi panggil API NestJS
            await new Promise(resolve => setTimeout(resolve, 2000));
            toast.success("Login success")
            // ... (logika sukses)
        } catch (error: any) {
            toast.error(error);
            // TODO: Tampilkan toast error
        } finally {
            loading.toggle();
        }
    };

    return (
        // Hapus Fragment dan LoadingModal
        <div className="flex flex-col min-h-screen bg-background text-foreground relative overflow-hidden">

            {/* --- EFEK GLOW BACKGROUND (Sama seperti Register) --- */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-indigo-500/10 dark:bg-indigo-900/30 rounded-full blur-[150px] opacity-50"
                aria-hidden="true"
            />

            {/* Konten Utama (diberi z-10 agar di atas glow) */}
            <main className="flex-grow flex flex-col justify-center items-center p-4 z-10">
                <div className="w-full max-w-sm">
                    {/* Card Form (Diberi backdrop-blur) */}
                    <Card className="w-full bg-card/80 backdrop-blur-sm">
                        <CardHeader className="items-center text-center">
                            {/* Header disamakan dengan Register agar konsisten */}
                            <div className="flex items-center mb-4">
                                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mr-2">
                                    <path d="M12.6667 4H7.11111C5.39289 4 4 5.39289 4 7.11111V12.6667C4 14.3855 5.39289 15.7778 7.11111 15.7778H12.6667C14.3855 15.7778 15.7778 14.3855 15.7778 12.6667V7.11111C15.7778 5.39289 14.3855 4 12.6667 4Z" fill="hsl(var(--primary))" />
                                    <path d="M24.8889 16.2222H19.3333C17.6145 16.2222 16.2222 17.6145 16.2222 19.3333V24.8889C16.2222 26.6071 17.6145 28 19.3333 28H24.8889C26.6071 28 28 26.6071 28 24.8889V19.3333C28 17.6145 26.6071 16.2222 24.8889 16.2222Z" fill="hsl(var(--primary))" fillOpacity="0.6" />
                                </svg>
                                <span className="text-xl font-bold tracking-tight">{APP_NAME}</span>
                            </div>
                            <CardTitle className="text-2xl">Sign in to MyLife</CardTitle>
                            <CardDescription>
                                Welcome back. Log in to your life hub.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    {/* Label diubah jadi "Email" */}
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email" // Tipe diubah jadi email
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="u@email.com" // Placeholder diubah
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            placeholder="••••••••"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                                            aria-label="Toggle password visibility"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </Button>
                                    </div>
                                </div>

                                {/* Button diupdate dengan logic loading lokal */}
                                <Button type="submit" className="w-full" disabled={loading.loading}>
                                    {loading.loading ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : null}
                                    {loading.loading ? "Signing in..." : "Sign In"}
                                </Button>
                            </form>
                        </CardContent>

                        <CardFooter className="flex-col text-center text-sm text-muted-foreground">
                            <p>
                                Don't have an account?{" "}
                                {/* Hapus URLPath, ganti hardcode string */}
                                <a href={URLPath.auth.register} className="text-primary font-semibold hover:underline">
                                    Create one
                                </a>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </main>

            {/* Footer (diberi z-10) */}
            <footer className="flex flex-col items-center justify-center w-full px-6 py-6 text-xs sm:text-sm text-muted-foreground gap-4 z-10">
                <ThemeToggle />
                <p>© 2025 {COPYRIGHT_NAME}</p>
            </footer>
        </div>
    );
};

export default LoginPage;