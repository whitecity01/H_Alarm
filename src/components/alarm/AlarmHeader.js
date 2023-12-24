import Header from './Header';

/**
 * AlarmHeader 컴포넌트. Header 컴포넌트를 활용하기 위한 어뎁터 컴포넌트. 일반적인 상황에서의 헤더
 * @param {Object} param - AlarmHeader 컴포넌트의 props
 * @param {Function} param.setIsAddAlarm - +를 클릭했을때 수행할 이벤트 함수
 * @returns {JSX.Element} Header 컴포넌트 렌더링
 */
const AlarmHeader = ({setIsAddAlarm}) => {
    const leftClick = ()=> setIsAddAlarm(true);
    return(
        <Header left={"+"} right={null} leftClick={leftClick} rightClick={null}/>
    )
}

export default AlarmHeader;