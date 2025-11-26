import { create } from 'zustand';

// Tentukan bentuk data user kamu
interface UserProfile {
  id: string;
  name: string;      // <--- Ini yang mau kamu tampilkan
  email: string;
  role: string;
}

interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  setUser: (user: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true, // Default loading true biar bisa show skeleton pas awal refresh
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
}));