/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { TeamOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { addUser } from '~/redux/userSplice';
import { Pathname } from './constants';

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

function DefaultLauout({ children }) {
    const dispatch = useDispatch();
    const locotion = useLocation();
    const secletor = useSelector((state) => state.dataUser);
    const dataAccount = useSelector((state) => {
        const length = state.user.length;
        return state.user[length - 1];
    });
    const navigate = useNavigate();

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
    const [messageApi, contextMessage] = message.useMessage();
    const refPageToken = useRef('');

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

    // set menu header
    useEffect(() => {
        if (iscurrentUser && dataAccount?.admin) {
            const COPPY_MENU_ITEM = [...MENU_ITEM];

            const pushMenu = [];

            pushMenu.push({
                icon: <DataIcon />,
                isClick: true,
                title: 'Quản Trị Video',
                to: '/quanTriVideo',
            });

            // đk check quyền được sửa

            pushMenu.push({
                icon: <TeamOutlined style={{ fontSize: '18px', padding: '4px' }} />,
                isClick: true,
                title: 'Quản Lý Tài Khoản',
                to: '/quanLyTaiKhoan',
            });

            if (pushMenu.length > 0) {
                COPPY_MENU_ITEM.splice(1, 0, pushMenu);

                setMenuHeader(COPPY_MENU_ITEM);
            }
        } else {
            setMenuHeader(MENU_ITEM);
            if (dataAccount) {
                //khi đã login
                handlePathNameVerify('verify');
            }
        }
    }, [iscurrentUser, dataAccount]);

    // login tài khoản
    useEffect(() => {
        refIndex.current = refIndex.current + 1;
        if (refIndex.current === 1) {
            const getApi = async () => {
                try {
                    // handleLoadAllVideo();

                    setIsPut(true);

                    const succes = JSON.parse(window.localStorage.getItem('token')); // get firebase

                    if (succes) {
                        firebase.auth().onAuthStateChanged(function (user) {
                            if (user) {
                                // Người dùng đã đăng nhập, bạn có thể truy cập thông tin của người dùng từ user
                                let customData = {
                                    name: user?.displayName,
                                    image: user?.photoURL,
                                    google: user?.email,
                                    admin: false,
                                    isUpdate: false,
                                };

                                dispatch(addUser(customData));
                                handleCurrentUser(true);
                                handleLoginFirebase(customData);
                            } else {
                                // Không có người dùng đăng nhập
                                // messageApi.open({
                                //     type: 'error',
                                //     className: 'messageErrorr',
                                //     content: 'Không có người dùng đăng nhập!',
                                // });
                            }
                        });

                        const handleLoginFirebase = async (customData) => {
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
                                // them cai khoan
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
                                    Request.postdataUser(datasUser); // thêm data người dùng
                                });
                            }
                        };
                        // Request.getdataUser(customData).then((data) => {
                    }
                } catch (error) {
                    messageApi.open({
                        type: 'error',
                        className: 'messageErrorr',
                        content: 'Lỗi',
                    });
                }
            };

            // login lần đầu từ fire base chờ set token
            const ID_TIME = setTimeout(() => {
                getApi();
                clearTimeout(ID_TIME);
            }, 1000);
        }

        // xử lý với tài khoản được đăng ký
        const boolean = window.localStorage.getItem('Authorization'); // get khi tài khoản được đăng ký
        if (boolean) {
            setIsCurrentUser(true);
            const getDataUser = async () => {
                try {
                    const id = JSON.parse(window.localStorage.getItem('id'));

                    if (id) {
                        const result = await Request.getdataUser(Number(id));
                        await Request.getId(id).then((data) => {
                            dispatch(addUser(data));
                        });
                        dispatch(getinitialState(result));
                    }
                } catch (error) {
                    messageApi.open({
                        type: 'error',
                        className: 'messageErrorr',
                        content: 'Lỗi đăng nhập',
                    });
                }
            };
            getDataUser();
        } else {
            handlePathNameVerify('reload');
            if (width <= 768) {
                navigate('/');
            }
        }
    }, []);

    // quay lại trang chủ khi out account khi đang ở page phân quyền
    const handlePathNameVerify = (type) => {
        const getPath = window.location.pathname;
        var resultFilter = Pathname.filter((el) => el === getPath);

        switch (type) {
            case 'reload':
                if (resultFilter.length > 0) {
                    navigate('/');
                }
                break;
            case 'verify': // phân quyền
                if (!dataAccount?.admin) {
                    navigate('/');
                }
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);

            if (window.innerWidth <= 768) {
                navigate('/');
            }
        };
        window.scrollTo(0, 0);
        window.addEventListener('resize', handleResize);

        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        };

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

    const handleLoadAllVideo = async function name(size = 12) {
        setisLoading(true);
        try {
            const getChannelIcon = async (element) => {
                const channelUrl = await Request.getdataChannelID(element.snippet.channelId);
                element.channelUrl = channelUrl.data.items[0].snippet.thumbnails.default.url;
            };

            // if (!refPageToken.current && DataApi.length > 0) {
            //     // khi đã get hết video
            //     setisLoading(false);
            //     return;
            // }

            const result = await Request.getdataApiYoutube(refPageToken.current, size).then((res) => {
                setisLoading(false);

                refPageToken.current = res.data.nextPageToken;

                res.data.items.forEach((element) => {
                    getChannelIcon(element, element.snippet.channelId);
                });
                return res.data.items || [];
            });

            setDataApi((res) => [...res, ...result]);
        } catch (error) {
            setisLoading(false);

            console.log(error, 'error');
        }
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
        messageApi,
        setDataApi,
        refPageToken,
    };

    return (
        <ThemDefau.Provider value={data}>
            <div className={cx('wrapper')}>
                {contextMessage}
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
