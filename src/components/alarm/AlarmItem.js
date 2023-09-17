import classNames from 'classnames/bind';

import {getTime} from '../../utils/utils';

import alarmItemStyle from './alarmItem.module.scss';
const style = classNames.bind(alarmItemStyle);

const AlarmItem = ({isEdit, data, remove}) => {
    const time = getTime(data.time);
    const method = data.method === "email" ? "E": data.method === "call" ? "C" : "M";
    // const alarmId = data.alarmId;
    // const date = getDate(data.date);
    // const week = getWeek(data.week);
    // const repeat = data.repeat;
    // const name = data.name;
    // const message = data.message;

    return(
        <div className={style('alarm')}>
            <div className={style('delete', {hide:!isEdit})}>
                <span onClick={remove}>-</span>
            </div>
            <div className={style('main')}>
                <div>
                    <span>{time.hour}</span>
                    <span>:</span>
                    <span>{time.minute}</span>
                </div>
                <div>
                    <span>{time.format}</span>
                </div>
                <div>
                    <span>{method}</span>
                </div>
                <div>
                    <input type="checkbox" />
                </div>
            </div>
            <div className={style('order', {hide:!isEdit})}>
                <span>=</span>
            </div>
        </div>
    )
}

export default AlarmItem;