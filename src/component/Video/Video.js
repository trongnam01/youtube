import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import YouTube from 'react-youtube';
import styles from './Video.module.scss';

const cx = classNames.bind(styles);

function Video({ className, item, opts }) {
    const [dataVideo, setDataVideo] = useState(item);

    useEffect(() => {
        setDataVideo(item);
    }, [item]);

    function handleStateChange(e) {
        console.log(e);
    }
    function handleOnRead(event) {
        console.log(1);
        // event.target.setVolume(90);
        console.log(event.target);
    }

    const classes = cx('Video', className);
    return (
        <div className={cx('wraper')}>
            <YouTube
                videoId={dataVideo.video}
                opts={opts}
                iframeClassName={classes}
                onStateChange={handleStateChange}
                onReady={handleOnRead}
            />
        </div>
    );
}

export default Video;
