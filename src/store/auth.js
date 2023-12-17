import { create } from "zustand";

export const userToken = create((set) => ({
  accessToken: "",
  setAccessToken: (newToken) => set({ accessToken: newToken }),
}));
