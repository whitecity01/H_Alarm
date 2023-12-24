import classNames from 'classnames/bind';
import headerStyle from './header.module.scss';
const style = classNames.bind(headerStyle);

/**
 * Header 컴포넌트. 페이지 상단에 위치, 왼쪽 및 오른쪽의 문자열과, 클릭 이벤트 표시
 * 
 * @param {Object} param - Header 컴포넌트의 props
 * @param {string} param.left - 왼쪽 영역에 표시될 텍스트
 * @param {string} param.right - 오른쪽 영역에 표시될 텍스트. 값이 없으면 대신 원형 요소가 표시
 * @param {Function} param.leftClick - 왼쪽 영역이 클릭될 때 호출되는 함수
 * @param {Function} param.rightClick - 오른쪽 영역이 클릭될 때 호출되는 함수
 * @returns {JSX.Element} Header 컴포넌트를 렌더링
 */
const Header = ({left, right, leftClick, rightClick}) => {

    const RightBox = () => right ? <span>{right}</span> : <div className={style('circle')}/>;

    return(
        <div className={style('header')}>
            <div className={style('left')} onClick={leftClick}>
                <span>{left}</span>
            </div>
            <div className={style('center')}>
                <p className={style('logo')}>
                    <span>G</span>
                    <span>F</span>
                    <span>UP</span>
                </p>
            </div>
            <div className={style('right')} /*onclick={rightClick}*/>
                <RightBox/>
            </div>
        </div>
    )
}

export default Header;