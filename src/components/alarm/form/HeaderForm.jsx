import { useNavigate } from 'react-router-dom';

import HeaderInterface from "../interface/HeaderInterface";

const HeaderForm = ({isAddAlarm, setIsAddAlarm})=>{
    const navigate = useNavigate();
    const rightClick = ()=>navigate('/mypage');
    const leftClick = ()=>setIsAddAlarm(!isAddAlarm);

    if (isAddAlarm){
        return <HeaderInterface left={"-"} right={null} leftClick={leftClick} rightClick={rightClick} />;
    }
    else{
        return <HeaderInterface left={"+"} right={null} leftClick={leftClick} rightClick={rightClick} />;
    }
}

export default HeaderForm;