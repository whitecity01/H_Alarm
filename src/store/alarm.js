import { create } from "zustand";

export const useAlarmList = create((set) => ({
    alarmList: [],
    setAlarmList: (alarmList) => set({ alarmList }),
  }));