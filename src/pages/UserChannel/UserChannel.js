import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { ThemDefau } from '~/layouts/DefaultLayout';
import styles from './UserChannel.module.scss';
import { SearchIcon } from '~/Icons';
import Video from '~/component/Video';
import { Col, Row } from 'antd';
import CrardImage from '~/component/CardImage';

const cx = classNames.bind(styles);

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <div className={cx('wrapper-Tabpanel')}>{children}</div>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const menuUserChannel = ['TRANG CHỦ', 'VIDEO', 'DANH SÁCH PHÁT', 'CỘNG ĐỒNG', 'KÊNH', 'GIỚI THIỆU'];

const opts = {
    playerVars: {
        autoplay: 1,
        // mute: 1,
    },
};
let item = {
    id: '1',
    coverImage:
        'https://yt3.ggpht.com/-LY_VP4Ivld3Qjpk5AV-gAbhkh0FO7zZ3Ey_yjRXL_sU6X1kvPWqOL1kGUipwdGKXtMBYQC5mw=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj',
    channeImage:
        'https://yt3.ggpht.com/tdEC3Y8JEPcpHoTiNfe3Zy6OoIg3EAPRJUB8dcVAdhCC0QRo02HKQmPzQfXW17hj5b4n2xuQeHg=s68-c-k-c0x00ffffff-no-rj',
    video: 'y576-ONm5II',
    title: 'YÊU 5 - Rhymastic',
    videoTime: '4:10',
    image: 'https://i.ytimg.com/vi/qDZFevQpVFk/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCjAgmGEUepOLAteDCR3kL59aAqHg',
    userChannel: 'Jen Hoang',
    registerChannel: '5,66 N',
    IduserChannel: '1',
    view: '110.732.811 N',
    videoPostingData: '14 ngày',
    like: '323',
    comments: [
        {
            image: 'https://yt3.ggpht.com/ytc/AMLnZu_xfD3WfFj5RVscCRZ8RB977fiBzyLDC47LTSf0Zg=s88-c-k-c0x00ffffff-no-rj',
            commentData: '14 ngày',
            content:
                'Bài hát như đã đi trước thời đại,lần nào nghe cũng như mới vậy, sự kết hợp âm thanh tuyệt vời : ))',
            like: '8.2',
            name: 'Vũ phạm',
        },
        {
            image: 'https://yt3.ggpht.com/HUzjwdFn_T4_wv-MX9lYxArP82K3kdh2OqEeKQB-uIeBarGVXj36i7OckJ2tP30FJ66a2R3AoQ=s88-c-k-c0x00ffffff-no-rj',
            commentData: '6 ngày',
            content: '❤️❤️❤️',
            like: '1',
            name: 'Mai vàng Quốc',
        },
        {
            image: 'https://yt3.ggpht.com/juKoabK0VHwNLsjmSRq3RFQiYiwW7K9nwkhofJv5srtaaZQBlDVEmvNF7VZu5T0iv4yIIgxw7Sw=s88-c-k-c0x00ffffff-no-rj',
            commentData: '2 ngày',
            content: 'Bài này sẽ không bao giờ bị lãng quên !',
            like: '0',
            name: 'Thanh Văn',
        },
        {
            image: 'https://yt3.ggpht.com/Rm0WwDlLgcHcsynkj-59oDnSjUqSQr2-H7BBX5tTiqXOgU0wM4lWo57-a9cBWqGCCkGo1MghqRo=s88-c-k-c0x00ffffff-no-rj',
            commentData: '1 giây trước',
            content: '🥰🥰🥰',
            like: '0',
            name: 'Su Su',
        },
    ],
};

function UserChannel() {
    const Them = useContext(ThemDefau);

    const [value, setValue] = useState(0);
    const inputRef = useRef();
    const [datas, setDatas] = useState([]);

    console.log(Them.DataApi);
    useEffect(() => {
        const pat = Them.locotion.pathname.slice(10);
        console.log(pat);
        const result = Them.DataApi.filter((item) => {
            console.log(pat);
            console.log(item.userChannel.replace(/ /g, ''));
            return pat === item.userChannel.replace(/ /g, '');
        });

        setDatas(result);
    }, []);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('cover-image')}
                src="https://yt3.ggpht.com/RarTPnHxDqurL5TYmYh3BpmLGoZivMLW-pbjGyZ6rqeWViN4Dv-L_sZTd0D-j9lvNwEOqPa5=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
                alt="img"
            />
            <div className={cx('header')}>
                <div className={cx('header-user-channel')}>
                    <img
                        src="https://yt3.ggpht.com/ytc/AMLnZu8uhDPkPzLBr6-cSGkzyTgr4qmUYdPO_yd2MB1m-w=s176-c-k-c0x00ffffff-no-rj"
                        alt="avatar"
                    />
                    <div className={cx('header-information')}>
                        <span className={cx('user-name')}>Hà Anh Tuấn </span>
                        <span className={cx('subscribers')}>946 N người đăng ký</span>
                    </div>
                </div>
                <div className={cx('btn-subscribers')}>
                    <button>Đăng ký</button>
                </div>
            </div>
            <div className={cx('content-user-channel')}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'transparent' }}>
                        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
                            {menuUserChannel.map((item, index) => {
                                return <Tab key={index} label={item} {...a11yProps(index)} />;
                            })}
                            <Tab
                                label={
                                    <div className={cx('header-search')}>
                                        <div
                                            className={cx('search')}
                                            onClick={() => {
                                                inputRef.current.focus();
                                            }}
                                        >
                                            <SearchIcon width="2.4rem" height="2.4rem" />
                                        </div>
                                        <div className={cx('header-input')}>
                                            <input ref={inputRef} placeholder="Tìm kiếm" />
                                        </div>
                                    </div>
                                }
                                {...a11yProps(9)}
                            />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <div className={cx('wrapper-content')}>
                            <div className={cx('wrapper-video-top')}>
                                <div className={cx('video-top')}>
                                    <Video IdVideo={'m7Yd-K821cc'} opts={opts} className={cx('iframe-video')} />
                                </div>
                                <div className={cx('wrapper-content-video')}>
                                    <div className={cx('video-title')}>
                                        <p className={cx('title')}>
                                            Lạ Lùng, Bước Qua Nhau - Những Bài Hát Hay Nhất Của Vũ. | Dòng Người Vội
                                            Vàng Bước Qua...
                                        </p>
                                        <p className={cx(cx('first-Information'))}>
                                            <span> 243.499 lượt xem</span>

                                            <span>7 tháng trước</span>
                                        </p>
                                    </div>
                                    <div className={cx('text-video')}>
                                        <p>
                                            Lạ Lùng, Bước Qua Nhau - Những Bài Hát Hay Nhất Của Vũ. | Dòng Người Vội
                                            Vàng Bước Qua...
                                        </p>
                                        <p>
                                            ------------------------- <br />
                                            Nhớ SUBSCRIBE và nhấn 🔔 để nhận thông báo đầu tiên và cập nhật những sản
                                            phẩm mới nhất từ Sony Music Entertainment Vietnam nhé! 🎵 Listen & Stream |
                                            Nghe audio "Cause I Love You" tại: Spotify​:{' '}
                                        </p>
                                    </div>
                                    <b>Đọc Thêm</b>
                                </div>
                            </div>
                            <div className={cx('contents')}>
                                <Row gutter={[8, 24]}>
                                    {datas.map((item, index) => {
                                        return (
                                            <Col key={index} span={6}>
                                                <CrardImage item={item} className={cx('card-image')} />
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                </Box>
            </div>
        </div>
    );
}

export default UserChannel;
