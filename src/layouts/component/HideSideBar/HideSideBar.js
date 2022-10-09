import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './HideSideBar.module.scss';

const cx = classNames.bind(styles);

function HideSideBar({ data }) {
    function renderItem() {
        return data.map((items) => {
            return items.map((item, index) => {
                return (
                    !!item.isSideBar && (
                        <NavLink
                            key={index}
                            to={item.to}
                            className={(nav) => cx('wrapper', { isActive: nav.isActive })}
                        >
                            <span className={cx('icon')}>{item.icon}</span>
                            <span className={cx('iconActive')}>{item.iconActive}</span>
                            <span className={cx('title')}>{item.title}</span>
                        </NavLink>
                    )
                );
            });
        });
    }

    return <div className={cx('container')}>{renderItem()}</div>;
}

export default HideSideBar;
