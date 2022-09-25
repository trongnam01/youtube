import React, { useEffect } from 'react';
import { useState } from 'react';
import classNames from 'classnames/bind';
import {
    CoinIcon,
    ConvertUserIcon,
    DataIcon,
    DisplayIcon,
    EnglishIcon,
    FeedbackIcon,
    HelpIcon,
    IsIcon,
    KeyboardIcon,
    LocationIcon,
    OutUSerIcon,
    RightIcon,
    StudioIcon,
    UserIconWrapIcon,
} from '~/Icons';

import styles from './DefaultLayout.module.scss';

import Header from '../component/Header';
import SideBar from '../component/SideBar';
import { useLocation } from 'react-router-dom';
export const ThemDefau = React.createContext();

const cx = classNames.bind(styles);

const MENU_ITEM = [
    [
        {
            icon: <UserIconWrapIcon />,
            title: 'Kênh của bạn',
            to: '/name',
            currentUser: true,
        },
        {
            icon: <StudioIcon />,
            title: 'YouTube Studio',
            to: '/channel',
            currentUser: true,
        },
        {
            icon: <ConvertUserIcon />,
            rightIcon: <RightIcon />,
            title: 'Chuyển đổi tài khoản',
            currentUser: true,
        },
        {
            icon: <OutUSerIcon />,
            title: 'Đăng xuất',
            currentUser: true,
            out: true,
        },
    ],
    [
        {
            icon: <CoinIcon />,
            title: 'Giao dịch mua và gói thành viên',
            to: '/coin',
            currentUser: true,
        },
        {
            icon: <DataIcon />,

            title: 'Dữ liệu của bạn trong YouTube',
            to: '/yourdata',
        },
    ],
    [
        {
            icon: <DisplayIcon />,
            rightIcon: <RightIcon />,
            title: 'Giao diện: Giao diện thiết bị',
        },
        {
            icon: <EnglishIcon />,
            rightIcon: <RightIcon />,
            headerTitle: 'Chọn ngôn ngữ của bạn',
            title: 'Tiếng Việt',
            children: {
                title: 'Language',
                data: [
                    {
                        type: 'language',
                        title: 'English',
                    },
                    {
                        type: 'language',
                        title: 'Tiếng Việt',
                    },
                    {
                        type: 'language',
                        title: 'Українська',
                    },
                    {
                        type: 'language',
                        title: 'Монгол',
                    },
                    {
                        type: 'language',
                        title: 'తెలుగు',
                    },
                    {
                        type: 'language',
                        title: '中文 (繁體)',
                    },
                ],
            },
        },
        {
            icon: <IsIcon />,
            rightIcon: <RightIcon />,
            title: 'Chế độ hạn chế: Đã tắt',
        },
        {
            icon: <LocationIcon />,
            rightIcon: <RightIcon />,
            headerTitle: 'Chọn vị trí của bạn',
            title: 'Việt Nam',
            children: {
                // title: 'Language',
                data: [
                    {
                        type: 'location',
                        title: 'Việt Nam',
                    },
                    {
                        type: 'location',
                        title: 'Ấn Độ',
                    },
                    {
                        type: 'location',
                        title: 'Bồ Đào Nha',
                    },
                    {
                        type: 'location',
                        title: 'Hàn Quốc',
                    },
                ],
            },
        },
        {
            icon: <KeyboardIcon />,
            title: 'Phím tắt',
        },
    ],
    [
        {
            icon: <CoinIcon />,
            title: 'Cài đặt',
            to: '/setting',
        },
    ],
    [
        {
            icon: <HelpIcon />,
            title: 'Trợ giúp',
            to: '/coin',
        },
        {
            icon: <FeedbackIcon />,
            title: 'Gửi phản hồi',
            to: '/coin',
        },
    ],
];

// let list = [{a:1},{a:3},{a:8},{a:7}]
// list = list.sort(() => Math.random() - 0.5)

function DefaultLauout({ children }) {
    const locotion = useLocation();

    const [DataApi, setDataApi] = useState([]);

    const [tongleSideBar, setTongleSideBar] = useState(false);
    const [iscurrentUser, setIsCurrentUser] = useState(false);
    const [itemVideoPlay, setItemVideoPlay] = useState([]);

    useEffect(() => {
        fetch(`https://6290441a27f4ba1c65b64525.mockapi.io/api/video`)
            .then((res) => res.json())
            .then((datas) => {
                setDataApi(datas);
            })
            .catch(() => {
                console.log('lỗi');
            });
    }, []);

    function handleTongleSideBar() {
        setTongleSideBar(!tongleSideBar);
    }

    function handleCurrentUser() {
        setIsCurrentUser(!iscurrentUser);
    }
    function handleSetItemPlayVideo(data) {
        setItemVideoPlay(data);
    }
    // console.log(itemVideoPlay);
    const data = {
        items: MENU_ITEM,
        locotion,
        DataApi,
        tongleSideBar,
        itemVideoPlay,
        currentUser: iscurrentUser,
        handleTongleSideBar,
        handleCurrentUser,
        handleSetItemPlayVideo,
    };

    return (
        <ThemDefau.Provider value={data}>
            <div className={cx('wrapper')}>
                <Header />
                <div className={cx('container')}>
                    <SideBar tongleSideBar={tongleSideBar} />
                    <div
                        className={cx('content')}
                        style={{
                            marginTop: 'var(--height-header)',
                            marginLeft: locotion.pathname.startsWith('/watch/@')
                                ? '0'
                                : !tongleSideBar
                                ? 'var(--width-sideBar-show)'
                                : 'var(--width-sideBar-hide)',
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </ThemDefau.Provider>
    );
}

export default DefaultLauout;
