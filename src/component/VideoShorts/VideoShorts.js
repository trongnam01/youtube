import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import {
    CommentShortIcon,
    LikeShortsIcon,
    NotCareIcon,
    NotLikeShortsIcon,
    NotRecommendIcon,
    NotVoiceShortsIcon,
    PauseIcon,
    PauseShortsIcon,
    PlayShortsIcons,
    ReportIcon,
    ShareIcon,
    ShareShortsIcon,
    VoiceShortsIcon,
} from '~/Icons';
import MenuCard from '../CardVideo/MenuCard';
import Image from '../Image';
import VideoItemsShorts from './component/VideoItemsShorts';
import styles from './VideoShorts.module.scss';

const cx = classNames.bind(styles);
const MENUiTEM = [
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
const MENUACTION = [
    {
        icon: <LikeShortsIcon />,
        content: '',
    },
];
function VideoShorts({ url }) {
    const videoRef = useRef();
    const [isPlay, setIsPlay] = useState(false);
    const [isFollow, setIsFollow] = useState(false);
    const [isVoice, setIsVoice] = useState(true);
    const [isLike, setIsLike] = useState(false);
    const [isNotLike, setisNotLike] = useState(false);

    const classBtnFollow = cx('btn-follow', {
        notFollow: isFollow,
    });
    const classLikeIcons = cx('interactive-content', {
        blue: isLike,
    });
    const classNotLike = cx('interactive-content', {
        blue: isNotLike,
    });

    const handeleIsPlay = () => {
        if (!isPlay) {
            setIsPlay(true);
            videoRef.current.play();
        } else {
            setIsPlay(false);
            videoRef.current.pause();
        }
    };
    const handleIsFollow = (e) => {
        e.stopPropagation();
        setIsFollow(!isFollow);
    };
    const handleVoice = (e) => {
        e.stopPropagation();
        setIsVoice(!isVoice);
    };
    const handleIsAction = (text) => () => {
        if (text === 'like') {
            if (isNotLike) {
                setisNotLike(false);
            }
            setIsLike(!isLike);
        }
        if (text === 'not') {
            if (isLike) {
                setIsLike(false);
            }
            setisNotLike(!isNotLike);
        }
    };
    return (
        <section className={cx('wrapper')}>
            <div className={cx('contai')} onClick={handeleIsPlay}>
                {!isPlay && (
                    <div className={cx('pause-icon-mobi')}>
                        <PauseShortsIcon />
                    </div>
                )}
                <div className={cx('controls')} style={{ visibility: !isPlay ? 'visible' : '' }}>
                    {isPlay ? (
                        <PlayShortsIcons className={cx('icon-controls')} />
                    ) : (
                        <PauseIcon className={cx('icon-controls')} />
                    )}
                    {isVoice ? (
                        <button onClick={handleVoice}>
                            <VoiceShortsIcon className={cx('icon-controls')} />
                        </button>
                    ) : (
                        <button onClick={handleVoice}>
                            <NotVoiceShortsIcon className={cx('icon-controls')} />
                        </button>
                    )}
                </div>
                <VideoItemsShorts ref={videoRef} isVoice={isVoice} url={url} />

                <div className={cx('content-video')}>
                    <h2>Lần đầu biết yêu</h2>
                    <div className={cx('channel')}>
                        <div
                            className={cx('channel-information')}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <Image
                                src={
                                    'https://yt3.ggpht.com/zqJR_h6OK7_dDKT5V6nImv-ryhtBDcW5RubK5UQ58Uvy_hziusfxgCKKT4Wr3GqWplNa5AcLzg=s88-c-k-c0x00ffffff-no-rj'
                                }
                                alt="avatar"
                                className={cx('avatar')}
                            />
                            <span>Nguyễn Khoa Official</span>
                        </div>

                        <button className={classBtnFollow} onClick={handleIsFollow}>
                            {!isFollow ? 'Đăng ký' : 'Đã đăng ký'}
                        </button>
                    </div>
                </div>
            </div>
            <div className={cx('contai-interactive')}>
                <MenuCard zIndex={4} MENUiTEM={MENUiTEM} className={cx('menu-item-shorts')} />

                <div className={cx('frame-content')}>
                    <Tippy content={'Tôi thích video này'}>
                        <section className={classLikeIcons} onClick={handleIsAction('like')}>
                            <LikeShortsIcon className={cx('custom-icons')} />
                            <span>22 N</span>
                        </section>
                    </Tippy>
                    <Tippy content="Tôi không thích video này">
                        <section className={classNotLike} onClick={handleIsAction('not')}>
                            <NotLikeShortsIcon className={cx('custom-icons')} />
                            <span>Không Thích</span>
                        </section>
                    </Tippy>
                    <Tippy content="Bình luận">
                        <section className={cx('interactive-content')}>
                            <CommentShortIcon className={cx('custom-icons')} />
                            <span>222</span>
                        </section>
                    </Tippy>
                    <Tippy content="Chia sẻ">
                        <section className={cx('interactive-content')}>
                            <ShareShortsIcon className={cx('custom-icons')} />
                            <span>Chia sẻ</span>
                        </section>
                    </Tippy>
                    <section className={cx('avatar-user')}>
                        <Image
                            src={
                                'https://yt3.ggpht.com/zqJR_h6OK7_dDKT5V6nImv-ryhtBDcW5RubK5UQ58Uvy_hziusfxgCKKT4Wr3GqWplNa5AcLzg=s88-c-k-c0x00ffffff-no-rj'
                            }
                            alt="avatar"
                        />
                    </section>
                </div>
            </div>
        </section>
    );
}

export default VideoShorts;
