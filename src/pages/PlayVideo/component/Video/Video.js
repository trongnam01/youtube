import { forwardRef, useContext, useLayoutEffect, useEffect, useImperativeHandle, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import YouTube from 'react-youtube';
import styles from './Video.module.scss';
import { ThemDefau } from '~/layouts/DefaultLayout';

const cx = classNames.bind(styles);

function Video({ className, item, opts }, ref) {
    const Them = useContext(ThemDefau);

    const refvideo = useRef();
    const [dataVideo, setDataVideo] = useState(item);

    useEffect(() => {
        setDataVideo(item);
    }, [item]);

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
        // event.target.setVolume(90);
        // console.log(event.target.playVideo());
    }

    const classes = cx('Video', className);
    return (
        <div className={cx('wraper')}>
            <YouTube
                ref={refvideo}
                videoId={dataVideo.video}
                opts={opts}
                iframeClassName={classes}
                onStateChange={handleStateChange}
                onRead={handleOnRead}
            />
        </div>
    );
}

export default forwardRef(Video);
