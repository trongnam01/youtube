import classNames from 'classnames/bind';
import Button from '~/component/Buttons';

import styles from '../ManagerUser.module.scss';

const cx = classNames.bind(styles);

function ManagerItem({ item, onClick, className, currentUser }) {
    let wrapper = (
        <Button
            className={cx('button-btn', className)}
            LeftIcon={item.icon}
            RightIcon={item.rightIcon}
            onClick={onClick}
            click={item.onClick}
        >
            {item.title}
        </Button>
    );

    return <>{currentUser ? wrapper : !item.currentUser && wrapper}</>;
}

export default ManagerItem;
