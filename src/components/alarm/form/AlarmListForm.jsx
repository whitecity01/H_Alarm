import classNames from 'classnames/bind';

import alarmItemFormStyle from '../../../styles/alarm/alarmListForm.module.scss';
import AlarmItemForm from './AlarmItemForm';

const style = classNames.bind(alarmItemFormStyle);

const AlarmListForm = ({alarms, alarmSelected, setAlarmSelected })=>{

    const List = () => alarms.map((alarm) => <AlarmItemForm setAlarmSelected={setAlarmSelected} key={alarm.alarmId} data={alarm} isEdit={alarm.alarmId === alarmSelected} />);
    return(
        <div className={style('alarm-list')}>
            <List/>
        </div>
    )
}

export default AlarmListForm;