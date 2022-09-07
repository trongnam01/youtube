import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { CreateVideoIcon, EllipsisIcon, MenuIcon, NotificationIcon, UserIcon, VoiceIcon } from '../../../Icons';
import React from 'react';
import Tippy from '@tippyjs/react';
import MenuHeader from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import styles from './Header.module.scss';
import images from '../../../assets/images';
import Search from '../Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Wrapper as PopperWrapper } from '~/component/Popper';

const cx = classNames.bind(styles);

function Header() {
    const currentUser = true;
    return (
        <header className={cx('wrapper')}>
            <div className={cx('header-left')}>
                <button className={cx('menu-btn')}>
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

                        <MenuHeader
                            trigger="click"
                            interactive
                            placement="left"
                            render={(attrs) => (
                                <div
                                    className={cx('MenuSettng')}
                                    style={currentUser ? { maxHeight: '728px' } : { maxHeight: '428px' }}
                                    tabIndex="-1"
                                    {...attrs}
                                >
                                    <PopperWrapper>
                                        <div className={cx('header-menu')}>
                                            <button
                                                className={cx('user-avatar')}
                                                style={{ width: '40px', height: '40px' }}
                                            >
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
                                        <div className={cx('wrapper-content')}></div>
                                    </PopperWrapper>
                                </div>
                            )}
                            // zIndex="999999"
                            // onClickOutside={handleHideResult}
                        >
                            <button className={cx('user-avatar')}>
                                <img
                                    src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/305800251_862001731456061_3664926450741618381_n.jpg?stp=cp1_dst-jpg_p720x720&_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=aSsk2qrPUKMAX-vGIrT&_nc_ht=scontent.fhan2-3.fna&oh=00_AT9BEzVtvNLtljx6OM1ceZfVyXORRlrktAUyL1DlIeBRzg&oe=631C2AD1"
                                    alt="avatar"
                                />
                            </button>
                        </MenuHeader>
                    </>
                ) : (
                    <>
                        <Tippy content="cài đặt">
                            <MenuHeader
                                // trigger="click"
                                // visible={true}
                                visible
                                placement="bottom-start"
                                render={(attrs) => (
                                    <div
                                        className={cx('MenuSettng')}
                                        style={currentUser ? { maxHeight: '728px' } : { maxHeight: '428px' }}
                                        tabIndex="-1"
                                        {...attrs}
                                    >
                                        <PopperWrapper>
                                            {currentUser && (
                                                <div className={'header-menu'}>
                                                    <button className={cx('user-avatar')}>
                                                        <img
                                                            src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/305800251_862001731456061_3664926450741618381_n.jpg?stp=cp1_dst-jpg_p720x720&_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=aSsk2qrPUKMAX-vGIrT&_nc_ht=scontent.fhan2-3.fna&oh=00_AT9BEzVtvNLtljx6OM1ceZfVyXORRlrktAUyL1DlIeBRzg&oe=631C2AD1"
                                                            alt="avatar"
                                                        />
                                                    </button>
                                                    <div>
                                                        <span>Lê Bống</span>
                                                        <Link to="/user">Quản lý Tài khoản Google của bạn</Link>
                                                    </div>
                                                </div>
                                            )}
                                        </PopperWrapper>
                                    </div>
                                )}
                                // onClickOutside={handleHideResult}
                            >
                                <button className={cx('setting')}>
                                    <EllipsisIcon />
                                </button>
                            </MenuHeader>
                        </Tippy>

                        <button className={cx('login-btn')}>
                            <UserIcon className={cx('user-login')} />
                            <span>ĐĂNG NHẬP</span>
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
