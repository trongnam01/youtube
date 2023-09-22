import Tippy from '@tippyjs/react';
import Menusetting from '@tippyjs/react/headless';
import 'antd/dist/antd.css';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Buttons from '~/component/Buttons';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import {
    CoppyIcon,
    CutVideoIcon,
    EllipsisIcon,
    LikeActiveIcon,
    LikeIcon,
    MenuSaveToListIcon,
    NotLikeActiveIcon,
    NotLikeIcon,
    ReportIcon,
    ShareIcon,
} from '~/Icons';
import { addLike, addNotLike, removeLike, removeNotLike } from '~/redux/dataUserSplice';

import styles from '../../PlayVideo.module.scss';
import '../../PlayVideo.scss';
import { formatViewCount } from '~/Commonts';

const cx = classNames.bind(styles);

function ActionVideo({ videoPlay }) {
    const [isLike, setIsLike] = useState(false);
    const [isNotLike, setIsNotLike] = useState(false);
    const dispatch = useDispatch();

    const secletor = useSelector((state) => state.dataUser);
    useEffect(() => {
        const dataLike = secletor.data.like;
        const dataNotLike = secletor.data.notLike;

        const isLikes = dataLike.find((element) => element.id === videoPlay.id);
        const isNotLikes = dataNotLike.find((element) => element.id === videoPlay.id);
        setIsLike(!!isLikes);
        setIsNotLike(!!isNotLikes);
    }, [secletor]);

    const handleClickIsLike = (text) => () => {
        if (text === 'like') {
            if (isNotLike) {
                setIsNotLike(!isNotLike);
                dispatch(removeNotLike(videoPlay.id));
            }
            setIsLike(!isLike);
            if (!isLike) {
                dispatch(addLike(videoPlay));
            } else {
                dispatch(removeLike(videoPlay.id));
            }
        }
        if (text === 'notlike') {
            if (isLike) {
                setIsLike(!isLike);
                dispatch(removeLike(videoPlay.id));
            }

            setIsNotLike(!isNotLike);
            if (!isNotLike) {
                dispatch(addNotLike(videoPlay));
            } else {
                dispatch(removeNotLike(videoPlay.id));
            }
        }
    };

    return (
        <div className={cx('contai-active')}>
            <Tippy content={isLike ? 'Bỏ thích' : 'Tôi thích video này'}>
                <div className={cx('frame')} onClick={handleClickIsLike('like')}>
                    <button>{isLike ? <LikeActiveIcon /> : <LikeIcon />}</button>
                    <span>{formatViewCount(videoPlay?.statistics?.likeCount)}</span>
                </div>
            </Tippy>
            <Tippy content={isNotLike ? 'Bỏ không thích' : 'Tôi không video này'}>
                <div className={cx('frame')} onClick={handleClickIsLike('notlike')}>
                    <button>{isNotLike ? <NotLikeActiveIcon /> : <NotLikeIcon />}</button>
                    <span>Không thích</span>
                </div>
            </Tippy>
            <Tippy content="Chia sẻ">
                <div className={cx('frame')}>
                    <button>
                        <ShareIcon />
                    </button>
                    <span>Chia sẻ</span>
                </div>
            </Tippy>
            <Tippy content="Tạo đoạn video">
                <div className={cx('frame')}>
                    <button>
                        <CutVideoIcon />
                    </button>
                    <span>Tạo đoạn video</span>
                </div>
            </Tippy>
            <Tippy content="Lưu">
                <div className={cx('frame')}>
                    <button>
                        <MenuSaveToListIcon />
                    </button>
                    <span>lưu</span>
                </div>
            </Tippy>
            <Menusetting
                trigger="click"
                interactive
                placement="bottom-start"
                render={(attrs) => (
                    <div className={cx('MenuCard')} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('wrapper-MenuCard')}>
                            <Buttons className={cx('menu-card-btn')} LeftIcon={<ReportIcon />}>
                                Báo cáo vi phạm
                            </Buttons>
                            <Buttons className={cx('menu-card-btn')} LeftIcon={<CoppyIcon />}>
                                Hiện bản chép lời
                            </Buttons>
                        </PopperWrapper>
                    </div>
                )}
            >
                <button className={cx('setting')}>
                    <EllipsisIcon />
                </button>
            </Menusetting>
        </div>
    );
}

export default ActionVideo;
