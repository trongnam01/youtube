import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import {
    CoinIcon,
    ConvertUserIcon,
    CreateVideoIcon,
    DataIcon,
    DisplayIcon,
    EllipsisIcon,
    EnglishIcon,
    FeedbackIcon,
    HelpIcon,
    IsIcon,
    KeyboardIcon,
    LocationIcon,
    MenuIcon,
    NotificationIcon,
    OutUSerIcon,
    RightIcon,
    StudioIcon,
    UserIcon,
    UserIconWrapIcon,
    VoiceIcon,
} from '../../../Icons';
import React from 'react';
import Tippy from '@tippyjs/react';
import MenuHeader from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import styles from './Header.module.scss';
import images from '../../../assets/images';
import Search from '../Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import ManagerUser from '~/component/ManagerUser';

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

                        <ManagerUser items={MENU_ITEM} />
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
