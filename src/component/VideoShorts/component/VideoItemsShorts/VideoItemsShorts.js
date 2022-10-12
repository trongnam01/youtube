import classNames from 'classnames/bind';
import { useImperativeHandle, useRef, forwardRef } from 'react';
import styles from './VideoItemsShorts.module.scss';

const cx = classNames.bind(styles);

function VideoItemsShorts({ isVoice, src }, ref) {
    const refVideo = useRef();

    useImperativeHandle(ref, () => ({
        play() {
            refVideo.current.play();
        },
        pause() {
            refVideo.current.pause();
        },
    }));
    console.log(isVoice);
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
                src={
                    src ||
                    'https://v16-webapp.tiktok.com/a96c27dcb0aab7c0733e1302a0135575/6345cf10/video/tos/useast2a/tos-useast2a-pve-0037c001-aiso/6e2a098846ba4c8f998cd6f4983ba8ff/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2066&bt=1033&cs=0&ds=3&ft=kLO5qy-gZmo0P~4RmBkVQea8DiHKJdmC0&mime_type=video_mp4&qs=0&rc=ZzQ2OjZkN2hoNTk8PGlpOEBpamk1NTw6ZmxvZTMzZjgzM0A2MGJeMWM1NWAxMmIvNTViYSNlMmc2cjRvZmRgLS1kL2Nzcw%3D%3D&l=20221011141556010244012216211B3986&btag=80000'
                }
                onerror={handleErrorImage}
            />
        </>
    );
}

export default forwardRef(VideoItemsShorts);
