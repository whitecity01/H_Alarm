import classNames from 'classnames/bind';
import headerStyle from './header.module.scss';
const style = classNames.bind(headerStyle);

const Header = ({left, center,right, leftClick, centerClick, rightClick}) => {

    return(
        <>
        <div className={style('margin')}/>
        <div className={style('container')}>
            <div className={style('header')}>
                <div className={style('edit')}>
                    <span onClick={leftClick}>{left}</span>
                </div>
                <div className={style('title')}>
                    <span onClick={centerClick}>{center}</span>
                </div>
                <div className={style('plus')}>
                    <span onClick={rightClick}>{right}</span>
                </div>
            </div>
        </div>    
        </>
    )
}

export default Header;