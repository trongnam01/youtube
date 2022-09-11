import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './ItemSideBar.module.scss';

const cx = classNames.bind(styles);

function ItemSideBar({ item }) {
    return (
        <NavLink className={(nav) => cx('wrapper', { active: nav.isActive })} to={item.to}>
            <span className={cx('icon')}>{item.icon}</span>
            <span className={cx('icon-active')}>{item.iconActive}</span>
            <span className={cx('title')}>{item.title}</span>
        </NavLink>
    );
}

export default ItemSideBar;
