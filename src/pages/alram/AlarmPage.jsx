import { redirect } from "react-router-dom";

import { boxingAlarmData, unBoxingAlarmData } from "../../utils/alarm";
import { deleteAlarm, updateAlarm, createAlarm, readAlarm } from '../../services/alarm/alarm';
import { useAlarmList } from "../../store/alarm";
import { ALL_LOAD, CREATE_ALARM, LOAD_MULTIPLE, LOAD_SINGLE, REMOVE_ALARM, UPDATE_ALARM, EMPTY_ALARM_LIST, LOAD_VALUE } from '../../constants/alarm';

import AlarmLayout from "../../components/alarm/AlarmLayout";


const AlarmPage = () => {
    return <AlarmLayout />
}

export default AlarmPage;

export const loader = async({request}) => {
    const url = new URL(request.url);
    const curList = useAlarmList.getState().alarmList;
    const _alarmId = url.searchParams.has('alarmId') ? Number(url.searchParams.get('alarmId')) : null;
    const type = (()=>{
        if (_alarmId === null) return LOAD_MULTIPLE;
        if (curList.length === 0) return ALL_LOAD;
        const type = url.searchParams.has('type')? Number(url.searchParams.get('alarmId')) : null;
        switch(type){
            case CREATE_ALARM:
            case REMOVE_ALARM:
            case UPDATE_ALARM:
                return LOAD_SINGLE;
            default:
                return LOAD_MULTIPLE;
        }
    })();

    const alarmId = type === LOAD_MULTIPLE ? 
        curList.length === 0 ? EMPTY_ALARM_LIST : curList[curList.length - 1].alarmId 
        :
        _alarmId;

    try{
        const data = (await readAlarm(alarmId, type)).map(dt=>unBoxingAlarmData(dt));
        const alarmList = (()=>{
            if(data.length === 0) curList.filter((data)=>data.alarmId === alarmId);
            switch(type){
                case LOAD_SINGLE:
                    const index = curList.findIndex( data => data.alarmId === alarmId);
                    return (curList[index] = data[0]);
                case LOAD_MULTIPLE:
                    return alarmId ? [...curList,...data] : data;
                case ALL_LOAD:
                    return data;
                default:
                    return curList;
            }
        })();

        return {
            alarmList, 
            curAlarmId: alarmId,
            isLoadable : type === LOAD_MULTIPLE && data.length < LOAD_VALUE ? false : true,
        };
    }catch(err){
        alert(err);
        return {
            alarmList : curList,
            curAlarmId : null,
            isLoadable : true,
        };
    }
}

export const action = async({ request }) => {
    const url = new URL(request.url);
    url.search = '';
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
        if(form.alarmId === CREATE_ALARM) {
            url.searchParams.append("alarmId", await createAlarm(form));
            url.searchParams.append("type", CREATE_ALARM);
        }else{
            if(type === 'remove'){
                await deleteAlarm(form.alarmId);
                url.searchParams.append('type', REMOVE_ALARM);
            }else{
                await updateAlarm(form);
                url.searchParams.append('type', UPDATE_ALARM);
            }
            url.searchParams.append('alarmId', form.alarmId);
        }
    }catch(err){
        alert(err);
    }

    return redirect(url);
}
