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

function CrardPlay() {
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
                <span className={cx('content-time')}>40:50:00</span>
            </div>
            <div className={cx('wrapper-content-text')}>
                <div className={cx('content-title')}>
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

export default CrardPlay;
