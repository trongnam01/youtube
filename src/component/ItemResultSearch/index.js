import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

import styles from './ItemResultSearch.module.scss';
import { SearchIcon } from '~/Icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ItemResultSearch({ data, className, show = true, value, handleaClickItemSearch }) {
    return (
        <Link to={`/search/@${value}`} className={cx('wrapper', className)} onClick={handleaClickItemSearch}>
            <div className={cx('content')}>
                {show && (
                    <span className={cx('icon')}>
                        {data.isSuccess ? <FontAwesomeIcon icon={faClockRotateLeft} /> : <SearchIcon />}
                    </span>
                )}

                <span className={cx('title')}>{data.title}</span>
            </div>
            {/* {show && <span className={cx('clear')}>Xóa</span>} */}
        </Link>
    );
}

export default ItemResultSearch;
