import classNames from 'classnames/bind';
import Button from '~/component/Button';
import { RightIcon } from '~/Icons';

import styles from '../ManagerUser.module.scss';

const cx = classNames.bind(styles);

function ManagerItem({ item, onClick, className }) {
    return (
        <Button
            className={cx('button-btn', className)}
            LeftIcon={item.icon}
            RightIcon={item.rightIcon}
            onClick={onClick}
        >
            {item.title}
        </Button>
    );
}

export default ManagerItem;
