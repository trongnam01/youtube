import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import {
    CreateVideoIcon,
    EllipsisIcon,
    MenuIcon,
    NotificationIcon,
    SearchIcon,
    UserIcon,
    VoiceIcon,
} from '../../../Icons';
import React, { useContext, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { ThemDefau } from '~/layouts/DefaultLayout';

import styles from './Header.module.scss';
import images from '../../../assets/images';
import Search from '../Search';
import ManagerUser from '~/component/ManagerUser';
import LoginBtn from '~/component/LoginBtn';
import Image from '~/component/Image';
import SearchMobile from '../SearchMobile';

const cx = classNames.bind(styles);

function Header() {
    const them = useContext(ThemDefau);
    const { currentUser, handleTongleSideBar, handleCurrentUser } = them;
    const [isSearch, setIsSearchMobi] = useState(false);

    const handleLogin = (e) => {
        let TimeoutHandle = setTimeout(() => {
            handleCurrentUser();
            clearTimeout(TimeoutHandle);
        }, 1000);
    };
    const handleShowSearchMobi = () => {
        setIsSearchMobi(!isSearch);
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
                <div className={cx('header-right-mobile')}>
                    <button className={cx('btn-search-mobile')} onClick={handleShowSearchMobi}>
                        <SearchIcon />
                    </button>
                    {currentUser ? (
                        <Image
                            className={cx('avatar-mobile')}
                            src="https://yt3.ggpht.com/m2SNGstG0MtpG8-f88RV1RUVyH2RDXw9za5riMIzY7tRRMh13ZCrqg0bhKnz81f92Lk1_QJtHA=s88-c-k-c0x00ffffff-no-rj"
                            alt="avatar"
                        />
                    ) : (
                        <UserIcon className={cx('icon-user-mobile')} />
                    )}
                    {isSearch && <SearchMobile handleShowSearchMobi={handleShowSearchMobi} />}
                </div>
                <div className={cx('header-right-dellTop')}>
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
                                    <Image
                                        src="https://scontent.fhan2-2.fna.fbcdn.net/v/t39.30808-6/306545225_480300720778873_5681159161992728100_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8631f5&_nc_ohc=fwcYkXKOZyoAX-qexbB&_nc_oc=AQmyw846t8jPGs1hYRvKbtrzoY7WQwMaagZH0RElEclKPge18KTHaOCzBsXL8Ghlpz5rLkGwSPpeW7AJ3vzQC22L&tn=k_Zw9YE9eTW8oaKE&_nc_ht=scontent.fhan2-2.fna&oh=00_AT8Zj6tu9z-lvocFuDSeFNhCbuD5x5gP2yxXnooZHQpv8Q&oe=6335179B"
                                        alt="avatar"
                                    />
                                </button>
                            </ManagerUser>
                        </>
                    ) : (
                        <>
                            <Tippy content="cài đặt">
                                <div>
                                    <ManagerUser>
                                        <button className={cx('setting')}>
                                            <EllipsisIcon />
                                        </button>
                                    </ManagerUser>
                                </div>
                            </Tippy>

                            <LoginBtn onClick={handleLogin} />
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
