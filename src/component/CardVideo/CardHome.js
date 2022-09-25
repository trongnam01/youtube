import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';

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
import Video from '~/pages/PlayVideo/component/Video';
import { Link } from 'react-router-dom';

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
function CardHome({ item }) {
    const Them = useContext(ThemDefau);
    const [isImage, setIsImage] = useState(true);
    const videoRef = useRef();
    const idTimemou = useRef();
    const custumTextView = Number.parseInt(item.view);

    const handleMOu = () => {
        console.log(videoRef.current);
        setIsImage(false);
        videoRef.current.play();
        videoRef.current.setVolume(0);
        clearTimeout(idTimemou.current);
    };
    const handleMouseOut = () => {
        idTimemou.current = setTimeout(() => {
            setIsImage(true);
            videoRef.current.pause();
        }, 500);
    };
    const handleClickMenu = (e) => {
        e.preventDefault();
    };

    // console.log(isMou);
    const classes = cx('content-btn', { isTongleSideBar: Them.tongleSideBar });
    return (
        <Link
            to={`/watch/@${item.video}`}
            className={cx('wrapper')}
            onClick={() => Them.handleSetItemPlayVideo(item)}
            //  onMouseMove={handleMouContent}
            //  onMouseOut={handleOutContent}
        >
            <div className={cx('wrapper-content-video')}>
                <img className={cx('content-video')} src={item.image} alt={item.title} />

                <span className={cx('content-notification')}>Tiếp tục di chuột để phát</span>
                <span className={cx('content-time')}>{item.videoTime}</span>
                <div className={cx('wrapper-scale')} onMouseOver={handleMOu} onMouseOut={handleMouseOut}>
                    <div className={cx('wrapper-content-video')}>
                        {isImage && <img className={cx('image-video')} src={item.image} alt={item.title} />}
                        <Video className={cx('custum-video')} ref={videoRef} item={item} />
                    </div>
                    <div className={cx('wrapper-content-text')}>
                        <div className={cx('content-title')}>
                            <Image src={item.channeImage} alt={'avata'} className={cx('img-user')} />
                            <div className={cx('first')}>
                                <p className={cx('first-title')}>{item.title}</p>

                                <span className={cx('first-name')}> {item.userChannel}</span>
                                <p className={cx(cx('first-Information'))}>
                                    <span>{custumTextView} N</span>

                                    <span>{item.videoPostingData}</span>
                                </p>
                                <div onClick={handleClickMenu}>
                                    <MenuCard zIndex={10} MENUiTEM={MENUiTEM} />
                                </div>
                            </div>
                        </div>
                        <div className={classes} onClick={handleClickMenu}>
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
                    <Image src={item.channeImage} alt={'avata'} className={cx('img-user')} />
                    <div className={cx('first')}>
                        <p className={cx('first-title')}>{item.title}</p>

                        <span className={cx('first-name')}>{item.userChannel}</span>
                        <p className={cx(cx('first-Information'))}>
                            <span>{custumTextView} N lượt xem</span>

                            <span>{item.videoPostingData}</span>
                        </p>

                        <div className={cx('menu-hide')} onClick={handleClickMenu}>
                            <MenuCard zIndex={4} MENUiTEM={MENUiTEM} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default CardHome;
