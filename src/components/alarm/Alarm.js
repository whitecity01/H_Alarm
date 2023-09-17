import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';

import AlarmHeader from './AlarmHeader';
import AlarmItem from './AlarmItem';
import AddAlarm from './AddAlarm';
import { readAlarm, deleteAlarm } from '../../api/alarm';

import alarmStyle from './alarm.module.scss';
const style = classNames.bind(alarmStyle);

const Alarm = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [isAddAlarm, setIsAddAlarm] = useState(false);
    const [alarms, setAlarms] = useState([
        {
            alarmId: "1",
            date: 1694872081120,
            week: [0,2,3,6],
            time: 108000000,
            repeat: true,
            name: "test",
            method: "email",
            message:"testtesttest",
        },
        {
            alarmId: "2",
            date: 1694872081120,
            week: [0,2,3,6],
            time: 122134122,
            repeat: true,
            name: "test",
            method: "call",
            message:"testtesttest",
        },
        {
            alarmId: "3",
            date: 1694872081120,
            week: [0,2,3,6],
            time: 1231243,
            repeat: true,
            name: "test",
            method: "email",
            message:"testtesttest",
        },
        {
            alarmId: "4",
            date: 1694872081120,
            week: [0,2,3,6],
            time: 123123443,
            repeat: true,
            name: "test",
            method: "email",
            message:"testtesttest",
        }
    ]);

    useEffect(()=>{
        (async()=>{
            try{
                //setAlarms(await readAlarm());
                await readAlarm();
            }catch(e){
                alert(e);
            }
        })();
    },[]);

    const _setIsAddAlarm = useCallback((func) => {
        setIsEdit(false);
        setIsAddAlarm(func);
    },[]);

    const _deleteAlarm = async(alarmId) => {
        try{
            await deleteAlarm(alarmId);
            //setAlarms(await readAlarm());
        }catch(e){
            alert(e);
        }
    }

    const Alarms = ()=>alarms.map((alarm)=> <AlarmItem key={alarm.alarmId} data={alarm} isEdit={isEdit} remove={()=>{_deleteAlarm(alarm.alarmId)}} />)

    if (isAddAlarm){
        return(
            <AddAlarm setIsAddAlarm={setIsAddAlarm}/>
        )
    }
    return(
        <>
            <AlarmHeader isEdit={isEdit} setIsEdit={setIsEdit} setIsAddAlarm={_setIsAddAlarm}/>
            <div className={style('container')}>
                <div className={style('alarm-list')}>
                    <Alarms/>
                </div>
            </div>
        </>
    )
}

export default Alarm;