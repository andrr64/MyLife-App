import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
    accessToken: string | null;
    setAccessToken: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => (
    {
        accessToken: null, 
        setAccessToken: (token) => set({ accessToken: token }),
        logout: () => {
            set({ accessToken: null });
            localStorage.removeItem('refreshToken'); // Hapus refresh token manual
        },
    }
));