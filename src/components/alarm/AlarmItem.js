import classNames from 'classnames/bind';

import alarmItemStyle from './alarmItem.module.scss';
const style = classNames.bind(alarmItemStyle);

const AlarmItem = ({isEdit}) => {
    return(
        <div className={style('alarm')}>
            <div className={style('delete', {hide:!isEdit})}>
                <span>-</span>
            </div>
            <div className={style('main')}>
                <div>
                    <span>8</span>
                    <span>:</span>
                    <span>24</span>
                </div>
                <div>
                    <span>AM</span>
                </div>
                <div>
                    <span>E</span>
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