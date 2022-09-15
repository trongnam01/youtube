import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import React, { useContext, useRef, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Typography, Grid } from '@mui/material';
import { ThemDefau } from '~/layouts/DefaultLayout';
import CardVideo from '~/component/CardVideo';
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import ReactPlayer from 'react-player/youtube';
import YouTube from 'react-youtube';
// import Duration from './Duration';
const cx = classNames.bind(styles);

const ItemHeaderSideBar = [
    {
        title: 'Tất cả',
    },
    {
        title: 'Trực tiếp',
    },
    {
        title: 'Danh sách kết hợp',
    },
    {
        title: 'Trò chơi',
    },
    {
        title: 'Âm nhạc',
    },
    {
        title: 'Đọc rap',
    },
    {
        title: 'Thiên nhiên',
    },
    {
        title: 'Mới tải lên gần đây',
    },
    {
        title: 'Đã xem',
    },
];

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
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Home() {
    const ThemTongleSideBar = useContext(ThemDefau);
    const [value, setValue] = useState(0);

    const Ref = useRef();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    // const opts = {
    //     height: '390',
    //     width: '640',
    //     playerVars: {
    //         // https://developers.google.com/youtube/player_parameters
    //         autoplay: 1,
    //     },
    // };

    return (
        <div className={cx('wrapper')}>
            <Box sx={{ maxWidth: { xs: 320, sm: '100%' }, bgcolor: 'background.paper' }}>
                <Box
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                    className={cx('Header-content')}
                    style={{
                        marginLeft: !ThemTongleSideBar.tongleSideBar
                            ? 'var(--width-sideBar-show)'
                            : 'var(--width-sideBar-hide)',
                    }}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        // aria-label="basic tabs example"
                        variant="scrollable"
                        scrollButtons="auto"
                        // aria-label="scrollable auto tabs example"
                    >
                        {ItemHeaderSideBar.map((item, index) => {
                            return (
                                <Tab key={index} label={item.title} {...a11yProps(index)} className={cx('tabs-btn')} />
                            );
                        })}
                    </Tabs>
                </Box>
                {ItemHeaderSideBar.map((item, index) => {
                    return (
                        <TabPanel key={index} value={value} index={index} className={cx('contai-content')}>
                            <Row gutter={[16, 40]}>
                                {Array.from(Array(8)).map((_, index) => (
                                    <Col key={index} span={6}>
                                        <CardVideo index={index} />
                                    </Col>
                                ))}
                            </Row>
                        </TabPanel>
                    );
                })}

                <TabPanel value={value} index={0}>
                    {/* <ReactPlayer
                        onDuration={handleDuration}
                        volume={0}
                        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                    /> */}
                    {/* <YouTube
                        ref={Ref}
                        videoId="ysz5S6PUM-U"
                        title={'aaaa'}
                        onStateChange={() => {
                            console.log(Ref.current);
                        }}
                    /> */}
                    ;
                </TabPanel>
            </Box>
        </div>
    );
}

export default Home;
