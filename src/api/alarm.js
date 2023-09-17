import { axiosForm } from "../utils/utils";

export const createAlarm = async(date, day, time, repeat, name, method, message) => {

    if (!(date ^ day)){
        throw new Error("Only one of date and day must have a value");
    }else if(!time|| repeat === null || !name || !method || !message){
        throw new Error("All fields cannot be null");
    }

    const form = {
        date,
        day,
        time,
        repeat,
        name,
        method,
        message
    };
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/alarm/create", form);
}

export const readAlarm = async() => {
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/alarm/read", {});
}

export const updateAlarm = async(alarmId, date, day, time, repeat, name, method, message) => {

    if (date !==null && day!==null){
        throw new Error("Only one of date and day must have a value");
    }else if(alarmId === null){
        throw new Error("alarmId cannot be null");
    }else if(!date && !day && !time && repeat === null && !name && !method && !message){
        throw new Error("Value to modify does not exist");
    };

    const form = {
        alarmId,
        date,
        day,
        time,
        repeat,
        name,
        method,
        message
    };
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/alarm/update", form);
}

export const deleteAlarm = async(alarmId) => {
    if(alarmId === null){
        throw new Error("alarmId cannot be null");
    }
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/alarm/delete", {alarmId});
}

export const updateEmail = async(email) => {
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/alarm/updateMethod", {email});
}

export const updatePhoneNumber = async(phoneNumber) => {
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/alarm/updateMethod", {phoneNumber});
}