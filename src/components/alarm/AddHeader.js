import Header from './Header';

/**
 * AddHeader 컴포넌트. Header 컴포넌트를 활용하기 위한 어뎁터 컴포넌트. 컴포넌트를 추가할떄의 헤더
 * @param {Object} param - AddHeader 컴포넌트의 props
 * @param {Function} param.setIsAddAlarm - Cancel를 클릭했을때 수행할 이벤트 함수
 * @returns {JSX.Element} Header 컴포넌트 렌더링
 */
const AddHeader = ({setIsAddAlarm}) => {
    const leftClick = ()=> setIsAddAlarm(false);
    return(
        <Header left={"Cancel"} right={"Save"} leftClick={leftClick} /*rightClick={rightClick}*//>
    )
}

export default AddHeader;