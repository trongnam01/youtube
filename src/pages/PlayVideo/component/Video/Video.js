import { forwardRef, useContext, useLayoutEffect, useEffect, useImperativeHandle, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import YouTube from 'react-youtube';
import styles from './Video.module.scss';
import { ThemDefau } from '~/layouts/DefaultLayout';

const cx = classNames.bind(styles);

function Video({ className, item }, ref) {
    const Them = useContext(ThemDefau);

    const refvideo = useRef();
    const [dataVideo, setDataVideo] = useState(item);

    useEffect(() => {
        setDataVideo(item);
    }, [item, dataVideo]);

    useImperativeHandle(ref, () => ({
        play() {
            refvideo.current.internalPlayer.playVideo();
        },
        pause() {
            refvideo.current.internalPlayer.pauseVideo();
        },
        setVolume(number) {
            refvideo.current.internalPlayer.setVolume(number);
        },
        refvideo,
    }));

    function handleStateChange(e) {
        console.log(e);
    }
    function handleOnRead(event) {
        console.log(event.target.playVideo());
    }

    const opts = {
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            playsinline: 1,
        },
        events: {
            onReady: handleOnRead,
            onStateChange: handleStateChange,
        },
    };

    const classes = cx('Video', className);
    return (
        <div className={cx('wraper')}>
            <YouTube
                ref={refvideo}
                videoId={dataVideo.video}
                {...opts}
                iframeClassName={classes}
                onStateChange={handleStateChange}
                onRead={handleOnRead}
            />
        </div>
    );
}

export default forwardRef(Video);
