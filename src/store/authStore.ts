"use client";

import axios from "axios";
import { create } from "zustand";

type AuthStore = {
  authenticated: boolean;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const useAuthStore = create<AuthStore>()((set) => ({
  authenticated: localStorage.getItem("accessKey") !== null,

  async signUp(name, email, password) {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`, {
      name,
      email,
      password,
    });
  },

  async signIn(email, password) {
    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`, {
        email,
        password,
      })
      .then((res) => res.data);
    localStorage.setItem("accessKey", response.accessKey);
    set({ authenticated: true });
  },

  signOut() {
    set({ authenticated: false });
  },
}));

export default useAuthStore;
