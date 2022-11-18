import classNames from 'classnames/bind';
import MenuCardTippy from '@tippyjs/react/headless';
import Buttons from '~/component/Buttons';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import { EllipsisIcon } from '~/Icons';
import styles from '../CardHome.module.scss';
import { useDispatch } from 'react-redux';
import { addWhatLaster } from '~/redux/dataUserSplice';

const cx = classNames.bind(styles);

function MenuCard({ MENUiTEM, zIndex, onClick, className, itemvideo }) {
    const dispatch = useDispatch();
    function handleShow() {
        console.log('show tippy');
        document.body.style.overflow = 'hidden';
    }
    function handlehide() {
        document.body.style.overflow = 'overlay';
        console.log('hide tippy');
    }
    const handleClick = (item) => () => {
        switch (item.typeo) {
            case 'danhSachCho':
                break;
            case 'danhXemSau':
                dispatch(addWhatLaster(itemvideo));
                break;
            case 'DanhSachPhat':
                break;
            default:
                console.log('lỗi click');
                break;
        }
    };
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
                    <div className={cx('MenuCard')} tabIndex="-1" {...attrs} onClick={onClick}>
                        <PopperWrapper className={cx('wrapper-MenuCard')}>
                            {MENUiTEM.map((item, index) => {
                                return (
                                    <div key={index}>
                                        {!!item.line && <span className={cx('line')} />}
                                        <Buttons
                                            className={cx('menu-card-btn')}
                                            onClick={item.onClick && handleClick(item)}
                                            LeftIcon={item.icon}
                                        >
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
