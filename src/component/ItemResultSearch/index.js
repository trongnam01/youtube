import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

import styles from './ItemResultSearch.module.scss';
import { SearchIcon } from '~/Icons';

const cx = classNames.bind(styles);

function ItemResultSearch({ data, className, show = true }) {
    return (
        <div className={cx('wrapper', className)}>
            <div className={cx('content')}>
                {show && (
                    <span className={cx('icon')}>
                        {data.isSuccess ? <FontAwesomeIcon icon={faClockRotateLeft} /> : <SearchIcon />}
                    </span>
                )}

                <span className={cx('title')}>{data.title}</span>
            </div>
            {show && <span className={cx('clear')}>Xóa</span>}
        </div>
    );
}

export default ItemResultSearch;
