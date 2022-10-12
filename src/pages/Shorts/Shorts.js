import classNames from 'classnames/bind';
import VideoShorts from '~/component/VideoShorts';
import styles from './Shorts.module.scss';

const cx = classNames.bind(styles);

function Shorts() {
    return (
        <article className={cx('wrapper')}>
            <section>
                <VideoShorts />
            </section>
        </article>
    );
}

export default Shorts;
