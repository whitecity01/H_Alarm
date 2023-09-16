import { useCallback } from 'react';

import Header from './Header';

const AddHeader = ({setIsAddAlarm}) => {
    const leftClick = useCallback(()=>{
        setIsAddAlarm(edit => !edit);
    },[setIsAddAlarm])
    const rightClick = useCallback(()=>{
        setIsAddAlarm(isAddAlarm => !isAddAlarm);
    },[setIsAddAlarm])

    return(
        <Header left={"Cancel"} center={"Add Alarm"} right={"Save"} leftClick={leftClick} rightClick={rightClick}/>
    )
}

export default AddHeader;