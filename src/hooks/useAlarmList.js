import { useCallback, useEffect, useState } from 'react';

import { unBoxingAlarmData } from '../utils/alarm';
import { readAlarm } from '../services/alarm/alarm';

const rda = async alarmId=>(await readAlarm(alarmId)).map(data=>unBoxingAlarmData(data));

/**
 * alarmId를 들고와 해당 alarmId의 정보를 리스트로 반환하는 함수
 * @param alarmData null or alarmId
 * @return [data, _setData] data list and setData function
 */
const useAlarmList = (alarmId) => {
    const [data, setData] = useState([]);
    const _setData = useCallback(async(alarmId) => {
        if (alarmId === null) setData(await rda(null));
        else{
            const temp =await rda(alarmId);
            setData(data=>data.filter((dt)=>dt.alarmId !== alarmId) + temp);
        }
    },[]);

    useEffect(()=>{
        _setData(alarmId);
    },[alarmId,_setData]);

    return [data, _setData];
}

export default useAlarmList;