import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import Image from '~/component/Image';
import LoginBtn from '~/component/LoginBtn';
import ManagerUser from '~/component/ManagerUser';
import { ThemDefau } from '~/layouts/DefaultLayout';
import images from '../../../assets/images';
import firebase from 'firebase/compat/app';
import {
    CreateVideoIcon,
    EllipsisIcon,
    MenuIcon,
    NotificationIcon,
    SearchIcon,
    UserIcon,
    VoiceIcon,
} from '../../../Icons';
import Request from '~/api/httpRequest';
import Search from '../Search';
import SearchMobile from '../SearchMobile';
import styles from './Header.module.scss';
import { addUser } from '~/redux/userSplice';

const cx = classNames.bind(styles);

function Header() {
    const them = useContext(ThemDefau);
    const { currentUser, handleTongleSideBar, handleCurrentUser, width } = them;
    const [isSearch, setIsSearchMobi] = useState(false);
    const dispatch = useDispatch();
    const refHeader = useRef();

    // get thông tin đăng nhập
    const secletor =
        useSelector((state) => {
            const length = state.user.length;

            return state.user[length - 1];
        }) || {};

    useEffect(() => {
        let prevScrollpos = window.pageYOffset;
        const handeleScroll = () => {
            if (width < 877) {
                let currentScrollPos = window.pageYOffset;
                if (prevScrollpos > currentScrollPos) {
                    refHeader.current.style.top = '0';
                } else {
                    refHeader.current.style.top = '-48px';
                }
                prevScrollpos = currentScrollPos;
            } else {
                refHeader.current.style.top = '0';
            }
        };
        window.addEventListener('scroll', handeleScroll);

        return () => {
            window.removeEventListener('scroll', handeleScroll);
        };
    }, [width]);

    useEffect(() => {
        const id = JSON.parse(window.localStorage.getItem('id'));
        const idTimeout = setTimeout(() => {
            const succes = JSON.parse(window.localStorage.getItem('token'));
            if (succes) {
                const currentUser = firebase.auth().currentUser?.providerData[0];
                const customData = {
                    name: currentUser?.displayName,
                    image: currentUser?.photoURL,
                    email: currentUser?.email,
                };

                dispatch(addUser(customData));
                handleCurrentUser(true);
            }
            clearTimeout(idTimeout);
        }, 1000);

        const fetchData = async () => {
            if (id) {
                try {
                    await Request.getId(id).then((data) => {
                        dispatch(addUser(data));
                    });
                } catch (error) {
                    console.log('lỗi fetch api');
                }
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleShowSearchMobi = () => {
        setIsSearchMobi(!isSearch);
    };

    return (
        <header ref={refHeader} className={cx('wrapper', { wrapperHeader: width < 877 })}>
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
                            src={
                                secletor.image ||
                                'https://scontent.fhan2-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p56x56&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=1Rph2yqJK04AX-m8j8z&_nc_ht=scontent.fhan2-2.fna&oh=00_AT-n9X9vkZyDv847ZcME2tZ_z_-GtKio3Jfp90uSMGVOaQ&oe=63787DF8'
                            }
                            alt="avatar"
                        />
                    ) : (
                        <Link to={'/login'}>
                            <UserIcon className={cx('icon-user-mobile')} />
                        </Link>
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

                            <ManagerUser secletor={secletor}>
                                <button className={cx('user-avatar')}>
                                    <Image
                                        src={
                                            secletor.image ||
                                            'https://scontent.fhan2-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p56x56&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=1Rph2yqJK04AX-m8j8z&_nc_ht=scontent.fhan2-2.fna&oh=00_AT-n9X9vkZyDv847ZcME2tZ_z_-GtKio3Jfp90uSMGVOaQ&oe=63787DF8'
                                        }
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

                            <LoginBtn />
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default React.memo(Header);
