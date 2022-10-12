import classNames from 'classnames/bind';
import VideoShorts from '~/component/VideoShorts';
import styles from './Shorts.module.scss';

const cx = classNames.bind(styles);

function Shorts() {
    return (
        <article className={cx('wrapper')}>
            <VideoShorts />
            <VideoShorts
                src={
                    'https://v16-webapp.tiktok.com/8232363b21339be3f97aec9fe66748c4/6346dd0d/video/tos/useast2a/tos-useast2a-pve-0037-aiso/2172390e89154f979b8411c3ed8e88c3/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=2734&bt=1367&cs=0&ds=3&ft=kLO5qy-gZmo0PrU-mBkVQdp.DiHKJdmC0&mime_type=video_mp4&qs=0&rc=ODZpaWdlMzo1NGZmZDlnM0BpM2Q3eTk6Zm00ZjMzZjgzM0AvMWM2M15gNl8xNmIzLTMyYSNqMV9jcjRnMHNgLS1kL2Nzcw%3D%3D&l=202210120927490102452421041604ED1E&btag=80000'
                }
            />
        </article>
    );
}

export default Shorts;
