import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import MenuHeader from '@tippyjs/react/headless';
import styles from './ManagerUser.module.scss';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import Button from '~/component/Button';
import ManagerItem from './ManagerItem';
import { RightLineIcon } from '~/Icons';

const cx = classNames.bind(styles);

function ManagerUser({ items }) {
    const [menuItems, setMenuItems] = useState([{ data: items }]);
    const [menuTitle, setMenuTitle] = useState('');

    const current = menuItems[menuItems.length - 1];

    const handleClick = (item) => () => {
        const isParent = !!item.children;
        if (isParent) {
            setMenuTitle(item.headerTitle);
            setMenuItems((prev) => [...prev, item.children]);
        }
    };

    function renderItems() {
        if (menuItems.length === 1) {
            return current.data.map((items, index) => {
                return (
                    <div key={index} className={cx('Wrapper-menu')}>
                        {items.map((item, index) => {
                            return <ManagerItem key={index} item={item} onClick={handleClick(item)} />;
                        })}
                    </div>
                );
            });
        } else {
            return current.data.map((item, index) => {
                return <ManagerItem key={index} item={item} className={cx('item-btn')} />;
            });
        }
    }
    function handleResetMenu() {
        setMenuItems((prev) => prev.slice(0, 1));
    }
    let classes = cx({ isclass: menuItems.length > 1 });
    return (
        <MenuHeader
            trigger="click"
            interactive
            placement="left"
            render={(attrs) => (
                <div className={cx('MenuSettng')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        {menuItems.length === 1 ? (
                            <div className={cx('header-menu')}>
                                <button className={cx('user-avatar')} style={{ width: '40px', height: '40px' }}>
                                    <img
                                        style={{ width: '100%', height: '100%' }}
                                        src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/305800251_862001731456061_3664926450741618381_n.jpg?stp=cp1_dst-jpg_p720x720&_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=aSsk2qrPUKMAX-vGIrT&_nc_ht=scontent.fhan2-3.fna&oh=00_AT9BEzVtvNLtljx6OM1ceZfVyXORRlrktAUyL1DlIeBRzg&oe=631C2AD1"
                                        alt="avatar"
                                    />
                                </button>
                                <div>
                                    <span>Lê Hoàng</span>
                                    <Link to="/user">Quản lý Tài khoản Google của bạn</Link>
                                </div>
                            </div>
                        ) : (
                            <div className={cx('header-title-menu')}>
                                <span
                                    className={cx('back-icon')}
                                    onClick={() => setMenuItems((prev) => prev.slice(0, prev.length - 1))}
                                >
                                    <RightLineIcon />
                                </span>
                                <span className={cx('title-item')}>{menuTitle}</span>
                            </div>
                        )}
                        <div className={cx('wrapper-content', classes)}>{renderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            // zIndex="999999"
            onHide={handleResetMenu}
        >
            <button className={cx('user-avatar')}>
                <img
                    src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/305800251_862001731456061_3664926450741618381_n.jpg?stp=cp1_dst-jpg_p720x720&_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=aSsk2qrPUKMAX-vGIrT&_nc_ht=scontent.fhan2-3.fna&oh=00_AT9BEzVtvNLtljx6OM1ceZfVyXORRlrktAUyL1DlIeBRzg&oe=631C2AD1"
                    alt="avatar"
                />
            </button>
        </MenuHeader>
    );
}

export default ManagerUser;
