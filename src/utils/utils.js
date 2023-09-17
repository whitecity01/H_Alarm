import axios from 'axios';

export const getDate = (date) => {
    const dt = new Date(date);
    return {
        year: dt.getFullYear(),
        month: dt.getMonth() + 1,
        day: dt.getDate()
    };
};

export const getTime = (time) => {
    const dt = new Date(time);
    const timeObj = {
        hour: dt.getHours(),
        minute: dt.getMinutes(),
        second: dt.getSeconds()
    };
    const format = timeObj.hour < 12 ? 
    "AM" : 
    (() => {
        timeObj.hour = timeObj.hour === 12 ? 12 : timeObj.hour - 12; 
        return "PM";
    })();
    return {
        hour: timeObj.hour.toString().padStart(2, " "), 
        minute: timeObj.minute.toString().padStart(2, "0"), 
        second: timeObj.second.toString().padStart(2, "0"), 
        format
    };
};

export const getWeek = (week) => {
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
            return;
        case 400:
            throw new Error("잘못된 입력");
        case 401:
            throw new Error("중복된 입력");
        default:
            throw new Error(`서버 에러: ${response.status}`);
    }
}