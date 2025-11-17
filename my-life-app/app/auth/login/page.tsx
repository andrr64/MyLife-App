'use client';

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Eye, EyeOff } from "lucide-react";

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


/**
 * KONTEKS APLIKASI (MyLife)
 */
const APP_NAME = "MyLife";
const COPYRIGHT_NAME = "Andreas";

/**
 * Komponen Theme Toggle (Shadcn Switch)
 */
const ThemeToggle = () => {
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
        identifier: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login data:", formData);
        // TODO: call API NestJS -> /auth/login
    };

    return (
        // Layout utama: Centered, minimalis, dengan glow
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
                            <CardTitle className="text-1xl">{APP_NAME}</CardTitle>
                            <CardTitle className="text-2xl">Sign In</CardTitle>
                            <CardDescription>
                                Welcome back. Log in to your life hub.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="identifier">Email or Username</Label>
                                    <Input
                                        id="identifier"
                                        type="text"
                                        value={formData.identifier}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g., andreas"
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

                                <Button type="submit" className="w-full">
                                    Sign In
                                </Button>
                            </form>
                        </CardContent>

                        <CardFooter className="flex-col text-center text-sm text-muted-foreground">
                            <p>
                                Don't have an account?{" "}
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