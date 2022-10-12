import classNames from 'classnames/bind';
import MenuCardTippy from '@tippyjs/react/headless';
import Buttons from '~/component/Buttons';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import { EllipsisIcon } from '~/Icons';
import styles from '../CardHome.module.scss';

const cx = classNames.bind(styles);

function MenuCard({ MENUiTEM, zIndex, onClick, className }) {
    function handleShow() {
        console.log('show tippy');
        document.body.style.overflow = 'hidden';
    }
    function handlehide() {
        document.body.style.overflow = 'overlay';
        console.log('hide tippy');
    }
    return (
        <div>
            <MenuCardTippy
                onHidden={handlehide}
                onTrigger={handleShow}
                onUntrigger={handlehide}
                trigger="click"
                interactive
                zIndex={zIndex}
                placement="bottom-start"
                render={(attrs) => (
                    <div className={cx('MenuCard')} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('wrapper-MenuCard')}>
                            {MENUiTEM.map((item, index) => {
                                return (
                                    <div key={index}>
                                        {!!item.line && <span className={cx('line')} />}
                                        <Buttons className={cx('menu-card-btn')} LeftIcon={item.icon}>
                                            {item.title}
                                        </Buttons>
                                    </div>
                                );
                            })}
                        </PopperWrapper>
                    </div>
                )}
            >
                <button className={cx('setting', className)} onClick={onClick}>
                    <EllipsisIcon />
                </button>
            </MenuCardTippy>
        </div>
    );
}

export default MenuCard;
