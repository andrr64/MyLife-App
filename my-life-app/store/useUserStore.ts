import { UserService } from "@/services/user/UserService";
import { UserResponse } from "@/types/dto/user/response/user_response";
import { create } from "zustand";

interface UserState {
  user: UserResponse | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;

  fetchUser: () => Promise<void>;
  reset: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  isInitialized: false,

  fetchUser: async () => {
    // Optional: Kalau sudah ada data/sudah init, gak usah fetch lagi (Cache mechanism)
    // if (get().isInitialized) return; 

    set({ isLoading: true, error: null });

    try {
      const response = await UserService.me();
      
      // Asumsi struktur response: response.data (axios body) -> .data (ApiResponse body)
      if (response.data) {
        set({ 
          user: response.data, 
          isInitialized: true 
        });
      } else {
        throw new Error("Data user kosong");
      }

    } catch (err: any) {
      console.log(err);
      
      console.error("Gagal fetch user:", err);
      set({ 
        user: null, 
        error: err.message || "Gagal mengambil data user", 
        isInitialized: true 
      });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({ user: null, isLoading: false, error: null, isInitialized: false });
  }
}));