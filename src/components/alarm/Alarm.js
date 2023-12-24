import classNames from 'classnames/bind';
import { useCallback, useEffect, useState } from 'react';

import AlarmItem from './AlarmItem';
import AddAlarm from './AddAlarm';
import AddHeader from './AddHeader';
import AlarmHeader from './AlarmHeader';
import useAlarmList from '../../hooks/useAlarmList';
import { deleteAlarm, updateAlarm, createAlarm } from '../../api/alarm';
import { boxingAlarmData, getEmptyAlarmData, unBoxingAlarmData } from '../../utils/utils';

import alarmStyle from './alarm.module.scss';
const style = classNames.bind(alarmStyle);

const form = unBoxingAlarmData(getEmptyAlarmData());

/**
 * Alarm 컴포넌트. 페이지를 구성하는 컴포넌트. AlarmData를 관리함
 *  
 * @returns {JSX.Element} Alarm 컴포넌트를 렌더링
 */
const Alarm = () => {
    const [isAddAlarm, setIsAddAlarm] = useState(false);
    const [alarmSelected, setAlarmSelected] = useState(null);
    const [alarms, setAlarmList] = useAlarmList(null);
    const saveAlarm = async(data)=> {
        try{
            const dt = boxingAlarmData(data)
            if (dt.alarmId !== null) {
                await updateAlarm(dt);
            }else{
                await createAlarm(dt);
            }
            setAlarmList(dt.alarmId);
        }catch(err){
            alert(err);
        }
    }
    const _deleteAlarm = async (alarmId) => {
        try {
            await deleteAlarm(alarmId);
            setAlarmList(alarmId);
        } catch (e) {
            alert(e);
        }
    }
    const Header = () => isAddAlarm ? <AddHeader setIsAddAlarm={setIsAddAlarm}/> : <AlarmHeader setIsAddAlarm={setIsAddAlarm}/>;
    const Alarms = () => alarms.map((alarm) => <AlarmItem setAlarmSelected={setAlarmSelected} key={alarm.alarmId} data={alarm} isEdit={alarm.alarmId === alarmSelected} remove={() => { _deleteAlarm(alarm.alarmId) }} />)

    const data = isAddAlarm ? form : alarmSelected ? alarms.filter((v)=>v.alarmId === alarmSelected)[0]: form;

    return (
        <div className={style('wrap')}>
            <div className={style('container')}>
                <Header/>
                <div className={style('body')}>
                    <AddAlarm alarmData={data} save={saveAlarm} remove={_deleteAlarm}/>
                    <div className={style('alarm-list')}>
                        <Alarms/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Alarm;