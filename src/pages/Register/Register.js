import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LoginBtn from '~/component/LoginBtn';
import { ChannelIconsIs, GridActionIcon, GridIcon, ListActionIcon, ListIcon } from '~/Icons';
import { ThemDefau } from '~/layouts/DefaultLayout';
import CrardImage from '~/component/CardImage';
import Image from '~/component/Image';
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import { RightIcon } from '~/Icons';

import styles from './Register.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Register() {
    const them = useContext(ThemDefau);
    const { DataApi } = them;
    const { currentUser, width } = them;
    const [status, setStatus] = useState({
        grid: true,
        list: false,
    });
    const [channel, setChannel] = useState([]);

    const subscribedChanel = useSelector((state) => state.dataUser.data.subscribedChanel);

    useEffect(() => {
        if (DataApi.length > 0) {
            const filterChannel = DataApi.filter((item) => {
                return subscribedChanel.some(function (sub) {
                    return item.IduserChannel === sub.IduserChannel && item.IduserChannel === sub.IduserChannel;
                });
            });
            setChannel(filterChannel.sort(() => Math.random() - 0.5));
        }
    }, [subscribedChanel]);

    useEffect(() => {}, [status]);
    const handleSetStatus = (text) => () => {
        if (text === 'grid') {
            setStatus((res) => ({
                grid: true,
                list: false,
            }));
        }
        if (text === 'list') {
            setStatus((res) => ({
                grid: false,
                list: true,
            }));
        }
    };
    return (
        <article className={cx('Register')}>
            {currentUser ? (
                <div className={cx('wrapper')}>
                    {width < 877 ? (
                        <div className={cx('wapper-mobile')}>
                            <header className={cx('header-mobi')}>
                                <img
                                    src={
                                        'https://yt3.ggpht.com/UtzXAAKz-qnKPqnzX2ec9zmKgWx1yHb9cUWPj5gFcF_Imw3KgAbNBpOuXN0HZ7P1WadZyzkW=s48-c-k-c0x00ffffff-no-rj-mo'
                                    }
                                    alt={'i'}
                                    className={cx('image-channels')}
                                />
                                <span className={cx('right-icon-header')}>
                                    <RightIcon />
                                </span>
                            </header>
                            <div className={cx('content-mobile')}>
                                {channel.map((item, index) => {
                                    return (
                                        <div key={index} className={cx('card-mobile')}>
                                            <CrardImage
                                                className={cx('card-mobile-regester')}
                                                item={item}
                                                registerImg={true}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className={cx('header-wrapper')}>
                                <div className={cx('contai-header-wrapper')}>
                                    <span className={cx('contai-header-title')}>
                                        {status.grid ? (
                                            'Hôm nay'
                                        ) : (
                                            <>
                                                {
                                                    <Image
                                                        src={channel[0].channeImage}
                                                        className={cx('avatar-channel')}
                                                    />
                                                }
                                                {channel[0].userChannel}
                                            </>
                                        )}
                                    </span>
                                    <div className={cx('contai-header-right')}>
                                        <Link to={'/channels'} className={cx('manage-register-channel')}>
                                            Quản lý
                                        </Link>

                                        <span
                                            className={cx('icon-header', 'grid-icon')}
                                            onClick={handleSetStatus('grid')}
                                        >
                                            {status.grid ? <GridActionIcon /> : <GridIcon />}
                                        </span>
                                        <span
                                            className={cx('icon-header', 'list-icon')}
                                            onClick={handleSetStatus('list')}
                                        >
                                            {status.list ? <ListActionIcon /> : <ListIcon />}
                                        </span>
                                    </div>
                                </div>
                            </div>{' '}
                            <div className={cx('wrapper-content')}>
                                {status.grid ? (
                                    <div className={cx('frame-item')}>
                                        <div className={cx('contai-header')}>
                                            <span className={cx('contai-header-title')}>Hôm nay</span>
                                            <div className={cx('contai-header-right')}>
                                                <button className={cx('manage-register-channel')}>Quản lý</button>
                                                <span
                                                    className={cx('icon-header', 'grid-icon')}
                                                    onClick={handleSetStatus('grid')}
                                                >
                                                    {status.grid ? <GridActionIcon /> : <GridIcon />}
                                                </span>
                                                <span
                                                    className={cx('icon-header', 'list-icon')}
                                                    onClick={handleSetStatus('list')}
                                                >
                                                    {status.list ? <ListActionIcon /> : <ListIcon />}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={cx('contai-content')}>
                                            <Row gutter={[8, 16]}>
                                                {channel.map((item, index) => {
                                                    return (
                                                        <Col key={index} span={width <= 1170 ? 8 : 6}>
                                                            <CrardImage
                                                                className={cx('card-grid-regester')}
                                                                item={item}
                                                                classCustom={cx('card-image-USERCHANNEL')}
                                                            />
                                                        </Col>
                                                    );
                                                })}
                                            </Row>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={cx('list-card')}>
                                        {channel.map((item, index) => {
                                            return (
                                                <div key={index} className={cx('frame-item')}>
                                                    <div className={cx('contai-header')}>
                                                        <span className={cx('contai-header-title')}>
                                                            <Image
                                                                src={item.channeImage}
                                                                className={cx('avatar-channel')}
                                                            />
                                                            {item.userChannel}
                                                        </span>
                                                    </div>
                                                    <div className={cx('contai-content')}>
                                                        <CrardImage
                                                            item={item}
                                                            register={true}
                                                            className={cx('card-list-regester')}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className={cx('isWrapper')}>
                    <ChannelIconsIs width="12rem" height="12rem" />

                    <h4>Đừng bỏ lỡ video mới</h4>
                    <p>Đăng nhập để xem cập nhật từ các kênh YouTube yêu thích của bạn</p>

                    <LoginBtn />
                </div>
            )}
        </article>
    );
}

export default Register;
