import { useCallback, forwardRef } from 'react';

import { dateToString } from '../../../utils/alarm';

import '../../../styles/alarm/alarmItemForm.scss';

/**
 * AlarmItem 컴포넌트. 페이지 우측 위치. AlarmData를 보여주는 기능을 함
 *  
 * @param {Object} param - AlarmItem 컴포넌트의 props
 * @param {Boolean} param.isEdit -
 * @param {Object} param.data - 가공된 alarmData
 * @param {Function} param.remove - 
 * @param {Function} param.setAlarmSelected - AlarmItem이 클릭될 때 수행할 이벤트 함수
 * @returns {JSX.Element} AlarmItem 컴포넌트를 렌더링
 */
const AlarmItemForm = forwardRef(({isEdit, data, remove, setAlarmSelected}, ref) => {

    const Date = ({date}) => <>{dateToString(date)}</>

    const _setAlarmSelected = useCallback(() => {
        setAlarmSelected(data.alarmId);
    },[data.alarmId, setAlarmSelected]);

    return(
        <div ref={ref} className='alarmItem-item' onClick={_setAlarmSelected}>
            <div>
                <div className='alarmItem-circle'></div>
            </div>
            <div>
                <div>
                    <p>
                        {data.time.isAm ? "오전" : "오후" }
                    </p>
                    <p>
                        {data.time.hour}:{data.time.minute}
                    </p>
                </div>
                <div>
                    <p>
                        {data.name}
                    </p>
                    <p>
                        <Date date={data.date}/>
                    </p>
                </div>
                <div>
                    <p className={ data.method === "E" ? "alarmItem-active" : ""}>E</p>
                    <p className={ data.method === "C" ? "alarmItem-active" : ""}>C</p>
                    <p className={ data.method === "M" ? "alarmItem-active" : ""}>M</p>
                </div>
            </div>
        </div>
    )
});

export default AlarmItemForm;