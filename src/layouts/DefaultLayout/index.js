import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Request from '~/api/httpRequest';
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
import Header from '../component/Header';
import SideBar from '../component/SideBar';
import styles from './DefaultLayout.module.scss';

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

// export function getListApi() {
//     return fetch(`https://6290441a27f4ba1c65b64525.mockapi.io/api/video`).then((Response) => Response.json());
// }
function DefaultLauout({ children }) {
    const locotion = useLocation();

    const [DataApi, setDataApi] = useState([]);

    const [tongleSideBar, setTongleSideBar] = useState(false);
    const [iscurrentUser, setIsCurrentUser] = useState(false);
    const [itemVideoPlay, setItemVideoPlay] = useState([]);
    const [resultSearch, setResultSearch] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);
    const [hideItemShorts, sethideItemShorts] = useState(false);

    const classHiden = cx({ hiden: hideItemShorts });

    useEffect(() => {
        const getApi = async () => {
            try {
                const result = await Request.getAll();

                setDataApi(result);
            } catch (error) {
                console.log(error, 'lỗi');
            }
        };
        getApi();
    }, []);
    useEffect(() => {
        const boolean = window.localStorage.getItem('Authorization');
        if (boolean) {
            setIsCurrentUser(true);
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (locotion.pathname.startsWith('/shorts') && width <= 876) {
            sethideItemShorts(true);
        } else {
            sethideItemShorts(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, locotion]);

    function handleTongleSideBar() {
        setTongleSideBar(!tongleSideBar);
    }

    function handleCurrentUser(boolean) {
        setIsCurrentUser(boolean || !iscurrentUser);
    }
    function handleSetItemPlayVideo(data) {
        setItemVideoPlay(data);
    }
    const data = {
        items: MENU_ITEM,
        setResultSearch,
        resultSearch,
        width,
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
                    <SideBar tongleSideBar={tongleSideBar} classHiden={classHiden} />

                    <div
                        className={cx('content')}
                        style={{
                            marginTop: 'var(--height-header)',
                            marginLeft: locotion.pathname.startsWith('/watch/@')
                                ? '0'
                                : width >= 1440
                                ? !tongleSideBar
                                    ? 'var(--width-sideBar-show)'
                                    : 'var(--width-sideBar-hide)'
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
