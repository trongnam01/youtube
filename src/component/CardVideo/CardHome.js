import { useContext, useState } from 'react';
import classNames from 'classnames/bind';

import {
    CrardMenuIcon,
    EllipsisIcon,
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
import Video from '~/component/Video';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { formatViewCount, handleGetTimeDate, handleGetTimeVideo } from '~/Commonts';

// import YouTube from 'react-youtube';
const cx = classNames.bind(styles);
const MENUiTEM = [
    {
        icon: <CrardMenuIcon />,
        title: 'Thêm vào danh sách chờ',
    },
    { typeo: 'danhXemSau', icon: <LaterIcon />, title: 'Lưu vào danh sách Xem sau', onClick: true },
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
const opts = {
    playerVars: {
        autoplay: 1,
        // mute: 1,
    },
};
function CardHome({ item }) {
    const Them = useContext(ThemDefau);
    const [showCard, setShowCard] = useState(false);
    const navigate = useNavigate();
    const custumTextView = Number.parseInt(item.view);

    const handleClickMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    function handleMOuWraperCrard(e) {
        setShowCard(true);
    }
    function handleOutWraperCrard() {
        setShowCard(false);
    }

    const handleChangeUserChannel = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const custumName = item.idName;
        navigate(`/channel/@${custumName}`);
    };
    const classes = cx('content-btn', { isTongleSideBar: Them.tongleSideBar });

    return (
        <Link
            as={'span'}
            to={`/watch/@${item.id}`}
            className={cx('wrapper')}
            onClick={() => Them.handleSetItemPlayVideo(item)}
        >
            <div
                className={cx('wrapper-content-video')}
                onMouseEnter={handleMOuWraperCrard}
                onMouseLeave={handleOutWraperCrard}
            >
                <img
                    className={cx('content-video')}
                    src={item?.snippet?.thumbnails?.standard.url}
                    alt={item?.snippet.title}
                />

                <span className={cx('content-notification')}>Tiếp tục di chuột để phát</span>
                <span className={cx('content-time')}>{handleGetTimeVideo(item.contentDetails.duration)}</span>
                <div
                    className={cx('wrapper-scale')}
                    //  onMouseOver={handleMOu} onMouseOut={handleMouseOut}
                >
                    <div className={cx('wrapper-content-video')}>
                        {showCard && <Video className={cx('custum-video')} item={item} opts={opts} />}
                    </div>
                    <div className={cx('wrapper-content-text')}>
                        <div className={cx('content-title')}>
                            <div onClick={handleChangeUserChannel}>
                                <Image src={item.channelUrl} alt={'avata'} className={cx('img-user')} />
                            </div>
                            <div className={cx('first')}>
                                <p className={cx('first-title')}>{item?.snippet.title}</p>

                                <span className={cx('first-name')}> {item.snippet.channelTitle}</span>
                                <p className={cx('first-Information')}>
                                    <span>{formatViewCount(item.statistics.viewCount)} lượt xem</span>

                                    <span>{handleGetTimeDate(item.snippet.publishedAt)}</span>
                                </p>
                                <div>
                                    <button className={cx('setting')} onClick={handleClickMenu}>
                                        <EllipsisIcon />
                                    </button>
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
                    <div onClick={handleChangeUserChannel} className={cx('img-user-wrapper')}>
                        <Image src={item.channelUrl} alt={' '} className={cx('img-user')} />
                    </div>

                    <div className={cx('first')}>
                        <p className={cx('first-title')}>{item?.snippet.title}</p>

                        <span className={cx('first-name')}>{item.snippet.channelTitle}</span>
                        <p className={cx(cx('first-Information'))}>
                            <span>{formatViewCount(item.statistics.viewCount)} lượt xem</span>

                            <span>{handleGetTimeDate(item.snippet.publishedAt)}</span>
                        </p>

                        <div className={cx('menu-hide')}>
                            <MenuCard zIndex={4} MENUiTEM={MENUiTEM} onClick={handleClickMenu} itemvideo={item} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default CardHome;
