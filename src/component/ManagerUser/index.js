import { useContext, useState, forwardRef } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import MenuHeader from '@tippyjs/react/headless';
import styles from './ManagerUser.module.scss';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import ManagerItem from './ManagerItem';
import { RightLineIcon } from '~/Icons';
import { ThemDefau } from '~/layouts/DefaultLayout';
import Image from '../Image';
import firebase from 'firebase/compat/app';
import { useDispatch } from 'react-redux';
import { removeAll } from '~/redux/userSplice';
const cx = classNames.bind(styles);

function ManagerUser(props, ref) {
    const them = useContext(ThemDefau);
    const { items, currentUser, handleCurrentUser } = them;
    const [menuItems, setMenuItems] = useState([{ data: items }]);
    const [menuTitle, setMenuTitle] = useState('');
    const dispatch = useDispatch();

    const current = menuItems[menuItems.length - 1];

    const handleClick = (item) => () => {
        const isParent = !!item.children;
        const out = !!item.out;
        if (isParent) {
            setMenuTitle(item.headerTitle);
            setMenuItems((prev) => [...prev, item.children]);
        }
        if (out) {
            dispatch(removeAll(1));
            firebase.auth().signOut();
            window.localStorage.removeItem('Authorization');
            window.localStorage.removeItem('id');
            window.localStorage.removeItem('token');
            handleCurrentUser();
        }
    };

    function renderItems() {
        if (menuItems.length === 1) {
            return current.data.map((items, indexs) => {
                return (
                    <div key={indexs} className={cx('Wrapper-menu')}>
                        {items.map((item, index) => {
                            return (
                                <ManagerItem
                                    key={index}
                                    item={item}
                                    onClick={handleClick(item)}
                                    currentUser={currentUser}
                                />
                            );
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
    let classes = cx({ isclass: menuItems.length > 1, isWrapper: !currentUser && menuItems.length === 1 });
    return (
        <div>
            <MenuHeader
                trigger="click"
                interactive
                placement="left"
                render={(attrs) => (
                    <div className={cx('MenuSettng')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            {menuItems.length === 1 ? (
                                currentUser && (
                                    <div className={cx('header-menu')}>
                                        <button className={cx('user-avatar')} style={{ width: '40px', height: '40px' }}>
                                            <Image
                                                className={cx('avatar')}
                                                src={
                                                    props.secletor.image ||
                                                    'https://scontent.fhan2-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p56x56&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=1Rph2yqJK04AX-m8j8z&_nc_ht=scontent.fhan2-2.fna&oh=00_AT-n9X9vkZyDv847ZcME2tZ_z_-GtKio3Jfp90uSMGVOaQ&oe=63787DF8'
                                                }
                                                alt="avatar"
                                            />
                                        </button>
                                        <div>
                                            <span>{props.secletor.name}</span>
                                            <Link to="/user">Quản lý Tài khoản Google của bạn</Link>
                                        </div>
                                    </div>
                                )
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
                {props.children}
            </MenuHeader>
        </div>
    );
}

export default forwardRef(ManagerUser);
