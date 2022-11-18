import { useContext, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { ThemDefau } from '~/layouts/DefaultLayout';
import LoginBtn from '~/component/LoginBtn';

import styles from './Library.module.scss';
import {
    CutVideoIcon,
    IconVideoLibrary,
    LaterIcon,
    LikeActiveIcon,
    LikeIcon,
    MenuListPlay,
    VideoUserIcon,
    WatchedIcon,
    YourMovirIcon,
} from '~/Icons';
import Image from '~/component/Image';
import { Link } from 'react-router-dom';
import CrardImage from '~/component/CardImage';

const cx = classNames.bind(styles);

const Frame = (props) => {
    return (
        <div className={cx('frame')}>
            <div className={cx('header-library')}>
                <span className={cx('title-header')}>
                    {props.icon}
                    {props.title}
                </span>
                <Link to={'/watched'} className={cx('btn-all')}>
                    Xem tất cả
                </Link>
            </div>
            <div>
                {props.data.length === 0 ? (
                    <span className={cx('title-frame')}>{props.title}</span>
                ) : (
                    <Row gutter={[8, 24]}>
                        {props.data.map((item, index) => {
                            return (
                                <Col key={index} span={props.width <= 1170 ? 8 : 6}>
                                    <CrardImage
                                        className={cx('library-card')}
                                        item={item}
                                        classCustom={cx('card-image-USERCHANNEL')}
                                    />
                                </Col>
                            );
                        })}
                    </Row>
                )}
            </div>
        </div>
    );
};
const FrameMobile = ({ datas, secletorUser }) => {
    const imageWL = datas.data.whatLaster[0]?.image || 'https://i.ytimg.com/vi/24LwZrA74oY/mqdefault.jpg';
    const imageLike = datas.data.like[0]?.image || 'https://i.ytimg.com/vi/24LwZrA74oY/mqdefault.jpg';

    return (
        <div className={cx('frame-mobi')}>
            <div className={cx('frame-mobi-header')}>
                <MenuListPlay />
                <span>Danh sách phát</span>
            </div>
            <div className={cx('contai')}>
                <div className={cx('frame-mobi-img')}>
                    <div className={cx('image')}>
                        <img src={imageWL} alt="img" />
                        <div className={cx('playlist-card-overlay')}>
                            <LaterIcon width="3.2rem" height="3.2rem" />
                            <span>{datas.data.whatLaster.length} video</span>
                        </div>
                    </div>
                    <div className={cx('title')}>
                        <p>Xem sau</p>
                        <span>{secletorUser?.name}</span>
                    </div>
                </div>
                <div className={cx('frame-mobi-img')}>
                    <div className={cx('image')}>
                        <img src={imageLike} alt="img" />
                        <div className={cx('playlist-card-overlay')}>
                            <LikeActiveIcon className={cx('like-action')} width="3.2rem" height="3.2rem" />
                            <span>{datas.data.like.length}video</span>
                        </div>
                    </div>
                    <div className={cx('title')}>
                        <p>Xem thêm</p>
                        <span>{secletorUser?.name}</span>
                    </div>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('item-content')}>
                    <WatchedIcon />
                    <span>Video đã xem</span>
                </div>
                <div className={cx('item-content')}>
                    <VideoUserIcon />
                    <span>Video của bạn</span>
                </div>
                <div className={cx('item-content')}>
                    <YourMovirIcon />
                    <span>Phim của bạn</span>
                </div>
            </div>
        </div>
    );
};

function Library() {
    const them = useContext(ThemDefau);
    const [secletorUser, setInfomationUser] = useState({});
    const [datas, setDatas] = useState({
        id: '3',
        email: 'admin@gmail.com',
        data: {
            watched: [],
            whatLaster: [],
            videoUser: [],
            like: [],
            movie: [],
            listPlay: [],
            notLike: [],
            sub: [],
            subscribedChanel: [],
        },
    });
    const secletor = useSelector((state) => state.dataUser);
    const infomationtUser = useSelector((state) => state.user);
    useEffect(() => {
        setInfomationUser(infomationtUser);
    }, [infomationtUser]);

    useMemo(() => {
        const watched = secletor.data.watched.slice(0, 8);
        const whatLaster = secletor.data.whatLaster.slice(0, 8);
        const videoUser = secletor.data.videoUser.slice(0, 8);
        const like = secletor.data.like.slice(0, 8);
        const movie = secletor.data.movie.slice(0, 8);
        const listPlay = secletor.data.listPlay.slice(0, 8);

        setDatas((res) => ({
            id: secletor.id,
            email: secletor.email,
            data: {
                watched,
                whatLaster,
                videoUser,
                like,
                movie,
                listPlay,
            },
        }));
    }, [secletor]);
    const { currentUser, width } = them;

    console.log(width);

    return (
        <article className={cx('Library')}>
            {currentUser ? (
                <div className={cx('wrapper')}>
                    {width < 877 ? (
                        <FrameMobile datas={datas} secletorUser={secletorUser[0]} />
                    ) : (
                        <Row gutter={[32, 16]}>
                            <Col span={19}>
                                <Frame
                                    icon={<WatchedIcon />}
                                    title={'Video đã xem'}
                                    data={datas.data.watched}
                                    width={width}
                                />
                                <Frame
                                    icon={<LaterIcon />}
                                    title={'Xem sau'}
                                    data={datas.data.whatLaster}
                                    width={width}
                                />
                                <Frame
                                    icon={<MenuListPlay />}
                                    title={'Danh sách phát'}
                                    data={datas.data.listPlay}
                                    width={width}
                                />
                                <Frame
                                    icon={<LikeIcon />}
                                    title={'Video đã thích'}
                                    data={datas.data.like}
                                    width={width}
                                />
                                <div className={cx('frame', 'frame-cut')}>
                                    <div className={cx('header-cutVideo')}>
                                        <CutVideoIcon />
                                        <span>Đoạn video của bạn</span>
                                    </div>
                                    <span>
                                        Tạo đoạn video và chia sẻ khoảnh khắc bạn yêu thích. Danh sách đoạn video sẽ
                                        xuất hiện ngay tại đây.
                                    </span>
                                </div>
                            </Col>
                            <Col span={5}>
                                <div className={cx('frame-user')}>
                                    <div>
                                        <Image className={cx('image')} src={secletorUser[0]?.image} />
                                        <span className={cx('name')}>{secletorUser[0]?.name}</span>
                                    </div>
                                    <div>
                                        <div className={cx('wrapper-item-user')}>
                                            <span>Kênh đăng ký</span>
                                            <span>222</span>
                                        </div>
                                        <div className={cx('wrapper-item-user')}>
                                            <span>Video tải lên</span>
                                            <span>{datas.data.videoUser.length}</span>
                                        </div>
                                        <div className={cx('wrapper-item-user')}>
                                            <span>Video đã thích</span>
                                            <span>{datas.data.like.length}</span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )}
                </div>
            ) : (
                <div className={cx('isWrapper')}>
                    <IconVideoLibrary />

                    <h4>Thưởng thức các video yêu thích của bạn</h4>
                    <p>Đăng nhập để truy cập video bạn đã thích hoặc đã lưu</p>

                    <LoginBtn />
                </div>
            )}
        </article>
    );
}

export default Library;
