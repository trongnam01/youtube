import classNames from 'classnames/bind';
import { LiveIcon } from '~/Icons';

import styles from './ChannelItem.module.scss';

const cx = classNames.bind(styles);

function ChannelItem({ item, className }) {
    const isOnLive = item.live || item.onLive;
    return (
        <div className={cx('wrapper', className)}>
            <img src={item.images} alt={item.title} />
            <span className={cx('title')}>{item.title}</span>
            {!!isOnLive ? (
                !!item.live ? (
                    <span className={cx('icon')}>
                        <LiveIcon className={cx('color-icon')} />
                    </span>
                ) : (
                    <span className={cx('onLive')}></span>
                )
            ) : (
                ''
            )}
        </div>
    );
}

export default ChannelItem;
