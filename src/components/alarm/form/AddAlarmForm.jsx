
import { Form } from "react-router-dom";
import { useEffect, useState } from "react";

import '../../../styles/alarm/addAlarmForm.scss';
import { CREATE_ALARM } from "../../../constants/alarm";

/**
 * AddAlarm 컴포넌트. 페이지 좌측에 위치. AlarmData의 수정 및 저장, 삭제 기능을 함
 *  
 * @param {Object} param - AddAlarm 컴포넌트의 props
 * @param {Object} param.alarmData - 가공된 alarmData
 * @param {Function} param.save - 저장 버튼을 누를때 수행할 함수
 * @param {Function} param.remove - 삭제 버튼을 누를때 수행할 함수
 * @returns {JSX.Element} AddAlarm 컴포넌트를 렌더링
 */
const AddAlarmForm = ({ alarmData }) => {
    const [alarmId, setAlarmId] = useState(alarmData.alarmId);
    const [time, setTime] = useState(alarmData.time);
    const [method, setMethod] = useState(alarmData.method);
    const [date, setDate] = useState(alarmData.date);
    const [day, setDay] = useState(alarmData.day);
    //const [repeat, setRepeat] = useState(alarmData.repeat);
    const [name, setName] = useState(alarmData.name);
    //const [message, setMessage] = useState(alarmData.message);

    const timeSelect = ({target})=>{
        switch (target.name){
            case "am":
                setTime({...time,isAm:true});
                return;
            case "pm":
                setTime({...time,isAm:false});
                return;
            default:
                break;
        }
    }

    const inputTime = ({target}) => {
        const regex = /^[ \d]*$/; 
        if(!regex.test(target.value)){
            return;
        }
        const t = target.value.replace(/\sg/,'') === '' ? 0 : Number(target.value);
        switch(target.name){
            case "hour":
                const hour = t > 12 ? 12 : t;
                setTime({...time,hour});
                return;
            case "minute":
                const minute = t > 59 ? 59 : t;
                setTime({...time,minute:String(minute).padStart(2,'0')});
                return;
            default:
                return;
        }
    }

    const inputDay = ({target}) => {
        const n = target.name;
        if(day.includes(n)){
            setDay(day.filter(d => d !== n));
        }else{
            setDay([...day, n]);
        }
    }

    const selectMethod = ({target}) => setMethod(target.name);

    const inputDate = ({target}) => {
        const regex = /^[ \d]*$/; 
        if(!regex.test(target.value)){
            return;
        }
        const t = target.value.replace(/\sg/,'') === '' ? 0 : Number(target.value);
        switch (target.name) {
            case "year":
                const year = t > 9999 ? 9999 : t;
                setDate({...date, year});
                break;
            case "month":
                const month = t > 12 ? 12 : t;
                setDate({...date, month: String(month).padStart(2,'0')});
                break;
            case "day":
                const day = t > 31 ? 31 : t;
                setDate({...date, day: String(day).padStart(2,'0')});
                break;
            default:
                return;
        }
        setDay([]);
    }

    const inputName = ({target}) =>setName(target.value);
    useEffect(()=>{
        setAlarmId(alarmData.alarmId);
        setTime(alarmData.time);
        setMethod(alarmData.method);
        setDate(alarmData.date);
        setDay(alarmData.day);
        //setRepeat(alarmData.repeat);
        setName(alarmData.name);
        //setMessage(alarmData.message);
    },[alarmData]);

    const TrashCan = ()=>alarmId !== CREATE_ALARM ? 
    <button type="submit" name="type" value="remove">
        <img
            src="trash-can-1.png"
            alt="trash"
        /> 
    </button>
    : <></>

    return(
        <Form method="post" className='addAlarm-form'>
            <div>
                <TrashCan/>
            </div>
            <div>
                <div>
                    <button type="button" onClick={timeSelect} name="am" value={time.isAm} className={!time.isAm ? "addAlarm-disabled" : ""}>오전</button>
                    <button type="button" onClick={timeSelect} name="pm" value={!time.isAm} className={time.isAm ? "addAlarm-disabled" : ""}>오후</button>
                </div>
                <div className='addAlarm-time'>
                    <span><input type="text" value={time.hour} onChange={inputTime} name="hour" /></span>
                    <span>:</span>
                    <span><input type="text" value={time.minute} onChange={inputTime} name="minute" /></span>
                </div>
            </div>
            <div>
                <div>
                    <span>반복</span>
                </div>
                <div>
                    <button type="button" onClick={inputDay} name="w0" value={day.includes("w0")} className={!day.includes("w0") ? "addAlarm-disabled" : ""}>일</button>
                    <button type="button" onClick={inputDay} name="w1" value={day.includes("w1")} className={!day.includes("w1") ? "addAlarm-disabled" : ""}>월</button>
                    <button type="button" onClick={inputDay} name="w2" value={day.includes("w2")} className={!day.includes("w2") ? "addAlarm-disabled" : ""}>화</button>
                    <button type="button" onClick={inputDay} name="w3" value={day.includes("w3")} className={!day.includes("w3") ? "addAlarm-disabled" : ""}>수</button>
                    <button type="button" onClick={inputDay} name="w4" value={day.includes("w4")} className={!day.includes("w4") ? "addAlarm-disabled" : ""}>목</button>
                    <button type="button" onClick={inputDay} name="w5" value={day.includes("w5")} className={!day.includes("w5") ? "addAlarm-disabled" : ""}>금</button>
                    <button type="button" onClick={inputDay} name="w6" value={day.includes("w6")} className={!day.includes("w6") ? "addAlarm-disabled" : ""}>토</button>
                </div>
            </div>
            <div>
                <div>
                    <span>수단</span>
                </div>
                <div>
                    <button type="button" onClick={selectMethod} name="E" value={method==="E"} className={!(method==="E") ? "addAlarm-disabled" : ""}>이메일</button>
                    <span>|</span>
                    <button type="button" onClick={selectMethod} name="C" value={method==="C"} className={!(method==="C") ? "addAlarm-disabled" : ""}>전화</button>
                    <span>|</span>
                    <button type="button" onClick={selectMethod} name="M" value={method==="M"} className={!(method==="M") ? "addAlarm-disabled" : ""}>문자</button>
                </div>
            </div>
            <div>
                <div>
                    <span>날짜</span>
                </div>
                <div>
                    <input type="text" name="year" value={date.year} onChange={inputDate} className={!(day.length === 0) ? "addAlarm-disabled" : ""}/>
                    <span>/</span>
                    <input type="text" name="month" value={date.month} onChange={inputDate} className={!(day.length === 0) ? "addAlarm-disabled" : ""}/>
                    <span>/</span>
                    <input type="text" name="day" value={date.day} onChange={inputDate} className={!(day.length === 0) ? "addAlarm-disabled" : ""}/>
                </div>
            </div>
            <div>
                <div>
                    <span>이름</span>
                </div>
                <div>
                    <input type="text" placeholder='default alarm name' name="name" value={name} onChange={inputName}></input>
                </div>
            </div>
            <div>
                <div>
                    <span>목소리</span>
                </div>
                <div>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>
            <div>
                <input type="hidden" name="alarmId" value={alarmId} />
                <input type="hidden" name="repeat" value="true" />
                <input type="hidden" name="message" value="" />
                <button type="submit" name="type" value="save" >저장</button>
            </div>
        </Form>
    )
}

export default AddAlarmForm;