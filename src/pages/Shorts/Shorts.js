import classNames from 'classnames/bind';
import VideoShorts from '~/component/VideoShorts';
import styles from './Shorts.module.scss';

const cx = classNames.bind(styles);

function Shorts() {
    return (
        <article className={cx('wrapper')}>
            <VideoShorts
                url={
                    'https://v16-webapp.tiktok.com/33f4ae972cd14eeace8a18b2612a5c2b/634885ef/video/tos/useast2a/tos-useast2a-pve-0037-aiso/b81f5732c71b40cab7303c2cefff6b13/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=2728&bt=1364&cs=0&ds=3&ft=6-LrVjqM9wUxRKrm~N6~OyXq3bgIHCfxtJjk0JAmIRkSgl&mime_type=video_mp4&qs=0&rc=Z2g5Z2VnZmU4OzQ8NDhkNUBpM2Q3eTk6Zm00ZjMzZjgzM0AzYy40YGMyNV8xYWNhLTIyYSNqMV9jcjRnMHNgLS1kL2Nzcw%3D%3D&l=20221013154039010245246036182B81A1&btag=80000'
                }
            />
            <VideoShorts
                url={
                    'https://v16-webapp.tiktok.com/c313f9fd58f8cd8cac4a22ca6db88675/63488637/video/tos/useast2a/tos-useast2a-pve-0037c001-aiso/6e2a098846ba4c8f998cd6f4983ba8ff/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=2066&bt=1033&cs=0&ds=3&ft=WgGbvNM6VQ9wUGI8.1W.CSpxatk3hdxwiRgYprl8eC_O&mime_type=video_mp4&qs=0&rc=ZzQ2OjZkN2hoNTk8PGlpOEBpamk1NTw6ZmxvZTMzZjgzM0A2MGJeMWM1NWAxMmIvNTViYSNlMmc2cjRvZmRgLS1kL2Nzcw%3D%3D&l=20221013154156010245024125172B8A0E&btag=80000'
                }
            />
        </article>
    );
}

export default Shorts;
