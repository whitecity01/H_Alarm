import {
  EMPTY_ALARM_LIST,
  LOAD_SINGLE,
  LOAD_VALUE,
} from "constants/alarm";
import { axiosInterface } from "services/axiosForm";

export const createAlarm = async ({
  datetime,
  isRepeat,
  name,
  message,
  method,
  isActive,
  day
}) => {
  return await axiosInterface("/alarm/create", {
    datetime,
    isRepeat,
    name,
    message,
    method,
    isActive,
    day
  });
};

export const readAlarm = async (aId, type) => {
  const value = type === LOAD_SINGLE ? 1 : LOAD_VALUE;
  const id = aId === EMPTY_ALARM_LIST ? null : aId;

  return await axiosInterface("/alarm/read", {}, "get", {
    id,
    value,
  });
};

export const updateAlarm = async ({
  id,
  datetime,
  isRepeat,
  name,
  message,
  method,
  isActive,
  day
}) => {
  return await axiosInterface("/alarm/update", {
    id,
    datetime,
    isRepeat,
    name,
    message,
    method,
    isActive,
    day
  },"update");
};

export const deleteAlarm = async (alarmId) => {
  return await axiosInterface("/alarm/delete", {
    alarmId,
  }, "delete");
};

