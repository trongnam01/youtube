import video1 from '~/assets/videos/video1.mp4';
import video2 from '~/assets/videos/video2.mp4';
import classNames from 'classnames/bind';
import VideoShorts from '~/component/VideoShorts';

import styles from './Shorts.module.scss';

const cx = classNames.bind(styles);

function Shorts() {
    return (
        <article className={cx('wrapper')}>
            <VideoShorts url={video2} />
            <VideoShorts url={video1} />
        </article>
    );
}

export default Shorts;
