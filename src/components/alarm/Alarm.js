import classNames from 'classnames/bind';
import { useState } from 'react';

import AlarmHeader from './AlarmHeader';
import AlarmItem from './AlarmItem';
import AddAlarm from './AddAlarm';

import alarmStyle from './alarm.module.scss';
const style = classNames.bind(alarmStyle);

const Alarm = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [isAddAlarm, setIsAddAlarm] = useState(false);
    if (isAddAlarm){
        return(
            <AddAlarm setIsAddAlarm={setIsAddAlarm}/>
        )
    }
    return(
        <>
            <AlarmHeader isEdit={isEdit} setIsEdit={setIsEdit} setIsAddAlarm={setIsAddAlarm}/>
            <div className={style('container')}>
                <div className={style('alarm-list')}>
                    <AlarmItem isEdit={isEdit}/>
                    <AlarmItem isEdit={isEdit}/>
                    <AlarmItem isEdit={isEdit}/>
                    <AlarmItem isEdit={isEdit}/>
                </div>
            </div>
        </>
    )
}

export default Alarm;