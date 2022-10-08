import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import { MenuIcon } from '~/Icons';
import ChannelSubscribe from '../ChannelSubscribe';
import Entertainment from '../Entertainment';
import PagesSideBar from '../PagesSideBar';
import ServiceYoutube from '../ServiceYoutube';
import SupportSideBar from '../SupportSideBar/SupportSideBar';

import styles from './MenuSideBar.module.scss';
import { ThemDefau } from '~/layouts/DefaultLayout';
import { useContext } from 'react';
import LoginBtn from '~/component/LoginBtn';

const cx = classNames.bind(styles);

const itemsfooterSideBar = [
    [
        {
            title: 'Giới thiệu',
            to: '.about',
        },
        {
            title: 'Báo chí',
            to: '.about',
        },
        {
            title: 'Bản quyền',
            to: '.about',
        },
        {
            title: 'Liên hệ với chúng tôi',
            to: '.about',
        },
        {
            title: 'Người sáng tạo',
            to: '.about',
        },
        {
            title: 'Quảng cáo',
            to: '.about',
        },
        {
            title: 'Nhà phát triển',
            to: '.about',
        },
    ],
    [
        {
            title: 'Điều khoản',
            to: '.about',
        },
        {
            title: 'Quyền riêng tư',
            to: '.about',
        },
        {
            title: 'Chính sách và an toàn',
            to: '.about',
        },
        {
            title: 'Cách YouTube hoạt động',
            to: '.about',
        },
        {
            title: 'Thử các tính năng mới',
            to: '.about',
        },
    ],
];

function MenuSideBar({ data }) {
    const ThemCurren = useContext(ThemDefau);
    const isCurren = ThemCurren.currentUser;
    const handleHideSideBar = (e) => {
        e.stopPropagation();
    };

    return (
        <div className={cx('wrapper-sideBar')} onClick={handleHideSideBar}>
            <div className={cx('header-left')}>
                <button className={cx('menu-btn')} onClick={ThemCurren.handleTongleSideBar}>
                    <MenuIcon />
                </button>
                <Link to="/">
                    <div className={cx('logo-contai')}>
                        <img src={images.logo} alt="logo" />
                        <span>VN</span>
                    </div>
                </Link>
            </div>
            <div className={cx('wrapper-sideBar-2')}>
                <div className={cx('wrapper-sideBar-children')}>
                    <PagesSideBar data={data} isCurren={isCurren} />
                    {isCurren && <ChannelSubscribe />}
                    {!isCurren && (
                        <div className={cx('login-sideBar')}>
                            <p>Hãy đăng nhập để thích video, bình luận và đăng ký kênh.</p>
                            <LoginBtn classBtn={true} />
                        </div>
                    )}

                    <Entertainment />
                    <ServiceYoutube />
                    <SupportSideBar />
                    <div className={cx('footer-sidebar')}>
                        <div className={cx('container-content')}>
                            {itemsfooterSideBar.map((items, indexs) => {
                                return (
                                    <div key={indexs} className={cx('content')}>
                                        {items.map((item, index) => {
                                            return (
                                                <Link key={index} to={item.to} className={cx('text-content')}>
                                                    {item.title}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                            <p className={cx('copyright')}>© 2022 Google LLC</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuSideBar;
