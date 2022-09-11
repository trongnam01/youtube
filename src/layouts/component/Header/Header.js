import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { CreateVideoIcon, EllipsisIcon, MenuIcon, NotificationIcon, UserIcon, VoiceIcon } from '../../../Icons';
import React, { useContext, useRef } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { ThemDefau } from '~/layouts/DefaultLayout';

import styles from './Header.module.scss';
import images from '../../../assets/images';
import Search from '../Search';
import ManagerUser from '~/component/ManagerUser';
import LoginBtn from '~/component/LoginBtn';

const cx = classNames.bind(styles);

function Header() {
    const them = useContext(ThemDefau);
    const { currentUser, handleTongleSideBar, handleCurrentUser } = them;

    const handleLogin = (e) => {
        let TimeoutHandle = setTimeout(() => {
            handleCurrentUser();
            clearTimeout(TimeoutHandle);
        }, 1000);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('header-left')}>
                <button className={cx('menu-btn')} onClick={handleTongleSideBar}>
                    <MenuIcon />
                </button>
                <Link to="/">
                    <div className={cx('logo-contai')}>
                        <img src={images.logo} alt="logo" />
                        <span>VN</span>
                    </div>
                </Link>
            </div>
            <div className={cx('header-center')}>
                <Search />
                <Tippy content="Tìm kiếm bằng giọng nói">
                    <span className={cx('icon-voice')}>
                        <VoiceIcon />
                    </span>
                </Tippy>
            </div>
            <div className={cx('header-right')}>
                {currentUser ? (
                    <>
                        <Tippy content="Tạo">
                            <button className={cx('create-video-btn')}>
                                <CreateVideoIcon />
                            </button>
                        </Tippy>
                        <Tippy content="Thông báo">
                            <button className={cx('notification-btn')}>
                                <NotificationIcon />
                                <span>9+</span>
                            </button>
                        </Tippy>

                        <ManagerUser>
                            <button className={cx('user-avatar')}>
                                <img
                                    src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/305800251_862001731456061_3664926450741618381_n.jpg?stp=cp1_dst-jpg_p720x720&_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=aSsk2qrPUKMAX-vGIrT&_nc_ht=scontent.fhan2-3.fna&oh=00_AT9BEzVtvNLtljx6OM1ceZfVyXORRlrktAUyL1DlIeBRzg&oe=631C2AD1"
                                    alt="avatar"
                                />
                            </button>
                        </ManagerUser>
                    </>
                ) : (
                    <>
                        <Tippy content="cài đặt">
                            <ManagerUser>
                                <button className={cx('setting')}>
                                    <EllipsisIcon />
                                </button>
                            </ManagerUser>
                        </Tippy>

                        <LoginBtn onClick={handleLogin} />
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
