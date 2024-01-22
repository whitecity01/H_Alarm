import {
  EMPTY_ALARM_LIST,
  LOAD_SINGLE,
  LOAD_VALUE,
} from "constants/alarm";
import { ALARM_CREATE, ALARM_DELETE, ALARM_PUT, ALARM_READ } from "constants/api";
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
  return await axiosInterface(ALARM_CREATE, {
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

  return await axiosInterface(ALARM_READ, {}, "get", {
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
  return await axiosInterface(ALARM_PUT, {
    id,
    datetime,
    isRepeat,
    name,
    message,
    method,
    isActive,
    day
  },"put");
};

export const deleteAlarm = async (id) => {
  return await axiosInterface(ALARM_DELETE, {
    id,
  }, "delete");
};

