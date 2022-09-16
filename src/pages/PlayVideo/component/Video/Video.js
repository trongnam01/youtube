import classNames from 'classnames/bind';
import { useLayoutEffect, useEffect } from 'react';
import YouTube from 'react-youtube';
import styles from './Video.module.scss';

const cx = classNames.bind(styles);

function Video() {
    // useEffect(() => {
    //     let a = document.querySelector('iframe');
    //     console.log(a);
    // });

    const opts = {
        height: '447',
        width: '100%',
        left: '0',
        right: '0',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };
    return (
        <div className={cx('wraper')}>
            <YouTube videoId="y576-ONm5II" opts={opts} />
        </div>
    );
}

export default Video;
