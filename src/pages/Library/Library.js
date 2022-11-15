import { useContext } from 'react';
import classNames from 'classnames/bind';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { ThemDefau } from '~/layouts/DefaultLayout';
import LoginBtn from '~/component/LoginBtn';

import styles from './Library.module.scss';
import { IconVideoLibrary, WatchedIcon } from '~/Icons';
import Image from '~/component/Image';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Library() {
    const them = useContext(ThemDefau);

    const { currentUser } = them;

    const secletor = useSelector((state) => state.watched) || [];

    console.log(secletor);

    return (
        <article className={cx('Library')}>
            {!currentUser ? (
                <div className={cx('wrapper')}>
                    <Row gutter={[24, 16]}>
                        <Col span={19}>
                            <div className={cx('frame')}>
                                <div className={cx('header-library')}>
                                    <span className={cx('title-header')}>
                                        <WatchedIcon />
                                        Video đã xem
                                    </span>
                                    <Link to={'/watched'} className={cx('btn-all')}>
                                        Xem tất cả
                                    </Link>
                                </div>
                                <div>
                                    <Row gutter={[24, 8]}></Row>
                                </div>
                            </div>
                        </Col>
                        <Col span={5}>
                            <div className={cx('frame-user')}>
                                <div>
                                    <Image
                                        className={cx('image')}
                                        src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/305388852_430181099214939_5148274334442367330_n.jpg?stp=cp6_dst-jpg_p720x720&_nc_cat=108&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=EZVGQ8rtXCsAX86E3LU&_nc_ht=scontent.fhan17-1.fna&oh=00_AfAvZr-kEjupWusF5hcLnQqLsKLKiYodYZ-Ah9Hnfq7RfA&oe=63775559"
                                    />
                                    <span className={cx('name')}>Lê Bống</span>
                                </div>
                                <div>
                                    <div className={cx('wrapper-item-user')}>
                                        <span>Kênh đăng ký</span>
                                        <span>222</span>
                                    </div>
                                    <div className={cx('wrapper-item-user')}>
                                        <span>Video tải lên</span>
                                        <span>0</span>
                                    </div>
                                    <div className={cx('wrapper-item-user')}>
                                        <span>Video đã thích</span>
                                        <span>9</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
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
