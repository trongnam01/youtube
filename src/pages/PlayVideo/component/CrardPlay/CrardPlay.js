import classNames from 'classnames/bind';
import MenuCard from '~/component/CardVideo/MenuCard';
import Image from '~/component/Image';
import styles from './CrardPlay.module.scss';
import {
    CrardMenuIcon,
    LaterIcon,
    MenuSaveToListIcon,
    NotCareIcon,
    NotRecommendIcon,
    ReportIcon,
    ShareIcon,
} from '~/Icons';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemDefau } from '~/layouts/DefaultLayout';
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

function CrardPlay({ item }) {
    const Them = useContext(ThemDefau);
    return (
        <Link
            className={cx('wrapper')}
            to={`/watch/@${item.video}`}
            onClick={() => {
                window.scrollTo(0, 0);
                Them.handleSetItemPlayVideo(item);
            }}
            //  onMouseMove={handleMouContent}
            //  onMouseOut={handleOutContent}
        >
            <div className={cx('wrapper-content-video')}>
                <img className={cx('content-video')} src={item.image} alt={item.title} />

                <span className={cx('content-time')}>{item.videoTime}</span>
            </div>
            <div className={cx('wrapper-content-text')}>
                <div className={cx('content-title')}>
                    <div className={cx('first')}>
                        <p className={cx('first-title')}>{item.title}</p>

                        <span className={cx('first-name')}>{item.userChannel}</span>
                        <p className={cx(cx('first-Information'))}>
                            <span>{item.view}</span>

                            <span>{item.videoPostingData}</span>
                        </p>

                        <div className={cx('menu-hide')}>
                            <MenuCard zIndex={4} MENUiTEM={MENUiTEM} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default CrardPlay;
