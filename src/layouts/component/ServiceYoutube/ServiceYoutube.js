import { render } from '@testing-library/react';
import classNames from 'classnames/bind';
import { CreatorYoutube, YoutubeKids, YoutubeMusic, YoutubeTv } from '~/Icons';
import { renderItem } from '../Entertainment/Entertainment';

import styles from './ServiceYoutube.module.scss';

const cx = classNames.bind(styles);

const ItemsSevice = [
    {
        icon: <CreatorYoutube />,
        iconActive: <CreatorYoutube />,
        title: 'Creator Studio',
        to: '/studio',
    },
    {
        icon: <YoutubeMusic />,
        iconActive: <YoutubeMusic />,
        title: 'YouTube Music',
        to: '/Music',
    },
    {
        icon: <YoutubeKids />,
        iconActive: <YoutubeKids />,
        title: 'YouTube Kids',
        to: '/Kids',
    },
    {
        icon: <YoutubeTv />,
        iconActive: <YoutubeTv />,
        title: 'YouTube TV',
        to: '/tv',
    },
];

function ServiceYoutube() {
    return (
        <div className={cx('wrapper')}>
            <h3>Dịch vụ khác của YouTube</h3>

            {renderItem(ItemsSevice)}
        </div>
    );
}

export default ServiceYoutube;
