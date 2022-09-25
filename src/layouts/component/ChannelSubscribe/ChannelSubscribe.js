import { faAngleUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import ChannelItem from '~/component/ChannelItem';

import styles from './ChannelSubscribe.module.scss';

const cx = classNames.bind(styles);

const channel = [
    {
        images: 'https://yt3.ggpht.com/ytc/AMLnZu8QqmP49B4vzJ45PTWLBzU43U01pccm8M9vyxqugQ=s88-c-k-c0x00ffffff-no-rj',
        title: 'Rip113',
        live: 'true',
    },
    {
        images: 'https://yt3.ggpht.com/ytc/AMLnZu_Ng5Ue5u-ekt1T2Z6CV2krauJqHWLqmoc-srM0=s88-c-k-c0x00ffffff-no-rj',
        title: '2AO MEDIA MUSIC',
        live: 'true',
    },
    {
        images: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/306260628_1160608941160091_9182506454094661875_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=RWu2SjmpGSAAX8Nsmbl&_nc_ht=scontent.fhan2-5.fna&oh=00_AT8OvaMWEoREl_KVUuu21JD9l175msT92J5VKV2y57nmaA&oe=633598D3',
        title: 'Dân Thể Hình',
        onLive: 'true',
    },
    {
        images: 'https://lh3.googleusercontent.com/KNyKMfQqqVcLYAROYJ6KPW7nqmyMMcuc7npdzuzYI9KXhnZDJ3Wkfqy_apcQTDgq2QlNp9LzqQly06N5qsNxUOLT',
        title: 'Manchester United',
        onLive: 'true',
    },
    {
        images: 'https://yt3.ggpht.com/ytc/AMLnZu-ur9YjUU-JuIjWxCKdczbjGHp8DGqp4gy1jpwskg=s88-c-k-c0x00ffffff-no-rj',
        title: 'Phong BvB',
        onLive: 'true',
    },
    {
        images: 'https://yt3.ggpht.com/ytc/AMLnZu8BoSLqJ7bCN3HDxPY-btXNl3asyr1pbouu7zFmgg=s88-c-k-c0x00ffffff-no-rj',
        title: 'SVM TV',
        onLive: 'true',
    },
    {
        images: 'https://yt3.ggpht.com/tgYTQ2cBrd1lNLeRLHulSHrHSpiN9gn_dazSpTEONu_xnVEDv-sT6W3B0pGiIBv1j-c-FQFG=s88-c-k-c0x00ffffff-no-rj',
        title: 'Ohsusu TV',
    },
    {
        images: 'https://yt3.ggpht.com/ytc/AMLnZu-q0fNdJc8V18yf1xvDbcNuJod6rTqYujy5Aoe0=s88-c-k-c0x00ffffff-no-rj',
        title: 'LA LA SCHOOL',
    },
];

function ChannelSubscribe() {
    const [isAddChannel, setIsAddChannel] = useState(false);

    function handleIsChannel() {
        setIsAddChannel(!isAddChannel);
    }

    function renderItems() {
        return channel.map((item, index) => {
            const classes = cx({ disNone: index > 6 && !isAddChannel });

            return <ChannelItem className={classes} key={index} item={item} />;
        });
    }
    return (
        <div className={cx('wrapper')}>
            <h3>KÊNH ĐĂNG KÝ</h3>
            {renderItems()}
            <button className={cx('tongle-btn')} onClick={handleIsChannel}>
                <span className={cx('icon')}>
                    <FontAwesomeIcon icon={isAddChannel ? faChevronDown : faAngleUp}></FontAwesomeIcon>
                </span>
                <span className={cx('title-btn')}> {isAddChannel ? 'Ẩb bớt' : 'Hiện thị thêm'}</span>
            </button>
        </div>
    );
}

export default ChannelSubscribe;
