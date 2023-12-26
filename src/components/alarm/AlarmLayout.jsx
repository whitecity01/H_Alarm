import { useEffect, useState } from 'react';

import AlarmListForm from './form/AlarmListForm';
import AddAlarmForm from './form/AddAlarmForm';
import HeaderForm from './form/HeaderForm';
import useAlarmList from '../../hooks/useAlarmList';
import { deleteAlarm, updateAlarm, createAlarm } from '../../services/alarm/alarm';
import { boxingAlarmData, getEmptyAlarmData, unBoxingAlarmData } from '../../utils/alarm';

import '../../styles/alarm/alarmLayout.scss';

const form = unBoxingAlarmData(getEmptyAlarmData());

/**
 * Alarm 컴포넌트. 페이지를 구성하는 컴포넌트. AlarmData를 관리함
 *  
 * @returns {JSX.Element} Alarm 컴포넌트를 렌더링
 */
const AlarmLayout = () => {
    const [isAddAlarm, setIsAddAlarm] = useState(false);
    const [alarms, setAlarmList] = useAlarmList(null);
    const [alarmSelected, setAlarmSelected] = useState(null);

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

    useEffect(()=>{
        if(alarms.length === 0){
            setIsAddAlarm(true);
        }else{
            setIsAddAlarm(false);
            setAlarmSelected(alarms[0].alarmId);
        }
    },[alarms, setAlarmSelected, setIsAddAlarm]);

    const data = isAddAlarm ? form : alarmSelected ? alarms.filter((v)=>v.alarmId === alarmSelected)[0]: form;

    return (
        <div className="wrap">
            <div className='container'>
                <HeaderForm isAddAlarm={isAddAlarm} setIsAddAlarm={setIsAddAlarm}/>
                <div className='body'>
                    <AddAlarmForm alarmData={data} save={saveAlarm} remove={_deleteAlarm}/>
                    <AlarmListForm alarms={alarms} alarmSelected={alarmSelected} setAlarmSelected={setAlarmSelected}/>
                </div>
            </div>
        </div>
    );
};

export default AlarmLayout;