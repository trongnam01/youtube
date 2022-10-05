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

function CrardPlay({ item, className }) {
    const navigate = useNavigate();
    const Them = useContext(ThemDefau);
    const custumTextView = Number.parseInt(item.view);

    const handleClickSettting = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    // const handleChangeUserChannel = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     const custumName = item.idName;
    //     navigate(`/channel/@${custumName}`);
    // };
    return (
        <Link
            className={cx('wrapper', className)}
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
                    <div
                    // onClick={handleChangeUserChannel}
                    >
                        <Image className={cx('avatar-user-mobi')} src={item.channeImage} alt={item.title} />
                    </div>
                    <div className={cx('first')}>
                        <p className={cx('first-title')}>{item.title}</p>

                        <span className={cx('first-name')}>{item.userChannel}</span>
                        <p className={cx(cx('first-Information'))}>
                            <span>{custumTextView} N</span>

                            <span>{item.videoPostingData}</span>
                        </p>

                        <div className={cx('menu-hide')} onClick={handleClickSettting}>
                            <MenuCard zIndex={4} MENUiTEM={MENUiTEM} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default CrardPlay;
