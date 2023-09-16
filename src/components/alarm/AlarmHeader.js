import { useCallback } from 'react';

import Header from './Header';

const AlarmHeader = ({isEdit, setIsEdit, setIsAddAlarm}) => {
    const leftClick = useCallback(()=>{
        setIsEdit(edit => !edit);
    },[setIsEdit])
    const rightClick = useCallback(()=>{
        setIsAddAlarm(isAddAlarm => !isAddAlarm);
    },[setIsAddAlarm])
    const left = isEdit ? "Done" : "Edit";
    
    return(
        <Header left={left} center={"Alarm"} right={"+"} leftClick={leftClick} rightClick={rightClick}/>
    )
}

export default AlarmHeader;