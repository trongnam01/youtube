import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import Header from '../component/Header';
import SideBar from '../component/SideBar';
import styles from './DefaultLayout.module.scss';
import { getinitialState } from '~/redux/dataUserSplice';
import firebase from 'firebase/compat/app';
import Loading from '~/component/Loading';

export const ThemDefau = React.createContext();

const cx = classNames.bind(styles);

const MENU_ITEM = [
    [
        {
            icon: <UserIconWrapIcon />,
            title: 'Kênh của bạn',
            to: '/name',
            currentUser: true,
            type: 'KENH_CUA_BAN',
            // isClick: true,
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
    const dispatch = useDispatch();
    const locotion = useLocation();
    const secletor = useSelector((state) => state.dataUser);

    const [DataApi, setDataApi] = useState([]);
    const [menuHeader, setMenuHeader] = useState(MENU_ITEM); // menu khi đang nhập thành công

    const [tongleSideBar, setTongleSideBar] = useState(false);
    const [iscurrentUser, setIsCurrentUser] = useState(false);
    const [isPut, setIsPut] = useState(false);
    const [itemVideoPlay, setItemVideoPlay] = useState([]);
    const [resultSearch, setResultSearch] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);
    const [hideItemShorts, sethideItemShorts] = useState(false);
    const refIndex = useRef(0);
    const [isLoading, setisLoading] = useState(false);

    const classHiden = cx({ hiden: hideItemShorts });

    useEffect(() => {
        let idSetTime;
        if (isPut && iscurrentUser) {
            idSetTime = setTimeout(() => {
                Request.putdataUser(secletor.id, secletor);
            }, 100);
        }
        return () => {
            clearTimeout(idSetTime);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [secletor]);

    useEffect(() => {
        if (iscurrentUser) {
            const cusMenuheader = [...MENU_ITEM];

            cusMenuheader[0].push({
                icon: <DataIcon />,
                isClick: true,
                title: 'Quản Trị Video',
                to: '/quanTriVideo',
            });

            setMenuHeader(cusMenuheader);
            // console.log(
            //     cusMenuheader[0].push({
            //         icon: <DataIcon />,

            //         title: 'Quản Trị Video',
            //         to: '/quanTriVideo',
            //     }),
            //     'iscurrentUser',
            // );
        } else {
            setMenuHeader(MENU_ITEM);
        }
    }, [iscurrentUser]);

    useEffect(() => {
        refIndex.current = refIndex.current + 1;
        if (refIndex.current === 1) {
            const getApi = async () => {
                try {
                    handleLoadAllVideo();

                    setIsPut(true);

                    const succes = JSON.parse(window.localStorage.getItem('token'));
                    if (succes) {
                        const currentUser = firebase.auth().currentUser?.providerData[0];
                        const customData = {
                            name: currentUser?.displayName,
                            image: currentUser?.photoURL,
                            google: currentUser?.email,
                            admin: false,
                        };
                        const res = await Request.getAllUser().then((datas) => {
                            return datas.find((data) => {
                                return data.google === customData.google;
                            });
                        });
                        if (res) {
                            Request.getdataUser(res.id).then((data) => {
                                dispatch(getinitialState(data));
                            });
                        } else {
                            Request.post(customData).then((data) => {
                                const datasUser = {
                                    id: data.id,
                                    google: data.google,
                                    data: {
                                        watched: [],
                                        whatLaster: [],
                                        videoUser: [],
                                        like: [],
                                        movie: [],
                                        listPlay: [],
                                        notLike: [],
                                        subscribedChanel: [],
                                    },
                                };
                                dispatch(getinitialState(datasUser));
                                Request.postdataUser(datasUser);
                            });
                        }
                        console.log(6);
                        // Request.getdataUser(customData).then((data) => {
                    }
                } catch (error) {
                    console.log(error, 'lỗi');
                }
            };
            getApi();
        }
    }, []);
    useEffect(() => {
        const boolean = window.localStorage.getItem('Authorization');
        if (boolean) {
            setIsCurrentUser(true);
            const getDataUser = async () => {
                try {
                    const id = JSON.parse(window.localStorage.getItem('id'));

                    if (id) {
                        const result = await Request.getdataUser(Number(id));
                        dispatch(getinitialState(result));
                    }
                } catch (error) {
                    console.log(error, 'lỗi');
                }
            };
            getDataUser();
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

    const handleLoadAllVideo = async function name() {
        setisLoading(true);
        const result = await Request.getAll().then((res) => {
            setisLoading(false);

            return res;
        });
        setDataApi(result);
    };

    const data = {
        items: menuHeader,
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
        handleLoadAllVideo,
        setisLoading,
    };

    return (
        <ThemDefau.Provider value={data}>
            <div className={cx('wrapper')}>
                <Loading isLoading={isLoading} />
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
