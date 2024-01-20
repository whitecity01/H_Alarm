import { create } from "zustand";

export const userToken = create((set) => ({
  accessToken: "",
  accessTokenExpiration: new Date(),
  refreshToken: "",
  refreshTokenExpiration: new Date(),
  setAccessToken: (accessToken) => set({ accessToken}),
  setAccessTokenExpiration: (accessTokenExpiration) => set({ accessTokenExpiration}),
  setRefreshToken: (refreshToken) => set({ refreshToken}),
  setRefreshTokenExpiration: (refreshTokenExpiration) => set({ refreshTokenExpiration})
}));
