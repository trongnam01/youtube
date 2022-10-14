import classNames from 'classnames/bind';
import { useImperativeHandle, useRef, forwardRef } from 'react';
import styles from './VideoItemsShorts.module.scss';

const cx = classNames.bind(styles);

function VideoItemsShorts({ isVoice, url }, ref) {
    const refVideo = useRef();

    useImperativeHandle(ref, () => ({
        play() {
            refVideo.current.play();
        },
        pause() {
            refVideo.current.pause();
        },
        refVideo,
    }));
    const handleErrorImage = () => {
        console.log('lỗi url video shorts');
    };
    return (
        <>
            <video
                muted={!isVoice ? true : false}
                ref={refVideo}
                className={cx('item')}
                loop
                src={url}
                onError={handleErrorImage}
            />
        </>
    );
}

export default forwardRef(VideoItemsShorts);
