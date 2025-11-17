'use client';

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Eye, EyeOff, Loader2 } from "lucide-react";

// --- Import Shadcn ---
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

const APP_NAME = "MyLife";
const COPYRIGHT_NAME = "Andreas";

/* ===========================
      THEME TOGGLE
   =========================== */
const ThemeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="w-24 h-6" />;

    const isDark = theme === "dark";

    return (
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Moon className="w-4 h-4" />
            <Switch
                id="theme-switch"
                checked={isDark}
                onCheckedChange={() => setTheme(isDark ? "light" : "dark")}
            />
            <Sun className="w-4 h-4" />
        </div>
    );
};

/* ===========================
          REGISTER PAGE
   =========================== */
const RegisterPage: React.FC = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const loading = useLoading();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    useEffect(() => {
        if (
            formData.confirmPassword &&
            formData.password !== formData.confirmPassword
        ) {
            setPasswordError("Passwords do not match.");
        } else {
            setPasswordError("");
        }
    }, [formData.password, formData.confirmPassword]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordError) return;

        loading.toggle();

        const payload = {
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
        };

        try {
            console.log("Register payload:", payload);
            await new Promise((r) => setTimeout(r, 2000));

            toast.success("Account created successfully");
        } catch (err: any) {
            toast.error(err?.message || "An error occurred");
        } finally {
            loading.toggle();
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground relative overflow-hidden">

            {/* Glow background — sama persis login */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                           w-[50rem] h-[50rem] bg-indigo-500/10 dark:bg-indigo-900/30
                           rounded-full blur-[150px] opacity-50"
            />

            <main className="flex-grow flex flex-col justify-center items-center p-4 z-10">
                <div className="w-full max-w-sm">

                    <Card className="w-full bg-card/80 backdrop-blur-sm">
                        <CardHeader className="items-center text-center">
                            <div className="flex items-center mb-4">
                                <svg viewBox="0 0 32 32" className="w-8 h-8 mr-2" fill="none">
                                    <path d="M12.6667 4H7.11111C5.39289 4 4 5.39289 4 7.11111V12.6667C4 
                                            14.3855 5.39289 15.7778 7.11111 15.7778H12.6667C14.3855 15.7778 
                                            15.7778 14.3855 15.7778 12.6667V7.11111C15.7778 5.39289 
                                            14.3855 4 12.6667 4Z"
                                        fill="hsl(var(--primary))" />
                                    <path d="M24.8889 16.2222H19.3333C17.6145 16.2222 16.2222 17.6145 
                                            16.2222 19.3333V24.8889C16.2222 26.6071 17.6145 28 
                                            19.3333 28H24.8889C26.6071 28 28 26.6071 
                                            28 24.8889V19.3333C28 17.6145 26.6071 
                                            16.2222 24.8889 16.2222Z"
                                        fill="hsl(var(--primary))"
                                        fillOpacity="0.6"
                                    />
                                </svg>
                                <span className="text-xl font-bold tracking-tight">{APP_NAME}</span>
                            </div>

                            <CardTitle className="text-2xl">Create your account</CardTitle>
                            <CardDescription>Manage your life, all in one place.</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form className="space-y-4" onSubmit={handleSubmit}>

                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name (Optional)</Label>
                                    <Input
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            className={passwordError ? "border-red-500" : ""}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </Button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            className={passwordError ? "border-red-500" : ""}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                                        >
                                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </Button>
                                    </div>

                                    {passwordError && (
                                        <p className="text-xs text-red-600">{passwordError}</p>
                                    )}
                                </div>

                                <Button disabled={loading.loading} className="w-full">
                                    {loading.loading && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    {loading.loading ? "Creating account..." : "Create Account"}
                                </Button>

                            </form>
                        </CardContent>

                        <CardFooter className="flex-col text-center text-sm text-muted-foreground">
                            <p>
                                Already have an account?{" "}
                                <a
                                    href={URLPath.auth.login}
                                    className="text-primary font-semibold hover:underline"
                                >
                                    Sign In
                                </a>
                            </p>
                        </CardFooter>
                    </Card>

                </div>
            </main>

            <footer className="flex flex-col items-center justify-center w-full px-6 py-6 text-xs sm:text-sm text-muted-foreground gap-4 z-10">
                <ThemeToggle />
                <p>© 2025 {COPYRIGHT_NAME}</p>
            </footer>
        </div>
    );
};

export default RegisterPage;
