import classNames from 'classnames/bind';

import useAlarmData from '../../../hooks/useAlarmData';

import addAlarmStyle from '../../../styles/alarm/addAlarmForm.module.scss';
const style = classNames.bind(addAlarmStyle);

/**
 * AddAlarm 컴포넌트. 페이지 좌측에 위치. AlarmData의 수정 및 저장, 삭제 기능을 함
 *  
 * @param {Object} param - AddAlarm 컴포넌트의 props
 * @param {Object} param.alarmData - 가공된 alarmData
 * @param {Function} param.save - 저장 버튼을 누를때 수행할 함수
 * @param {Function} param.remove - 삭제 버튼을 누를때 수행할 함수
 * @returns {JSX.Element} AddAlarm 컴포넌트를 렌더링
 */
const AddAlarmForm = ({alarmData, save, remove}) => {
    const [data, setData] = useAlarmData(alarmData);

    const inputTime = ({target}) => {
        switch (target.name){
            case "am":
                setData({time: {...data.time,isAm:true}});
                return;
            case "pm":
                setData({time: {...data.time,isAm:false}});
                return;
            default:
                break;
        }
        const regex = /^\d*$/; 
        if(!regex.test(target.value)){
            return;
        }
        const t = Number(target.value);
        switch(target.name){
            case "hour":
                const hour = t > 12 ? 12 : t;
                setData({time: {...data.time,hour}});
                return;
            case "minute":
                const minute = t > 59 ? 59 : t;
                setData({time: {...data.time,minute:String(minute).padStart(2,'0')}});
                return;
            default:
                return;
        }
    }

    const inputDay = ({target}) => {
        const n = Number(target.name);
        setData({date: {year:"0000", month:"00", day:"00"}})
        if(data.day.includes(n)){
            setData({day: data.day.filter(d => d !== n)});
        }else{
            setData({day : [...data.day, n]});
        }
    }

    const selectMethod = ({target}) => setData({method: target.name});

    const inputDate = ({target}) => {
        const regex = /^\d*$/; 
        if(!regex.test(target.value)){
            return;
        }
        const t = Number(target.value);
        switch (target.name) {
            case "year":
                const year = t > 9999 ? 9999 : t;
                setData({date: {...data.date, year}, day:[]});
                break;
            case "month":
                const month = t > 12 ? 12 : t;
                setData({date: {...data.date, month: String(month).padStart(2,'0')}, day:[]});
                break;
            case "day":
                const day = t > 31 ? 31 : t;
                setData({date: {...data.date, day: String(day).padStart(2,'0')}, day:[]});
                break;
            default:
                return;
        }
    }

    const inputName = ({target}) => setData({name: target.value});

    const _save = ()=> save(data);

    const _remove = ()=> remove(data.alarmId);

    const TrashCan = ()=>data.alarmId ? <img
        onClick={_remove}
        src="trash-can-1.png"
        alt="trash"
    /> : <></>

    return(
        <div className={style('form')}>
            <div>
                <TrashCan/>
            </div>
            <div>
                <div>
                    <button onClick={inputTime} name="am" className={style({disabled: !data.time.isAm})}>오전</button>
                    <button onClick={inputTime} name="pm" className={style({disabled: data.time.isAm})}>오후</button>
                </div>
                <div className={style('time')}>
                    <span><input type="text" value={data.time.hour} onChange={inputTime} name="hour" /></span>
                    <span>:</span>
                    <span><input type="text" value={data.time.minute} onChange={inputTime} name="minute" /></span>
                </div>
            </div>
            <div>
                <div>
                    <span>반복</span>
                </div>
                <div>
                    <button onClick={inputDay} name="0" className={style({disabled:!data.day.includes(0)})}>일</button>
                    <button onClick={inputDay} name="1" className={style({disabled:!data.day.includes(1)})}>월</button>
                    <button onClick={inputDay} name="2" className={style({disabled:!data.day.includes(2)})}>화</button>
                    <button onClick={inputDay} name="3" className={style({disabled:!data.day.includes(3)})}>수</button>
                    <button onClick={inputDay} name="4" className={style({disabled:!data.day.includes(4)})}>목</button>
                    <button onClick={inputDay} name="5" className={style({disabled:!data.day.includes(5)})}>금</button>
                    <button onClick={inputDay} name="6" className={style({disabled:!data.day.includes(6)})}>토</button>
                </div>
            </div>
            <div>
                <div>
                    <span>수단</span>
                </div>
                <div>
                    <button onClick={selectMethod} name="E" className={style({disabled:!(data.method==="E")})}>이메일</button>
                    <span>|</span>
                    <button onClick={selectMethod} name="C" className={style({disabled:!(data.method==="C")})}>전화</button>
                    <span>|</span>
                    <button onClick={selectMethod} name="M" className={style({disabled:!(data.method==="M")})}>문자</button>
                </div>
            </div>
            <div>
                <div>
                    <span>날짜</span>
                </div>
                <div>
                    <input type="text" name="year" value={data.date.year} onChange={inputDate} className={style({disabled: !(data.day.length === 0)})}/>
                    <span>/</span>
                    <input type="text" name="month" value={data.date.month} onChange={inputDate} className={style({disabled: !(data.day.length === 0)})}/>
                    <span>/</span>
                    <input type="text" name="day" value={data.date.day} onChange={inputDate} className={style({disabled: !(data.day.length === 0)})}/>
                </div>
            </div>
            <div>
                <div>
                    <span>이름</span>
                </div>
                <div>
                    <input placeholder='default alarm name' value={data.name} onChange={inputName}></input>
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
                <button onClick={_save}>저장</button>
            </div>
        </div>
    )
}

export default AddAlarmForm;