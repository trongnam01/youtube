import { UserIcon } from '~/Icons';
import classNames from 'classnames/bind';
import styles from './LoginBtn.module.scss';
import './LoginBtn.scss';

import Button from '@mui/material/Button';

const cx = classNames.bind(styles);
function LoginBtn({ classBtn, onClick }) {
    const classes = cx('login-btn', {
        classBtn: classBtn,
    });
    return (
        <div className={cx('wrapper', cx('wrapper-LoginBtn'))}>
            <Button
                variant="outlined"
                className={classes}
                startIcon={<UserIcon className={cx('user-login')} />}
                onClick={onClick}
            >
                <span className={cx('title-btn')}>ĐĂNG NHẬP</span>
            </Button>
        </div>
    );
}

export default LoginBtn;
