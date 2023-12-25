import { useNavigate } from 'react-router-dom';

import HeaderInterface from "../interface/HeaderInterface";

const HeaderForm = ({isAddAlarm, setIsAddAlarm})=>{
    const navigate = useNavigate();
    const leftClick = ()=>setIsAddAlarm(!isAddAlarm);

    if (isAddAlarm){
        return <HeaderInterface left={"-"} right={"Save"} leftClick={leftClick} rightClick={null} />;
    }
    else{
        const rightClick = ()=>navigate('/mypage');
        return <HeaderInterface left={"+"} right={null} leftClick={leftClick} rightClick={rightClick} />;
    }
}

export default HeaderForm;