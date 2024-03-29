import Menusetting from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import Image from '~/component/Image';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import { EllipsisIcon, LikeActiveIcon, LikeIcon, NotLikeActiveIcon, NotLikeIcon, ReportIcon } from '~/Icons';
import styles from './ItemCommnet.module.scss';
import { useRef, useState } from 'react';
import Feedback from '../Feedback';
import Buttons from '~/component/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const fontIcons = {
    width: '1.6rem',
    height: '1.6rem',
};

const cx = classNames.bind(styles);

function ItemCommnet() {
    const [isLikeComment, setIsLikeComment] = useState(false);
    const [isNotLikeComment, setIsNotLikeComment] = useState(false);
    const [showSubmitBtn, setShowSubmitBtn] = useState(false);
    const inputRef = useRef();
    function handleISshowSubmit(text) {
        if (text === 'show') {
            setShowSubmitBtn(true);
            const idTimeout = setTimeout(() => {
                inputRef.current.focus();
                clearTimeout(idTimeout);
            }, 50);
        }
        if (text === 'hide') {
            setShowSubmitBtn(false);
        }
    }

    const handleClickIsLike = (text) => () => {
        if (text === 'like') {
            if (isNotLikeComment) {
                setIsNotLikeComment(!isNotLikeComment);
            }
            setIsLikeComment(!isLikeComment);
        }
        if (text === 'notlike') {
            if (isLikeComment) {
                setIsLikeComment(!isLikeComment);
            }
            setIsNotLikeComment(!isNotLikeComment);
        }
    };
    return (
        <div className={cx('wraper')}>
            <Image
                className={cx('user-comment')}
                src="https://scontent.fhan2-1.fna.fbcdn.net/v/t39.30808-6/306139192_1050772128933289_4593751267642396849_n.jpg?stp=dst-jpg_s960x960&_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=dAMX7HmkIOMAX8nREAZ&_nc_ht=scontent.fhan2-1.fna&oh=00_AT_tWfKlfDcxC7YMh80-KX7s3iUbtrI9LQtUQE6bL72f8g&oe=632CD08A"
            />
            <div className={cx('contai-content')}>
                <div className={cx('content-information')}>
                    <h3>Trần Phúc Thuận</h3>
                    <span>1 tháng trước</span>
                </div>
                <p className={cx('comment-content')}>bài đầu của madihu b ey </p>
                <div className={cx('interaction')}>
                    <Tippy content={isLikeComment ? 'Bỏ thích' : 'Tôi thích video này'}>
                        <div className={cx('frame-icon')} onClick={handleClickIsLike('like')}>
                            <button>
                                {isLikeComment ? <LikeActiveIcon {...fontIcons} /> : <LikeIcon {...fontIcons} />}
                            </button>
                        </div>
                    </Tippy>
                    <span></span>
                    <Tippy content={isNotLikeComment ? 'Bỏ không thích' : 'Tôi không video này'}>
                        <div className={cx('frame-icon')} onClick={handleClickIsLike('notlike')}>
                            <button>
                                {isNotLikeComment ? (
                                    <NotLikeActiveIcon {...fontIcons} />
                                ) : (
                                    <NotLikeIcon {...fontIcons} />
                                )}
                            </button>
                        </div>
                    </Tippy>

                    <span className={cx('feedback-commnet')} onClick={() => handleISshowSubmit('show')}>
                        Phản hồi
                    </span>
                </div>

                <Feedback ref={inputRef} showSubmitBtn={showSubmitBtn} handleISshowSubmit={handleISshowSubmit} />
            </div>
            <div>
                <Menusetting
                    trigger="click"
                    interactive
                    placement="bottom-start"
                    render={(attrs) => (
                        <div className={cx('comment-setting')} tabIndex="-1" {...attrs}>
                            <PopperWrapper className={cx('wrapper-comment-setting')}>
                                <Buttons
                                    className={cx('menu-card-btn')}
                                    LeftIcon={<FontAwesomeIcon icon={faTrashCan} />}
                                    classIconsLeft={cx('left-icon')}
                                >
                                    Xóa
                                </Buttons>
                                <Buttons
                                    className={cx('menu-card-btn')}
                                    LeftIcon={<FontAwesomeIcon icon={faPen} />}
                                    classIconsLeft={cx('left-icon')}
                                >
                                    Chỉnh sửa
                                </Buttons>
                                <Buttons className={cx('menu-card-btn')} LeftIcon={<ReportIcon />}>
                                    Báo cáo vi phạm
                                </Buttons>
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <button className={cx('comment-setting-btn')}>
                        <EllipsisIcon />
                    </button>
                </Menusetting>
            </div>
        </div>
    );
}

export default ItemCommnet;
