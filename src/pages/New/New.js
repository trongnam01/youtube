import { Col, Row } from 'antd';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import CrardPlay from '~/component/CardImage/CardImage';

import { ThemDefau } from '~/layouts/DefaultLayout';

import styles from './New.module.scss';
import './New.scss';

const cx = classNames.bind(styles);

const MENU_TABS = [
    {
        img: 'https://www.youtube.com/img/explore/destinations/icons/trending_color_64.png',
        title: 'Thịnh Hành',
    },
    {
        img: 'https://www.youtube.com/img/explore/destinations/icons/music_color_64.png',
        title: 'Âm nhạc',
    },
    {
        img: 'https://www.youtube.com/img/explore/destinations/icons/gaming_color_64.png',
        title: 'Trò chơi',
    },
    {
        img: 'https://www.youtube.com/img/explore/destinations/icons/news_color_64.png',
        title: 'Tin tức',
    },
    {
        img: 'https://www.youtube.com/img/explore/destinations/icons/sports_color_64.png',
        title: 'Thể Thao',
    },
];

function New() {
    const them = useContext(ThemDefau);
    const [featuredVideo, setFeaturedVideo] = useState([]);
    useEffect(() => {
        const result = them.DataApi.slice(0, 10);
        setFeaturedVideo(result);
    }, [them.DataApi]);
    return (
        <article className={cx('wrapper')}>
            <div className={cx('container')}>
                <header className={cx('header')}>
                    {MENU_TABS.map((item, index) => {
                        return (
                            <div key={index} className={cx('items-tabs')}>
                                <img src={item.img} alt="ảnh" />
                                <span>{item.title}</span>
                            </div>
                        );
                    })}
                </header>
                <article className={cx('content')}>
                    <h3>Video thịnh hành</h3>
                    <Row gutter={[16, 12]}>
                        {featuredVideo.map((item, index) => {
                            return (
                                <Col className={cx('item-featured')} key={index} span={24}>
                                    <CrardPlay item={item} pageNew={true} />
                                </Col>
                            );
                        })}
                    </Row>
                </article>
            </div>
        </article>
    );
}

export default New;
