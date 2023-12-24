import { axiosForm } from "../utils/utils";

export const createAlarm = async({date, day, time, repeat, name, method, message}) => {

    if (!(date ^ day)){
        throw new Error("Only one of date and day must have a value");
    }else if(!time|| !name || !method /*|| !message*/){
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

export const readAlarm = async(alarmId) => {
    if (alarmId === null){
        return [
                {
                    alarmId: "1",
                    date: 1694872081120,
                    day: null,
                    time: 108000000,
                    repeat: true,
                    name: "하체 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: "2",
                    date: null,
                    day: [0, 2, 3, 6],
                    time: 122134122,
                    repeat: true,
                    name: "상체 가즈아",
                    method: "call",
                    message: "testtesttest",
                },
                {
                    alarmId: "3",
                    date: null,
                    day: [0,1, 2, 3, 6],
                    time: 1231243,
                    repeat: true,
                    name: "가슴 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: "4",
                    date: 1694872081120,
                    day: null,
                    time: 123123443,
                    repeat: true,
                    name: "어깨 가즈아",
                    method: "email",
                    message: "testtesttest",
                }
        ];
    }
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/alarm/read", {alarmId});
}

export const updateAlarm = async({alarmId, date, day, time, repeat, name, method, message}) => {

    if (date !==null && day!==null){
        throw new Error("Only one of date and day must have a value");
    }else if(alarmId === null){
        throw new Error("alarmId cannot be null");
    }else if(!date && !day && !time && !repeat && !name && !method && !message){
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