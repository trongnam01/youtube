import { faAngleUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import ItemSideBar from '~/component/ItemSideBar';
import styles from './PagesSideBar.module.scss';

const cx = classNames.bind(styles);

function PagesSideBar({ data, isCurren }) {
    const [isTitle, setIsTitle] = useState(true);

    const classWrapper = cx('wrapper', { isCurren: !isCurren });

    const renderItems = () => {
        return data.map((items, indexs) => {
            return (
                <div key={indexs} className={cx('contai-items')}>
                    {items.map((item, index) => {
                        return !isCurren ? (
                            !!item.currentUser && <ItemSideBar key={index} item={item} />
                        ) : (
                            <ItemSideBar key={index} item={item} />
                        );
                    })}
                </div>
            );
        });
    };
    return (
        <div className={classWrapper}>
            {renderItems()}
            {isCurren && (
                <button className={cx('tongle-btn')} onClick={() => setIsTitle(!isTitle)}>
                    <span className={cx('icon')}>
                        <FontAwesomeIcon icon={isTitle ? faChevronDown : faAngleUp}></FontAwesomeIcon>
                    </span>
                    <span className={cx('title-btn')}> {isTitle ? 'Thêm' : 'Ẩb bớt'}</span>
                </button>
            )}
        </div>
    );
}

export default PagesSideBar;
