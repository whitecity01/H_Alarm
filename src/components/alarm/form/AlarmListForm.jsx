
import AlarmItemForm from './AlarmItemForm';

import '../../../styles/alarm/alarmListForm.scss';

const AlarmListForm = ({alarms, alarmSelected, setAlarmSelected })=>{

    const List = () => alarms.map((alarm) => <AlarmItemForm setAlarmSelected={setAlarmSelected} key={alarm.alarmId} data={alarm} isEdit={alarm.alarmId === alarmSelected} />);
    return(
        <div className='alarmList-list'>
            <List/>
        </div>
    )
}

export default AlarmListForm;