'use client';

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { URLPath } from "@/app/path";

/**
 * KONTEKS APLIKASI (MyLife)
 */
const APP_NAME = "MyLife";
const COPYRIGHT_NAME = "Andreas";

// --- Icons ---

const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.364l-1.591 1.591M21 12h-2.25m-.364 6.364l-1.591-1.591M12 18.75V21m-6.364-.364l1.591-1.591M3 12H.75m.364-6.364l1.591 1.591" />
    </svg>
);

const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);

const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

/**
 * Komponen Theme Toggle BARU (CSS Switch)
 * Menggunakan hook useTheme dari next-themes
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
        <div className="flex items-center justify-center gap-2 text-gray-400">
            <MoonIcon className={`w-4 h-4 transition-colors ${isDark ? 'text-indigo-400' : 'text-gray-400'}`} />
            <label htmlFor="theme-switch" className="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    id="theme-switch"
                    className="sr-only peer"
                    checked={isDark}
                    onChange={() => setTheme(isDark ? 'light' : 'dark')}
                />
                {/* Track */}
                <div className="w-8 h-[1.15rem] bg-gray-200 dark:bg-gray-700 rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 peer-checked:bg-indigo-600"></div>
                {/* Thumb (gaya Radix) */}
                <span className="absolute left-[2px] top-[2px] w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-[calc(100%-2px)]"></span>
            </label>
            <SunIcon className={`w-4 h-4 transition-colors ${!isDark ? 'text-yellow-500' : 'text-gray-400'}`} />
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
        // Layout utama: Centered, minimalis
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">

            {/* Konten Utama */}
            <main className="flex-grow flex flex-col justify-center items-center p-4">
                <div className="w-full max-w-sm">
                    {/* Logo & Header */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="flex items-center mb-4">
                            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mr-2">
                                <path d="M12.6667 4H7.11111C5.39289 4 4 5.39289 4 7.11111V12.6667C4 14.3855 5.39289 15.7778 7.11111 15.7778H12.6667C14.3855 15.7778 15.7778 14.3855 15.7778 12.6667V7.11111C15.7778 5.39289 14.3855 4 12.6667 4Z" fill="#4f46e5" />
                                <path d="M24.8889 16.2222H19.3333C17.6145 16.2222 16.2222 17.6145 16.2222 19.3333V24.8889C16.2222 26.6071 17.6145 28 19.3333 28H24.8889C26.6071 28 28 26.6071 28 24.8889V19.3333C28 17.6145 26.6071 16.2222 24.8889 16.2222Z" fill="#4f46e5" fillOpacity="0.6" />
                            </svg>
                            <span className="text-xl font-bold tracking-tight">{APP_NAME}</span>
                        </div>
                        <h1 className="text-2xl font-bold text-center">Sign in to MyLife</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 text-center">
                            Welcome back. Log in to your life management hub.
                        </p>
                    </div>

                    {/* Card Form */}
                    <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg p-6 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Identifier */}
                            <div>
                                <label htmlFor="identifier" className="block text-sm font-semibold mb-1.5">
                                    Email or Username
                                </label>
                                <input
                                    id="identifier"
                                    type="text"
                                    value={formData.identifier}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800"
                                    placeholder="u@email.com"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-semibold mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 dark:bg-gray-800"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                                        aria-label="Toggle password visibility"
                                    >
                                        <EyeIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 focus:ring-indigo-500"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                        Don’t have an account?{" "}
                        <a href={URLPath.auth.register} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                            Create one
                        </a>
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="flex flex-col items-center justify-center w-full px-6 py-6 text-xs sm:text-sm text-gray-500 dark:text-gray-600 gap-4">
                <ThemeToggle />
                <p>© 2025 {COPYRIGHT_NAME}</p>
            </footer>
        </div>
    );
};

export default LoginPage;