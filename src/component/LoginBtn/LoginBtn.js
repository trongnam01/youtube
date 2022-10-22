import { UserIcon } from '~/Icons';
import classNames from 'classnames/bind';
import styles from './LoginBtn.module.scss';
import './LoginBtn.scss';

import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function LoginBtn({ classBtn }) {
    const classes = cx('login-btn', {
        classBtn: classBtn,
    });
    return (
        <Link to={'/login'} className={cx('wrapper', cx('wrapper-LoginBtn'))}>
            <Button variant="outlined" className={classes} startIcon={<UserIcon className={cx('user-login')} />}>
                <span className={cx('title-btn')}>ĐĂNG NHẬP</span>
            </Button>
        </Link>
    );
}

export default LoginBtn;
