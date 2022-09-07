import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

import styles from './ItemResultSearch.module.scss';
import { SearchIcon } from '~/Icons';

const cx = classNames.bind(styles);

function ItemResultSearch({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <span className={cx('icon')}>
                    {data.isSuccess ? <FontAwesomeIcon icon={faClockRotateLeft} /> : <SearchIcon />}
                </span>
                <span className={cx('title')}>{data.title}</span>
            </div>
            <span className={cx('clear')}>Xóa</span>
        </div>
    );
}

export default ItemResultSearch;
