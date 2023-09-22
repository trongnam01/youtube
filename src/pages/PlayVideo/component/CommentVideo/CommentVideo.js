import classNames from 'classnames/bind';
import styles from './CommentVideo.module.scss';
import Button from '@mui/material/Button';
import { CommentIcons, MenuCommentIcon } from '~/Icons';
import { Wrapper as PopperWrapper } from '~/component/Popper';
import Tippy from '@tippyjs/react';
import MenuComment from '@tippyjs/react/headless';
import Buttons from '~/component/Buttons';
import Image from '~/component/Image';
import { useState } from 'react';
import ItemComment from '../ItemComment';

const cx = classNames.bind(styles);

function CommentVideo({ videoPlay, dataComments }) {
    const [valueInput, setValueInput] = useState('');
    const [showSubmitBtn, setShowSubmitBtn] = useState(false);
    // console.log(dataComments, 'dataComments');

    function handleChangeInput(e) {
        setValueInput(e.target.value);
    }

    const classSubmitBtn = cx('submit-btn', {
        classSubmit: valueInput.length > 0,
    });

    const handleFormat = (number) => {
        const customNumber = Number(number);

        return customNumber.toLocaleString('vi-VN');
    };

    return (
        <div className={cx('wrapper')} style={{ marginBottom: 30 }}>
            <div className={cx('hide-mobile')} style={{ display: 'flex', alignItems: 'center' }}>
                <span className={cx('comment-qty')}>{handleFormat(videoPlay?.statistics?.commentCount)} bình luận</span>

                <Tippy content={'Sắp xếp bình luận'}>
                    <MenuComment
                        trigger="click"
                        interactive
                        placement="bottom-start"
                        render={(attrs) => (
                            <div className={cx('selector-menu')} tabIndex="-1" {...attrs}>
                                <PopperWrapper className={cx('popperWrapper')}>
                                    <Buttons className={cx('menu-comment-btn')}>Bình luận hàng đầu</Buttons>
                                    <Buttons className={cx('menu-comment-btn')}>Mới nhất xếp trước</Buttons>
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <Button variant="outlined" className={cx('bars-btn')} startIcon={<MenuCommentIcon />}>
                            <span className={cx('title-btn')}>Sắp xếp theo</span>
                        </Button>
                    </MenuComment>
                </Tippy>
            </div>
            <div className={cx('contai-comment')}>
                <Image
                    className={cx('user-comment')}
                    src="https://scontent.fhan2-1.fna.fbcdn.net/v/t39.30808-6/306139192_1050772128933289_4593751267642396849_n.jpg?stp=dst-jpg_s960x960&_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=dAMX7HmkIOMAX8nREAZ&_nc_ht=scontent.fhan2-1.fna&oh=00_AT_tWfKlfDcxC7YMh80-KX7s3iUbtrI9LQtUQE6bL72f8g&oe=632CD08A"
                />
                <div className={cx('contai-submit')}>
                    <div className={cx('frame-input')}>
                        <input
                            value={valueInput}
                            placeholder="Viết bình luận"
                            onChange={handleChangeInput}
                            onFocus={() => {
                                setShowSubmitBtn(true);
                            }}
                        />
                    </div>
                    <div className={cx('comment-active')} style={{ display: showSubmitBtn ? 'flex' : 'none' }}>
                        <span className={cx('menu-icons')}>
                            <CommentIcons />
                        </span>
                        <div style={{ display: 'flex' }}>
                            <Button
                                variant="outlined"
                                className={cx('cancel-btn')}
                                onClick={() => setShowSubmitBtn(false)}
                            >
                                <span className={cx('cancel-title')}>Hủy</span>
                            </Button>
                            <Button variant="outlined" className={classSubmitBtn}>
                                <span className={cx('submit-title')}>Bình Luận</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('item-comments')}>
                {dataComments.length > 0 &&
                    dataComments.map((element, index) => <ItemComment key={index} item={element}></ItemComment>)}
            </div>
        </div>
    );
}

export default CommentVideo;
