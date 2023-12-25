import { useEffect, useState } from 'react';

/**
 * ALarm 데이터 훅 alarmData를 받아 저장하고, _setData 함수를 이용해 변경점을 최신화 하는 훅
 * @param {Object} alarmData alarmData
 * @returns {Object, function} alarmData를 담은 data 객체와 _setData 반환
 */
const useAlarmData = (alarmData) => {
    const [data, setData] = useState(alarmData);

    useEffect(()=>{
        setData(alarmData);
    }, [alarmData]);    
    
    const _setData = (obj) => {
        setData({...data, ...obj});
    }

    return [data, _setData];
}

export default useAlarmData;