import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { ThemDefau } from '~/layouts/DefaultLayout';
import styles from './UserChannel.module.scss';
import './UserChannel.scss';
import { PlayICon, SearchIcon } from '~/Icons';
import Video from '~/component/Video';
import { Col, Row } from 'antd';
import CrardImage from '~/component/CardImage';
import Buttons from '~/component/Buttons';
import { Link } from 'react-router-dom';

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

function UserChannel() {
    const Them = useContext(ThemDefau);
    const [colum, setColum] = useState();

    const [value, setValue] = useState(0);
    const inputRef = useRef();
    const [datas, setDatas] = useState([{}]);

    useEffect(() => {
        const pat = Them.locotion.pathname.slice(10);
        const result = Them.DataApi.filter((item) => {
            return pat === item.idName;
        });

        console.log(result);
        console.log(Them.DataApi);
        setDatas(() => {
            return result.length < 1 ? [{}] : result;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Them.DataApi]);
    useEffect(() => {
        const number = Them.width;
        if (number >= 1128) {
            setColum(6);
        }
        if (number < 1128) {
            setColum(8);
        }
        if (number < 876) {
            setColum(12);
        }
        if (number < 576) {
            setColum(24);
        }
    }, [Them.width, colum]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <div className={cx('wrapper','wrapper-USERCHANNEL')}>
            <img className={cx('cover-image')} src={datas[0].coverImage} alt={datas[0].title} />
            <div className={cx('header')}>
                <div className={cx('header-user-channel')}>
                    <img src={datas[0].channeImage} alt={datas[0].userChannel} />
                    <div className={cx('header-information')}>
                        <span className={cx('user-name')}>{datas[0].userChannel}</span>
                        <span className={cx('subscribers')}>{datas[0].registerChannel} người đăng ký</span>
                    </div>
                </div>
                <div className={cx('btn-subscribers')}>
                    <button>Đăng ký</button>
                </div>
            </div>
            <div className={cx('content-user-channel', 'content-user-channel-USERCHANNEL')}>
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
                                    <Video item={datas[0]} opts={opts} className={cx('iframe-video')} />
                                </div>
                                <div className={cx('title-mobile')}>
                                    <Link
                                        to={`/watch/@${datas[0].video}`}
                                        onClick={() => {
                                            Them.handleSetItemPlayVideo(datas[0]);
                                        }}
                                    >
                                        {datas[0].title}
                                    </Link>
                                </div>
                                <div className={cx('wrapper-content-video')}>
                                    <div className={cx('video-title')}>
                                        <p className={cx('title')}>
                                            <Link
                                                to={`/watch/@${datas[0].video}`}
                                                onClick={() => {
                                                    Them.handleSetItemPlayVideo(datas[0]);
                                                }}
                                            >
                                                {datas[0].title}
                                            </Link>
                                        </p>
                                        <p className={cx(cx('first-Information'))}>
                                            <span> {datas[0].view} lượt xem</span>

                                            <span>{datas[0].videoPostingData}</span>
                                        </p>
                                    </div>
                                    <div className={cx('text-video')}>
                                        <p>{datas[0].title}</p>
                                        <p>
                                            ------------------------- <br />
                                            Nhớ SUBSCRIBE và nhấn 🔔 để nhận thông báo đầu tiên và cập nhật những sản
                                            phẩm mới nhất từ Sony Music Entertainment Vietnam nhé! 🎵 Listen & Stream |
                                            Nghe audio "Cause I Love You" tại: Spotify​:{' '}
                                        </p>
                                    </div>
                                    <Link
                                        to={`/watch/@${datas[0].video}`}
                                        onClick={() => {
                                            Them.handleSetItemPlayVideo(datas[0]);
                                        }}
                                    >
                                        Đọc Thêm
                                    </Link>
                                </div>
                            </div>
                            <div className={cx('contents')}>
                                <div className={cx('contents-title')}>
                                    <span>Video tải lên</span>

                                    <Buttons
                                        className={cx('btnPlay')}
                                        LeftIcon={<PlayICon className={cx('icon-play')} />}
                                    >
                                        Phát tất cả
                                    </Buttons>
                                </div>
                                <Row gutter={[8, 24]}>
                                    {datas.map((item, index) => {
                                        return (
                                            <Col key={index} span={colum}>
                                                <CrardImage item={item} classCustom={cx('card-image-USERCHANNEL')} />
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
