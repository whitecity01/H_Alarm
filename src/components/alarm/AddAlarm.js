import classNames from 'classnames/bind';

import AddHeader from './AddHeader';

import addAlarmStyle from './addAlarm.module.scss';
const style = classNames.bind(addAlarmStyle);

const AddAlarm = ({setIsAddAlarm}) => {

    return(
        <>
            <AddHeader setIsAddAlarm={setIsAddAlarm}/>
            <div className={style('container')}>
                <div className={style('alarm-input')}>
                    <div className={style('date')}>
                        <div>
                            <input type='date' />
                        </div>
                        <div>
                            <button type='button'>Sun</button>
                            <button type='button'>Mon</button>
                            <button type='button'>Tue</button>
                            <button type='button'>Wed</button>
                            <button type='button'>Thu</button>
                            <button type='button'>Fri</button>
                            <button type='button'>Sat</button>
                        </div>
                    </div>
                    <div className={style('time')}>
                        <input type='time' />
                    </div>
                    <div className={style('repeat')}>
                        <button type='button'>repeat</button>
                    </div>
                    <div className={style('name')}>
                        <input type='text' />
                    </div>
                    <div className={style('method')}>
                        <button type='button'>Email</button>
                        <button type='button'>Call</button>
                        <button className={style('button-click')} type='button'>Message</button>
                    </div>
                    <div className={style('voice')}>
                        <button type='button'>Man</button>
                        <button type='button'>Woman</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddAlarm;