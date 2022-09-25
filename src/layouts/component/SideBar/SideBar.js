import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import {
    HomeActiveIcon,
    HomeIcon,
    LaterActiveIcon,
    LaterIcon,
    LibraryActiveIcon,
    LibraryIcon,
    LikeActiveIcon,
    LikeIcon,
    NewActiveIcon,
    NewIcon,
    RegisterActiveIcon,
    RegisterIcon,
    ShortsActiveIcon,
    ShortsIcon,
    VideoUserIcon,
    WatchedActiveIcon,
    WatchedIcon,
} from '~/Icons';
import HideSideBar from '../HideSideBar';
import MenuSideBar from '../MenuSideBar';
import { useLocation } from 'react-router-dom';
import { ThemDefau } from '~/layouts/DefaultLayout';

import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

const MENU_ITEM_SIDEBAR = [
    [
        {
            icon: <HomeIcon />,
            iconActive: <HomeActiveIcon />,
            title: 'Trang chủ',
            to: '/',
            currentUser: true,
            isSideBar: true,
        },
        {
            icon: <NewIcon />,
            iconActive: <NewActiveIcon />,
            title: 'Khám phá',
            to: '/new',
            currentUser: true,
            isSideBar: true,
        },
        {
            icon: <ShortsIcon />,
            iconActive: <ShortsActiveIcon />,
            title: 'Shorts',
            to: '/shorts',
            currentUser: true,
            isSideBar: true,
        },
        {
            icon: <RegisterIcon />,
            iconActive: <RegisterActiveIcon />,
            title: 'Kênh đăng ký',
            to: '/register',
            currentUser: true,
            isSideBar: true,
        },
    ],
    [
        {
            icon: <LibraryIcon />,
            iconActive: <LibraryActiveIcon />,
            title: 'Thư viện',
            to: '/library',
            currentUser: true,
            isSideBar: true,
        },
        {
            icon: <WatchedIcon />,
            iconActive: <WatchedActiveIcon />,
            title: 'Video đã xem',
            to: '/watched',
            currentUser: true,
        },
        {
            icon: <VideoUserIcon />,
            title: 'Video của bạn',
            to: '/videoUser',
        },
        {
            icon: <LaterIcon />,
            iconActive: <LaterActiveIcon />,
            title: 'Xem sau',
            to: '/last',
        },
        {
            icon: <LikeIcon />,
            iconActive: <LikeActiveIcon />,
            title: 'Video đã thích',
            to: '/likeVideo',
        },
    ],
];

function SideBar({ tongleSideBar }) {
    const ThemCurren = useContext(ThemDefau);
    const [isModeSideBar, setIsModeSideBar] = useState(false);

    useEffect(() => {
        if (ThemCurren.locotion.pathname.startsWith('/watch/@')) {
            setIsModeSideBar(true);
        } else {
            setIsModeSideBar(false);
        }
        if (tongleSideBar && isModeSideBar) {
            document.querySelector('body').style.overflow = 'hidden';
        } else {
            document.querySelector('body').style.overflow = 'auto';
        }
    }, [tongleSideBar, ThemCurren.locotion.pathname, isModeSideBar]);

    const classes = cx({
        hideSideBar: tongleSideBar,
        showSideBar: !tongleSideBar,
    });
    const classSideBarPlay = cx('wrappe-sidebar-play', {
        ShowSidebarPlay: tongleSideBar,
    });

    return (
        <>
            {ThemCurren.locotion.pathname.startsWith('/watch/@') ? (
                <>
                    <div
                        className={cx('wrappe-playCrad')}
                        style={{ visibility: tongleSideBar ? 'visible' : 'hidden' }}
                        onClick={ThemCurren.handleTongleSideBar}
                    >
                        <div className={classSideBarPlay}>
                            <MenuSideBar data={MENU_ITEM_SIDEBAR} />
                        </div>
                    </div>
                </>
            ) : (
                <div className={cx(classes)}>
                    {!tongleSideBar && <MenuSideBar data={MENU_ITEM_SIDEBAR} />}
                    {tongleSideBar && <HideSideBar data={MENU_ITEM_SIDEBAR} />}
                </div>
            )}
        </>
    );
}

export default SideBar;
