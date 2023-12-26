import { CREATE_NEW_ALARM } from "../constants/alarm";

/**
 * 유닉스 시간을 받아 날짜를 포함하는 객체로 만들어서 반환
 * @param {Number} date 
 * @returns {Object} yesr, month, day 프로퍼티를 포함하는 객체 
 */
export const getDate = (date) => {
    const dt = new Date(date);
    return {
        year: dt.getFullYear().toString().padStart(4,"0"),
        month: (dt.getMonth() + 1).toString().padStart(2, "0"),
        day: dt.getDate().toString().padStart(2, "0")
    };
};

/**
 * 유닉스 시간을 받아 시간을 포함하는 객체로 만들어서 반환
 * @param {Number} time 
 * @returns {Object} hour, minute, second, isAm 프로퍼티를 포함하는 객체
 */
export const getTime = (time) => {
    const dt = new Date(time);
    const timeObj = {
        hour: dt.getHours(),
        minute: dt.getMinutes(),
    };
    const isAm = timeObj.hour < 12 ? 
    true : 
    (() => {
        timeObj.hour = timeObj.hour === 12 ? 12 : timeObj.hour - 12; 
        return false;
    })();
    return {
        hour: timeObj.hour.toString().padStart(2, " "), 
        minute: timeObj.minute.toString().padStart(2, "0"), 
        isAm
    };
};

/**
 * 숫자값을 받아 요일로 반환
 * @param {Number} week 
 * @returns {String} 요일을 담은 문자열
 */
export const getDay = (week) => {
    return week.map((item) => {
        switch (item){
            case 0:
                return "일";
            case 1:
                return "월";
            case 2:
                return "화";
            case 3:
                return "수";
            case 4:
                return "목";
            case 5:
                return "금";
            case 6:
                return "토";
            default:
                return NaN;
        }
    });
};

/**
 * 웹에서 사용하는 데이터를 서버에 전송하기 위한 모양으로 변경
 * @param {Object} data 가공된 데이터 
 * @returns {Object} 압축된 데이터
 */
export const boxingAlarmData = (data) => {
    const time = (new Date(1970, 0, 1 ,data.time.hour+9+(data.time.isAm ? 0 : 12),data.time.minute)).getTime();
    const method = data.method === "E" ? "email" : data.method === "C" ? "call" : "message";
    const date = data.day.length === 0 ? (new Date(data.date.year, data.date.month -1,data.date.day)).getTime() : null;
    const day = data.day.length === 0 ? null : data.day;
    return {...data, time, method, date, day};
}

/**
 * 압축된 데이터를 복원하는 함수
 * @param {Object} data 압축된 데이터 
 * @returns {Object} 복원된 데이터 
 */
export const unBoxingAlarmData = (data) =>{
    return {
        time : data.time ? getTime(data.time) : getTime(new Date().getTime()),
        method : data.method === "email" ? "E": data.method === "call" ? "C" : "M",
        alarmId : data.alarmId,
        date : data.date ? getDate(data.date) : getDate(new Date().getTime()),
        day : data.day ? data.day : [],
        repeat : data.repeat,
        name : data.name,
        message : data.message,
    }
}

/**
 * 비어있는 Alarm 객체 반환 함수
 * @returns {Object} 비어있는 Alarm 객체 반환
 */
export const getEmptyAlarmData = () => {
    return {
        alarmId: CREATE_NEW_ALARM,
        date: 0,
        day: [],
        time: 0,
        repeat: false,
        name: "",
        method: "email",
        message: "",
    }
}

export const dateToString = (date)=>{
    return date ? `${date.year}-${date.month}-${date.day}` : date.day.join(" ");
}