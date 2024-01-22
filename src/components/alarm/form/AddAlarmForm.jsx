import { Form } from "react-router-dom";
import { useEffect, useState } from "react";

import "styles/alarm/addAlarmForm.scss";
import { ALARM_DTO_CALL, ALARM_DTO_EMAIL, ALARM_DTO_FRI, ALARM_DTO_MON, ALARM_DTO_SAT, ALARM_DTO_SMS, ALARM_DTO_SUN, ALARM_DTO_THU, ALARM_DTO_TUE, ALARM_DTO_WED, CREATE_ALARM, REMOVE_ALARM, UPDATE_ALARM } from "constants/alarm";

/**
 * AddAlarm 컴포넌트. 페이지 좌측에 위치. AlarmData의 수정 및 저장, 삭제 기능을 함
 *
 * @param {Object} param - AddAlarm 컴포넌트의 props
 * @param {Object} param.alarmData - 가공된 alarmData
 * @param {Function} param.save - 저장 버튼을 누를때 수행할 함수
 * @param {Function} param.remove - 삭제 버튼을 누를때 수행할 함수
 * @returns {JSX.Element} AddAlarm 컴포넌트를 렌더링
 */
const AddAlarmForm = ({ data }) => {
  const [id, setId] = useState(data.id);
  const [date, setDate] = useState(data.date);
  const [time, setTime] = useState(data.time);
  const [isRepeat, setIsRepeat] = useState(data.isRepeat);
  const [method, setMethod] = useState(data.method);
  const [name, setName] = useState(data.name);
  const [message, setMessage] = useState(data.message);
  const [isActive, setIsActive] = useState(data.isActive);
  const [day, setDay] = useState(data.day);

  const timeSelect = ({ target }) => {
    switch (target.name) {
      case "am":
        setTime({ ...time, isAm: true });
        return;
      case "pm":
        setTime({ ...time, isAm: false });
        return;
      default:
        break;
    }
  };

  const inputTime = ({ target }) => {
    const regex = /^[ \d]*$/;
    if (!regex.test(target.value)) {
      return;
    }
    const t = target.value.replace(/\sg/, "") === "" ? 0 : Number(target.value);
    switch (target.name) {
      case "hour":
        const hour = t > 12 ? 12 : t;
        setTime({ ...time, hour });
        return;
      case "minute":
        const minute = t > 59 ? 59 : t;
        setTime({ ...time, minute: String(minute).padStart(2, "0") });
        return;
      default:
        return;
    }
  };

  const inputDay = ({ target }) => {
    const n = target.name;
    if (day.includes(n)) {
      setDay(day.filter((d) => d !== n));
    } else {
      setDay([...day, n]);
    }
  };

  const selectMethod = ({ target }) => setMethod(target.name);

  const inputDate = ({ target }) => {
    const regex = /^[ \d]*$/;
    if (!regex.test(target.value)) {
      return;
    }
    const t = target.value.replace(/\sg/, "") === "" ? 0 : Number(target.value);
    switch (target.name) {
      case "year":
        const year = t > 9999 ? 9999 : t;
        setDate({ ...date, year });
        break;
      case "month":
        const month = t > 12 ? 12 : t;
        setDate({ ...date, month: String(month).padStart(2, "0") });
        break;
      case "day":
        const day = t > 31 ? 31 : t;
        setDate({ ...date, day: String(day).padStart(2, "0") });
        break;
      default:
        return;
    }
    setDay([]);
  };

  const inputName = ({ target }) => setName(target.value);

  const verify = (e) => {
    if (name.trim().length === 0){
      e.preventDefault();
      alert("이름은 필수 값 입니다.");
    }
  }

  useEffect(() => {
    setId(data.id);
    setDate(data.date);
    setTime(data.time);
    setIsRepeat(data.isRepeat);
    setMethod(data.method);
    setName(data.name);
    setMessage(data.message);
    setIsActive(data.isActive);
    setDay(data.day);
  }, [data]);

  const TrashCan = () =>
    id !== CREATE_ALARM ? (
      <button type="submit" name="type" value={REMOVE_ALARM}>
        <img src="trash-can-1.png" alt="trash" />
      </button>
    ) : (
      <></>
  );

  const type = id===CREATE_ALARM ? CREATE_ALARM : UPDATE_ALARM;

  return (
    <Form method="post" className="addAlarm-form" onSubmit={verify}>
      <div>
        <TrashCan />
      </div>
      <div>
        <div>
          <button
            type="button"
            onClick={timeSelect}
            name="am"
            value={time.isAm}
            className={!time.isAm ? "addAlarm-disabled" : ""}
          >
            오전
          </button>
          <button
            type="button"
            onClick={timeSelect}
            name="pm"
            value={!time.isAm}
            className={time.isAm ? "addAlarm-disabled" : ""}
          >
            오후
          </button>
        </div>
        <div className="addAlarm-time">
          <span>
            <input
              type="text"
              value={time.hour}
              onChange={inputTime}
              name="hour"
            />
          </span>
          <span>:</span>
          <span>
            <input
              type="text"
              value={time.minute}
              onChange={inputTime}
              name="minute"
            />
          </span>
        </div>
      </div>
      <div>
        <div>
          <span>반복</span>
        </div>
        <div>
          <button
            type="button"
            onClick={inputDay}
            name={ALARM_DTO_SUN}
            className={!day.includes(ALARM_DTO_SUN) ? "addAlarm-disabled" : ""}
          >
            일
          </button>
          <button
            type="button"
            onClick={inputDay}
            name={ALARM_DTO_MON}
            className={!day.includes(ALARM_DTO_MON) ? "addAlarm-disabled" : ""}
          >
            월
          </button>
          <button
            type="button"
            onClick={inputDay}
            name={ALARM_DTO_TUE}
            className={!day.includes(ALARM_DTO_TUE) ? "addAlarm-disabled" : ""}
          >
            화
          </button>
          <button
            type="button"
            onClick={inputDay}
            name={ALARM_DTO_WED}
            className={!day.includes(ALARM_DTO_WED) ? "addAlarm-disabled" : ""}
          >
            수
          </button>
          <button
            type="button"
            onClick={inputDay}
            name={ALARM_DTO_THU}
            className={!day.includes(ALARM_DTO_THU) ? "addAlarm-disabled" : ""}
          >
            목
          </button>
          <button
            type="button"
            onClick={inputDay}
            name={ALARM_DTO_FRI}
            className={!day.includes(ALARM_DTO_FRI) ? "addAlarm-disabled" : ""}
          >
            금
          </button>
          <button
            type="button"
            onClick={inputDay}
            name={ALARM_DTO_SAT}
            className={!day.includes(ALARM_DTO_SAT) ? "addAlarm-disabled" : ""}
          >
            토
          </button>
        </div>
      </div>
      <div>
        <div>
          <span>수단</span>
        </div>
        <div>
          <button
            type="button"
            onClick={selectMethod}
            name={ALARM_DTO_EMAIL}
            className={!(method === ALARM_DTO_EMAIL) ? "addAlarm-disabled" : ""}
          >
            이메일
          </button>
          <span>|</span>
          <button
            type="button"
            onClick={selectMethod}
            name={ALARM_DTO_CALL}
            className={!(method === ALARM_DTO_CALL) ? "addAlarm-disabled" : ""}
          >
            전화
          </button>
          <span>|</span>
          <button
            type="button"
            onClick={selectMethod}
            name={ALARM_DTO_SMS}
            className={!(method === ALARM_DTO_SMS) ? "addAlarm-disabled" : ""}
          >
            문자
          </button>
        </div>
      </div>
      <div>
        <div>
          <span>날짜</span>
        </div>
        <div>
          <input
            type="text"
            name="year"
            value={date.year}
            onChange={inputDate}
            className={!(day.length === 0) ? "addAlarm-disabled" : ""}
          />
          <span>/</span>
          <input
            type="text"
            name="month"
            value={date.month}
            onChange={inputDate}
            className={!(day.length === 0) ? "addAlarm-disabled" : ""}
          />
          <span>/</span>
          <input
            type="text"
            name="day"
            value={date.day}
            onChange={inputDate}
            className={!(day.length === 0) ? "addAlarm-disabled" : ""}
          />
        </div>
      </div>
      <div>
        <div>
          <span>이름</span>
        </div>
        <div>
          <input
            type="text"
            placeholder="default alarm name"
            name="name"
            value={name}
            onChange={inputName}
          ></input>
        </div>
      </div>
      <div>
        <div>
          <span>목소리</span>
        </div>
        <div>
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
      <div>
        <input type="hidden" name="method" value={method} />
        <input type="hidden" name="days" value={day} />
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="isRepeat" value={isRepeat} />
        <input type="hidden" name="message" value={message} />
        <input type="hidden" name="isActive" value={isActive} />
        <button type="submit" name="type" value={type}>
          저장
        </button>
      </div>
    </Form>
  );
};

export default AddAlarmForm;
