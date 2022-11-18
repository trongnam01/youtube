import { useContext } from 'react';
import { ThemDefau } from '~/layouts/DefaultLayout';
import classNames from 'classnames/bind';
import LoginBtn from '~/component/LoginBtn';
import { WatchedIcon } from '~/Icons';
import styles from './Watched.module.scss';

const cx = classNames.bind(styles);

function Whatched() {
    const them = useContext(ThemDefau);
    const { currentUser, width } = them;

    return (
        <article className={cx('Whatched')}>
            {currentUser ? (
                <div className={cx('wrapper')}></div>
            ) : (
                <div className={cx('isWrapper')}>
                    <WatchedIcon width="12rem" height="12rem" />

                    <h4>Theo dõi nội dung mà bạn xem</h4>
                    <p>
                        Bạn không thể xem được nhật ký xem khi đã đăng xuất.
                        <a href="#" style={{ color: '#065fd4' }}>
                            {' '}
                            Tìm hiểu thêm
                        </a>
                    </p>

                    <LoginBtn />
                </div>
            )}
        </article>
    );
}

export default Whatched;
