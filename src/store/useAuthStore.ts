import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";
import api from "../api/axios";

interface User {
  id?: string;
  email?: string;
  full_name?: string;
}

interface AuthState {
  user: User | null;
  loginLoading: boolean;
  error: string | null;

  login: (data: { identifier: string; password: string }) => Promise<boolean>;
  signup: (data: {
    full_name: string;
    email: string;
    mobile: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loginLoading: false,
      error: null,

      // LOGIN
      login: async ({ identifier, password }) => {
        try {
          if (!identifier || !password) {
            toast.error("Email/Mobile & password required");
            return false;
          }

          set({ loginLoading: true, error: null });

          const res = await api.post("/auth/login", { identifier, password });

          const { access_token, user } = res.data;

          localStorage.setItem("access-token", access_token);
          set({ user });

          toast.success("Login successful");
          return true;
        } catch (err: any) {
          const message = err?.response?.data?.detail || "Login failed";
          toast.error(message);
          set({ error: message });
          return false;
        } finally {
          set({ loginLoading: false });
        }
      },

      // SIGNUP
      signup: async ({ full_name, email, mobile, password }) => {
        try {
          if (!full_name || !email || !mobile || !password) {
            toast.error("All fields required");
            return false;
          }

          set({ loginLoading: true, error: null });

          await api.post("/auth/signup", {
            full_name,
            email,
            mobile,
            password,
          });

          toast.success("Signup successful. Please login.");
          return true;
        } catch (err: any) {
          const message = err?.response?.data?.detail || "Signup failed";
          toast.error(message);
          set({ error: message });
          return false;
        } finally {
          set({ loginLoading: false });
        }
      },

      // LOGOUT
      logout: () => {
        localStorage.clear();
        set({ user: null, error: null });
        window.location.href = "/login";
      },
    }),
    { name: "auth-storage" }
  )
);
