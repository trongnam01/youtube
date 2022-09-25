import classNames from 'classnames/bind';
import { useState, forwardRef } from 'react';
import Image from '~/component/Image';
import { CommentIcons } from '~/Icons';
import Button from '@mui/material/Button';
import styles from './Feedback.module.scss';

const cx = classNames.bind(styles);

function Feedback({ showSubmitBtn, handleISshowSubmit }, ref) {
    const [valueInput, setValueInput] = useState('');

    function handleChangeInput(e) {
        setValueInput(e.target.value);
    }

    const classSubmitBtn = cx('submit-btn', {
        classSubmit: valueInput.length > 0,
    });
    return (
        <div className={cx('contai-comment')} style={{ display: showSubmitBtn ? 'flex' : 'none' }}>
            <Image
                className={cx('user-comment')}
                src="https://scontent.fhan2-1.fna.fbcdn.net/v/t39.30808-6/306139192_1050772128933289_4593751267642396849_n.jpg?stp=dst-jpg_s960x960&_nc_cat=102&ccb=1-7&_nc_sid=730e14&_nc_ohc=dAMX7HmkIOMAX8nREAZ&_nc_ht=scontent.fhan2-1.fna&oh=00_AT_tWfKlfDcxC7YMh80-KX7s3iUbtrI9LQtUQE6bL72f8g&oe=632CD08A"
            />
            <div className={cx('contai-submit')}>
                <div className={cx('frame-input')}>
                    <input
                        ref={ref}
                        value={valueInput}
                        placeholder="Viết bình luận"
                        onChange={handleChangeInput}
                        onFocus={() => {
                            handleISshowSubmit('show');
                        }}
                    />
                </div>
                <div className={cx('comment-active')}>
                    <span className={cx('menu-icons')}>
                        <CommentIcons />
                    </span>
                    <div style={{ display: 'flex' }}>
                        <Button
                            variant="outlined"
                            className={cx('cancel-btn')}
                            onClick={() => handleISshowSubmit('hide')}
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
    );
}

export default forwardRef(Feedback);
