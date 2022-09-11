import classNames from 'classnames/bind';
import ItemSideBar from '~/component/ItemSideBar';
import { CupActiveIcon, CupIcon, GameActiveIcon, GameIcon } from '~/Icons';

import styles from './Entertainment.module.scss';

const cx = classNames.bind(styles);

const itemEntertaiment = [
    {
        icon: <GameIcon />,
        iconActive: <GameActiveIcon />,
        title: 'Trò chơi',
        to: '/game',
    },
    {
        icon: <CupIcon />,
        iconActive: <CupActiveIcon />,
        title: 'Thể thao',
        to: '/sport',
    },
];

export const renderItem = (data = itemEntertaiment) => {
    let items = data;
    return items.map((item, index) => {
        return <ItemSideBar key={index} item={item} />;
    });
};
function Entertainment() {
    return (
        <div className={cx('wrapper')}>
            <h3>KHÁM PHÁ</h3>
            {renderItem()}
        </div>
    );
}

export default Entertainment;
