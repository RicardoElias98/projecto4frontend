import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const userStore = create(
  persist(
    (set) => ({
      token: "",
      updateToken: (token) => set({ token }),
    }),
    {
      name: "mystorage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
