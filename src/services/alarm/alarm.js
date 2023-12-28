import axios from "axios";
import { ALL_LOAD, LOAD_MULTIPLE, LOAD_SINGLE, LOAD_VALUE } from '../../constants/alarm';

/**
 * axios에 사용되는 형식
 * @param {String} url 
 * @param {Object} form 
 * @returns {Object} reponse한 data 객체 반환
 */
export const axiosForm = async(url, form) => {
    const response = await axios.post(url, form,{
            withCredentials: true,
            headers:{
                "Content-Type": `application/json`,
            }    
        }
    )

    switch(response.status){
        case 200:
            return response.data;
        case 400:
            throw new Error("잘못된 입력");
        case 401:
            throw new Error("중복된 입력");
        default:
            throw new Error(`서버 에러: ${response.status}`);
    }
}

export const createAlarm = async({date, day, time, repeat, name, method, message}) => {

    if(!time|| !name || !method /*|| !message*/){
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

//테스트 코드
var index = 0;
const max = 100;
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const readAlarm = async(alarmId, type) => {
    //테스트 코드
    await sleep(500);
    if ( type === LOAD_MULTIPLE){
        if(alarmId === null) index = 0;
        else index = alarmId;
        if(alarmId > max) return [];
        return [
                {
                    alarmId: ++index,
                    date: 1694872081120,
                    day: null,
                    time: 108000000,
                    repeat: true,
                    name: "하체 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: null,
                    day: [0, 2, 3, 6],
                    time: 122134122,
                    repeat: true,
                    name: "상체 가즈아",
                    method: "call",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: null,
                    day: [0,1, 2, 3, 6],
                    time: 1231243,
                    repeat: true,
                    name: "가슴 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: 1694872081120,
                    day: null,
                    time: 123123443,
                    repeat: true,
                    name: "어깨 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: 1694872081120,
                    day: null,
                    time: 108000000,
                    repeat: true,
                    name: "하체 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: null,
                    day: [0, 2, 3, 6],
                    time: 122134122,
                    repeat: true,
                    name: "상체 가즈아",
                    method: "call",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: null,
                    day: [0,1, 2, 3, 6],
                    time: 1231243,
                    repeat: true,
                    name: "가슴 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: 1694872081120,
                    day: null,
                    time: 123123443,
                    repeat: true,
                    name: "어깨 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: 1694872081120,
                    day: null,
                    time: 108000000,
                    repeat: true,
                    name: "하체 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: null,
                    day: [0, 2, 3, 6],
                    time: 122134122,
                    repeat: true,
                    name: "상체 가즈아",
                    method: "call",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: null,
                    day: [0,1, 2, 3, 6],
                    time: 1231243,
                    repeat: true,
                    name: "가슴 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: 1694872081120,
                    day: null,
                    time: 123123443,
                    repeat: true,
                    name: "어깨 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: 1694872081120,
                    day: null,
                    time: 108000000,
                    repeat: true,
                    name: "하체 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: null,
                    day: [0, 2, 3, 6],
                    time: 122134122,
                    repeat: true,
                    name: "상체 가즈아",
                    method: "call",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: null,
                    day: [0,1, 2, 3, 6],
                    time: 1231243,
                    repeat: true,
                    name: "가슴 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: 1694872081120,
                    day: null,
                    time: 123123443,
                    repeat: true,
                    name: "어깨 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: 1694872081120,
                    day: null,
                    time: 108000000,
                    repeat: true,
                    name: "하체 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: null,
                    day: [0, 2, 3, 6],
                    time: 122134122,
                    repeat: true,
                    name: "상체 가즈아",
                    method: "call",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: null,
                    day: [0,1, 2, 3, 6],
                    time: 1231243,
                    repeat: true,
                    name: "가슴 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: 1694872081120,
                    day: null,
                    time: 123123443,
                    repeat: true,
                    name: "어깨 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: 1694872081120,
                    day: null,
                    time: 108000000,
                    repeat: true,
                    name: "하체 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: null,
                    day: [0, 2, 3, 6],
                    time: 122134122,
                    repeat: true,
                    name: "상체 가즈아",
                    method: "call",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: null,
                    day: [0,1, 2, 3, 6],
                    time: 1231243,
                    repeat: true,
                    name: "가슴 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: 1694872081120,
                    day: null,
                    time: 123123443,
                    repeat: true,
                    name: "어깨 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: 1694872081120,
                    day: null,
                    time: 108000000,
                    repeat: true,
                    name: "하체 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: null,
                    day: [0, 2, 3, 6],
                    time: 122134122,
                    repeat: true,
                    name: "상체 가즈아",
                    method: "call",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: null,
                    day: [0,1, 2, 3, 6],
                    time: 1231243,
                    repeat: true,
                    name: "가슴 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: 1694872081120,
                    day: null,
                    time: 123123443,
                    repeat: true,
                    name: "어깨 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: 1694872081120,
                    day: null,
                    time: 108000000,
                    repeat: true,
                    name: "하체 가즈아",
                    method: "email",
                    message: "testtesttest",
                },
                {
                    alarmId: ++index,
                    date: null,
                    day: [0, 2, 3, 6],
                    time: 122134122,
                    repeat: true,
                    name: "상체 가즈아",
                    method: "call",
                    message: "testtesttest",
                },
        ];
    }
    if ( type === ALL_LOAD) {
        if(alarmId === null) return [];
        if(alarmId > max) alarmId = max + 1;
        return (new Array(alarmId)).fill().map((_,index)=>(
            {
                alarmId: index,
                date: 1694872081120,
                day: null,
                time: 108000000,
                repeat: true,
                name: "ALL_LOAD",
                method: "email",
                message: "testtesttest",
            }
        ));
    }
    if(type === LOAD_SINGLE){
        return [
            {
                alarmId: alarmId,
                date: 1694872081120,
                day: null,
                time: 108000000,
                repeat: true,
                name: "LOAD_SINGLE",
                method: "email",
                message: "testtesttest",
            }
        ]
    }


    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/alarm/read", {alarmId, value: LOAD_VALUE});
}

export const updateAlarm = async({alarmId, date, day, time, repeat, name, method, message}) => {

    // if(alarmId === null){
    //     throw new Error("alarmId cannot be null");
    // }else if(!date && !day && !time && !repeat && !name && !method && !message){
    //     throw new Error("Value to modify does not exist");
    // };

    if(!time|| !name || !method /*|| !message*/){
        throw new Error("All fields cannot be null");
    }

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
    if(alarmId < 0){
        throw new Error("alarmId cannot be negative");
    }
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/alarm/delete", {alarmId});
}

export const updateEmail = async(email) => {
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/alarm/updateMethod", {email});
}

export const updatePhoneNumber = async(phoneNumber) => {
    return await axiosForm(process.env.REACT_APP_SERVER_URL+"/alarm/updateMethod", {phoneNumber});
}