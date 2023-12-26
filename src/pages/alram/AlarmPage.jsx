import { redirect } from "react-router-dom";

import { boxingAlarmData, unBoxingAlarmData } from "../../utils/alarm";
import { deleteAlarm, updateAlarm, createAlarm, readAlarm } from '../../services/alarm/alarm';
import { useAlarmList } from "../../store/alarm";
import { ALL_LOADED_ALARM, CREATE_NEW_ALARM } from '../../constants/alarm';
import { SERVER_IP } from "../../constants/api";

import AlarmLayout from "../../components/alarm/AlarmLayout";


const AlarmPage = () => {
    return <AlarmLayout />
}

export default AlarmPage;

export const loader = async({request}) => {
    const url = new URL(request.url);
    const alarmId = url.searchParams.has('alarmId') ? url.searchParams.get('alarmId') : ALL_LOADED_ALARM;
    try{
        if (alarmId === ALL_LOADED_ALARM) return (await readAlarm(alarmId)).map(dt=>unBoxingAlarmData(dt));
        else return [...useAlarmList.getState().alarmList , ...(await readAlarm(alarmId)).map(dt=>unBoxingAlarmData(dt))];
    }catch(err){
        alert(err);
    }
    return useAlarmList.getState().alarmList;
}

export const action = async({ request }) => {
    const url = new URL("/alarm",SERVER_IP );
    const data = await request.formData();
    const type = data.get("type");
    const form = boxingAlarmData({
        alarmId : data.get('alarmId'),
        date : {year: data.get('year'), month: data.get('month'), day: data.get('day')},
        day : [0,1,2,3,4,5,6].filter( d=> !data.get(`w${d}`) ),
        time : {hour: data.get('hour'), minute: data.get('minute'), isAm: data.get('am')},
        repeat : data.get('repeat'),
        name : data.get('name'),
        method :data.get('E') ? 'E' : data.get('C')? 'C' : 'M',
        message : data.get('message')
    });
    
    try{
        if(form.alarmId === CREATE_NEW_ALARM) {
            url.searchParams.append("alarmId", await createAlarm(form));
        }else{
            if(type === 'remove'){
                await deleteAlarm(form.alarmId);
            }else{
                await updateAlarm(form);
            }
            url.searchParams.append('alarmId', form.alarmId);
        }
    }catch(err){
        alert(err);
    }

    return redirect(url);
}
