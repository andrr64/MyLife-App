'use client';

import React, { useState } from "react";

/**
 * TEMPLATE PLACEHOLDERS
 */
const APP_NAME = "LoremApp";
const APP_TAGLINE = "Welcome back! Manage your finance, notes, and schedule in one place.";
const COPYRIGHT_NAME = "LoremCorp LTD.";

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
        <div className="flex flex-col min-h-screen bg-[#f7f8fa] text-[#101828] font-[Inter,sans-serif]">
            <main className="flex flex-col md:flex-row w-full min-h-screen bg-white shadow-lg overflow-hidden">
                {/* Left - Form */}
                <section className="flex-1 flex justify-center items-center p-6 sm:p-10 md:p-16 lg:p-20">
                    <div className="w-full max-w-[420px]">
                        {/* Logo */}
                        <div className="flex items-center mb-8">
                            <svg
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-7 h-7 mr-2"
                            >
                                <path
                                    d="M12.6667 4H7.11111C5.39289 4 4 5.39289 4 7.11111V12.6667C4 14.3855 5.39289 15.7778 7.11111 15.7778H12.6667C14.3855 15.7778 15.7778 14.3855 15.7778 12.6667V7.11111C15.7778 5.39289 14.3855 4 12.6667 4Z"
                                    fill="#4A4DE6"
                                />
                                <path
                                    d="M24.8889 16.2222H19.3333C17.6145 16.2222 16.2222 17.6145 16.2222 19.3333V24.8889C16.2222 26.6071 17.6145 28 19.3333 28H24.8889C26.6071 28 28 26.6071 28 24.8889V19.3333C28 17.6145 26.6071 16.2222 24.8889 16.2222Z"
                                    fill="#4A4DE6"
                                    fillOpacity="0.6"
                                />
                            </svg>
                            <span className="text-xl font-bold">{APP_NAME}</span>
                        </div>

                        <h1 className="text-[26px] font-bold mb-1">Welcome Back</h1>
                        <p className="text-[#667085] mb-6 text-sm">
                            Enter your credentials to access your account.
                        </p>

                        <form onSubmit={handleSubmit}>
                            {/* Identifier */}
                            <div className="mb-4">
                                <label htmlFor="identifier" className="block text-sm font-semibold mb-1">
                                    Email or Username
                                </label>
                                <input
                                    id="identifier"
                                    type="text"
                                    value={formData.identifier}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2.5 border border-[#d0d5dd] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4a4de6]"
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-sm font-semibold mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-2.5 border border-[#d0d5dd] rounded-md text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-[#4a4de6]"
                                    />
                                    <svg
                                        onClick={() => setShowPassword(!showPassword)}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        className="w-4 h-4 text-[#98a2b3] absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"
                                        />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 rounded-md bg-[#4a4de6] hover:bg-[#3e41c4] text-white font-semibold text-sm transition-all"
                            >
                                Login
                            </button>
                        </form>

                        <p className="text-center text-sm text-[#667085] mt-6">
                            Don’t have an account?{" "}
                            <a href="/register" className="text-[#4a4de6] font-semibold hover:underline">
                                Create one
                            </a>
                        </p>
                    </div>
                </section>

                {/* Right - Promo Panel */}
                <section className="hidden md:flex flex-1 bg-[#4a4de6] text-white p-[60px] flex-col justify-center">
                    <h2 className="text-[30px] font-bold leading-snug mb-5">{APP_TAGLINE}</h2>
                    <p className="text-[#e0e7ff] text-sm">
                        Sign in to {APP_NAME} and continue where you left off.
                    </p>
                </section>
            </main>

            <footer className="flex justify-between w-full px-6 py-4 text-xs sm:text-sm text-[#98a2b3] bg-white border-t border-[#eee] flex-wrap gap-2">
                <p>© 2025 {COPYRIGHT_NAME}</p>
                <a href="#" className="hover:underline">
                    Privacy Policy
                </a>
            </footer>
        </div>
    );
};

export default LoginPage;
