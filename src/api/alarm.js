import axios from 'axios';

const axiosForm = async(url, form) => {
    const response = await axios.post(url, form,{
            withCredentials: true,
            headers:{
                "Content-Type": `application/json`,
            }    
        }
    )

    switch(response.status){
        case 200:
            return;
        case 400:
            throw new Error("잘못된 입력");
        default:
            throw new Error(`서버 에러: ${response.status}`);
    }
}

export const createAlarm = async(date, week, time, repeat, name, method, message) => {
    const form = {
        date,
        week,
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

export const updateAlarm = async(alarmId, date, week, time, repeat, name, method, message) => {
    const form = {
        alarmId,
        date,
        week,
        time,
        repeat,
        name,
        method,
        message
    };
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/alarm/update", form);
}

export const deleteAlarm = async(alarmId) => {
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/alarm/delete", {alarmId});
}

export const updateEmail = async(email) => {
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/alarm/updateMethod", {email});
}

export const updatePhoneNumber = async(phoneNumber) => {
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/alarm/updateMethod", {phoneNumber});
}