import { ALARM_DTO_EMAIL, ALARM_DTO_FRI, ALARM_DTO_MON, ALARM_DTO_SAT, ALARM_DTO_SUN, ALARM_DTO_THU, ALARM_DTO_TUE, ALARM_DTO_WED, CREATE_ALARM } from "constants/alarm";

/**
 * 유닉스 시간을 받아 날짜를 포함하는 객체로 만들어서 반환
 * @param {Number} date
 * @returns {Object} yesr, month, day 프로퍼티를 포함하는 객체
 */
export const getDate = (date) => {
  const dt = new Date(date);
  return {
    year: dt.getFullYear().toString().padStart(4, "0"),
    month: (dt.getMonth() + 1).toString().padStart(2, "0"),
    day: dt.getDate().toString().padStart(2, "0"),
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
  const isAm =
    timeObj.hour < 12
      ? true
      : (() => {
          timeObj.hour = timeObj.hour === 12 ? 12 : timeObj.hour - 12;
          return false;
        })();
  return {
    hour: timeObj.hour.toString().padStart(2, " "),
    minute: timeObj.minute.toString().padStart(2, "0"),
    isAm,
  };
};

export const getMillisFromDate = date =>{
  return new Date(date.year, date.month - 1, date.day).getTime();
}

export const getMillisFromTime = time => {
  return new Date(
    1970,
    0,
    1,
    time.hour + 9 + (time.isAm ? 0 : 12),
    time.minute
  ).getTime();
}

/**
 * 숫자값을 받아 요일로 반환
 * @param {String} week
 * @returns {String} 요일을 담은 문자열
 */
export const getDay = (week) => {
  return week.map((item) => {
    switch (item) {
      case ALARM_DTO_SUN:
        return "일";
      case ALARM_DTO_MON:
        return "월";
      case ALARM_DTO_TUE:
        return "화";
      case ALARM_DTO_WED:
        return "수";
      case ALARM_DTO_THU:
        return "목";
      case ALARM_DTO_FRI:
        return "금";
      case ALARM_DTO_SAT:
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
  return {
    id: data.id,
    datetime: getMillisFromDate(data.date)+getMillisFromTime(data.time),
    isRepeat: data.isRepeat,
    name: data.name,
    message: data.message,
    method: data.method,
    isActive: data.isActive,
    day: data.day
  };
};

/**
 * 압축된 데이터를 복원하는 함수
 * @param {Object} data 압축된 데이터
 * @returns {Object} 복원된 데이터
 */
export const unBoxingAlarmData = (data) => {
  return {
    id: data.id,
    order: Number(data.datetime) % 86400000,
    date: data.datetime ? getDate(data.datetime) : getDate(new Date().getTime()),
    time: data.datetime ? getTime(data.datetime) : getTime(new Date().getTime()),
    isRepeat: data.isRepeat,
    name: data.name,
    message: data.message,
    method: data.method,
    isActive: data.isActive,
    day: data.day,
  };
};

/**
 * 비어있는 Alarm 객체 반환 함수
 * @returns {Object} 비어있는 Alarm 객체 반환
 */
export const getEmptyAlarmData = () => {
  return {
    id: CREATE_ALARM,
    datetime:0,
    isRepeat: false,
    name:"",
    message:"",
    method:ALARM_DTO_EMAIL,
    isActive: true,
    day: []
  };
};

export const dateToString = (date) => {
  return date instanceof Array ? date.join(" ") : `${date.year}-${date.month}-${date.day}`;
};
