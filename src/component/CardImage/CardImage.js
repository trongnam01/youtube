import classNames from 'classnames/bind';
import MenuCard from '~/component/CardVideo/MenuCard';
import styles from './CardImage.module.scss';
import {
    CrardMenuIcon,
    LaterIcon,
    MenuSaveToListIcon,
    NotCareIcon,
    NotRecommendIcon,
    ReportIcon,
    ShareIcon,
} from '~/Icons';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ThemDefau } from '~/layouts/DefaultLayout';
import Image from '../Image';
import { formatViewCount, handleGetTimeDate, handleGetTimeVideo } from '~/Commonts';
const cx = classNames.bind(styles);

const MENUiTEM = [
    {
        typeo: 'danhSachCho',
        icon: <CrardMenuIcon />,
        title: 'Thêm vào danh sách chờ',
        onClick: true,
    },
    {
        typeo: 'danhXemSau',
        icon: <LaterIcon />,
        title: 'Lưu vào danh sách Xem sau',
        onClick: true,
    },
    {
        typeo: 'DanhSachPhat',
        icon: <MenuSaveToListIcon />,
        title: 'Lưu vào danh sách phát',
        onClick: true,
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

function CrardImage({ item, className, pageNew, register, imageUser, classCustom, registerImg }) {
    const Them = useContext(ThemDefau);

    const handleClickSettting = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    return (
        <Link
            className={cx('wrapper', className, classCustom)}
            to={`/watch/@${item.id}`}
            onClick={() => {
                window.scrollTo(0, 0);
                Them.handleSetItemPlayVideo(item);
            }}
        >
            <div className={cx('wrapper-content-video')}>
                <img className={cx('content-video')} src={item?.snippet?.thumbnails?.standard.url} alt={item.title} />

                <span className={cx('content-time')}>{handleGetTimeVideo(item.contentDetails.duration)}</span>
            </div>
            <div className={cx('wrapper-content-text')}>
                <div className={cx('content-title')}>
                    <div
                    // onClick={handleChangeUserChannel}
                    >
                        <Image className={cx('avatar-user-mobi')} src={item.channelUrl} alt={item.title} />
                    </div>
                    <div className={cx('first')}>
                        <p className={cx('first-title')}>{item?.snippet.title}</p>

                        <span className={cx('first-name')}>{item.snippet.channelTitle}</span>
                        {!registerImg && (
                            <p className={cx(cx('first-Information'))}>
                                <span>{formatViewCount(item.statistics.viewCount)} lượt xem</span>

                                <span>{handleGetTimeDate(item.snippet.publishedAt)}</span>
                            </p>
                        )}

                        {imageUser && (
                            <div className={cx('wrapper-userChanne')}>
                                <img src={item.channelUrl} alt="avatar" />
                                <span>{item.snippet.channelTitle}</span>
                            </div>
                        )}

                        {pageNew && (
                            <p className={cx('infomation')}>
                                {item.title} | Official Music Video Spotify: https://spoti.fi/3SthiUH Apple Music:
                                https://apple.co/3BZzQXu Zing MP3: https://bit.ly/3UJhLV5 Composer: ĐỖ HOÀI...
                            </p>
                        )}
                        {register && (
                            <p className={cx('infomation')}>
                                {item.title} | Laato ke bhoot bato se nhi mante #shorts #trending #viral #youtubeshorts
                                #funny #comedy #ytshorts #shorts #trending #viral #funny #comedy #ytshorts #7seven
                                brothers #chikan vane
                            </p>
                        )}
                        {registerImg && (
                            <img src={item.channelUrl} alt={'avatar'} className={cx('image-register-mobi')} />
                        )}

                        <div className={cx('menu-hide')} onClick={handleClickSettting}>
                            <MenuCard zIndex={4} MENUiTEM={MENUiTEM} itemvideo={item} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default CrardImage;
