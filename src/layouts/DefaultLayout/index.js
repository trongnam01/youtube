import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';

import Header from '../component/Header';
import SideBar from '../component/SideBar';

const cx = classNames.bind(styles);

function DefaultLauout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <SideBar />
                <div>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLauout;
