import classNames from 'classnames/bind';

import { useCallback, useContext, useRef, useState } from 'react';

import {
    CrardMenuIcon,
    LaterIcon,
    MenuSaveToListIcon,
    NotCareIcon,
    NotRecommendIcon,
    ReportIcon,
    ShareIcon,
} from '~/Icons';
import Image from '../Image';
import MenuCard from './MenuCard';
import { ThemDefau } from '~/layouts/DefaultLayout';
import styles from './CardHome.module.scss';

// import YouTube from 'react-youtube';
const cx = classNames.bind(styles);
const MENUiTEM = [
    {
        icon: <CrardMenuIcon />,
        title: 'Thêm vào danh sách chờ',
    },
    {
        icon: <LaterIcon />,
        title: 'Lưu vào danh sách Xem sau',
    },
    {
        icon: <MenuSaveToListIcon />,
        title: 'Lưu vào danh sách phát',
    },
    {
        icon: <ShareIcon />,
        title: 'Chia sẻ',
    },
    {
        line: true,
        icon: <NotCareIcon />,
        title: 'Không quan tâm',
    },
    {
        icon: <NotRecommendIcon />,
        title: 'Không đề xuất kênh này',
    },
    {
        icon: <ReportIcon />,
        title: 'Báo vi phạm',
    },
];

function CardHome({ dataTongleMEnu }) {
    const Them = useContext(ThemDefau);

    // console.log(isMou);
    const classes = cx('content-btn', { isTongleSideBar: Them.tongleSideBar });

    return (
        <div
            className={cx('wrapper')}
            //  onMouseMove={handleMouContent}
            //  onMouseOut={handleOutContent}
        >
            <div className={cx('wrapper-content-video')}>
                <img
                    className={cx('content-video')}
                    src="https://i.ytimg.com/vi/GXAgdG0JSzA/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLB08-PvXnLmGkpSCELsikBsglfkKQ"
                    alt="a"
                />
                <span className={cx('content-notification')}>Tiếp tục di chuột để phát</span>
                <span className={cx('content-time')}>40:50:00</span>
                <div className={cx('wrapper-scale')}>
                    <div className={cx('wrapper-content-video')}>
                        <img
                            className={cx('content-video')}
                            src="https://i.ytimg.com/vi/GXAgdG0JSzA/hq720.jpg?sqp=-…AFwAcABBg==&rs=AOn4CLB08-PvXnLmGkpSCELsikBsglfkKQ"
                            alt="a"
                        />
                    </div>
                    <div className={cx('wrapper-content-text')}>
                        <div className={cx('content-title')}>
                            <Image
                                src={
                                    'https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/306579689_3330808677201859_6073119947135375035_n.jpg?stp=cp6_dst-jpg_p843x403&_nc_cat=110&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=fYtpdtw2kjwAX8yIUAO&_nc_ht=scontent.fhan2-4.fna&oh=00_AT-V1aUYuJwoKL8sxIgOvZU-0CSysAHeUSM27DPOmwfYYg&oe=63242DF5'
                                }
                                alt={'alt'}
                                className={cx('img-user')}
                            />
                            <div className={cx('first')}>
                                <p className={cx('first-title')}>
                                    Rồi Một Ngày Ngày Anh Quên Đi Chính Em Remix TikTok - Em Là Cố Chấp Duy Nhất Của Đời
                                    Tôi Remix
                                </p>

                                <span className={cx('first-name')}>Nhạc Sàn Pro</span>
                                <p className={cx(cx('first-Information'))}>
                                    <span>152 N lượt xem</span>

                                    <span>13 ngày trước</span>
                                </p>

                                <MenuCard zIndex={10} MENUiTEM={MENUiTEM} />
                            </div>
                        </div>
                        <div className={classes}>
                            <button>
                                <LaterIcon className={cx('icon')} /> Xem sau
                            </button>
                            <button>
                                <CrardMenuIcon className={cx('icon')} /> Thêm vào danh sách chờ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('wrapper-content-text')}>
                <div className={cx('content-title')}>
                    <Image
                        src={
                            'https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/306579689_3330808677201859_6073119947135375035_n.jpg?stp=cp6_dst-jpg_p843x403&_nc_cat=110&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=fYtpdtw2kjwAX8yIUAO&_nc_ht=scontent.fhan2-4.fna&oh=00_AT-V1aUYuJwoKL8sxIgOvZU-0CSysAHeUSM27DPOmwfYYg&oe=63242DF5'
                        }
                        alt={'alt'}
                        className={cx('img-user')}
                    />
                    <div className={cx('first')}>
                        <p className={cx('first-title')}>
                            Rồi Một Ngày Ngày Anh Quên Đi Chính Em Remix TikTok - Em Là Cố Chấp Duy Nhất Của Đời Tôi
                            Remix
                        </p>

                        <span className={cx('first-name')}>Nhạc Sàn Pro</span>
                        <p className={cx(cx('first-Information'))}>
                            <span>152 N lượt xem</span>

                            <span>13 ngày trước</span>
                        </p>

                        <div className={cx('menu-hide')}>
                            <MenuCard zIndex={4} MENUiTEM={MENUiTEM} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardHome;
