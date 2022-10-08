import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import { getListApi, ThemDefau } from '~/layouts/DefaultLayout';
import CardVideo from '~/component/CardVideo';
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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

export function TabPanel(props: TabPanelProps) {
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
export function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Home() {
    const Them = useContext(ThemDefau);
    const [value, setValue] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    const ref = useRef(0);
    console.log(ref.current);

    useEffect(() => {
        ref.current = ref.current + 1;

        if (ref.current === 1) {
            console.log('loop');
            getListApi().then((datas) => {
                console.log(22);
                const ressult = [...datas].sort(() => Math.random() - 0.5);
                setData(ressult);
            });
        }
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setIsLoading(false);
        }
    }, [data]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const handleIsLoading = (value) => {
        console.log(value);
        setIsLoading(value);
    };

    return (
        <div className={cx('wrapper')}>
            {isLoading && (
                <span className={cx('loading')}>
                    <FontAwesomeIcon className={cx('loading-icon')} icon={faSpinner} />{' '}
                </span>
            )}
            <Box sx={{ maxWidth: { xs: 320, sm: '100%' }, bgcolor: 'background.paper' }}>
                <Box
                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                    className={cx('Header-content')}
                    style={{
                        marginLeft:
                            Them.width >= 1440
                                ? !Them.tongleSideBar
                                    ? 'var(--width-sideBar-show)'
                                    : 'var(--width-sideBar-hide)'
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
                            <TabsHome index={index} isLoading={isLoading} datas={data} loading={handleIsLoading} />
                        </TabPanel>
                    );
                })}
            </Box>
        </div>
    );
}
function TabsHome({ index, loading, isLoading, datas }) {
    const Them = useContext(ThemDefau);
    const [colum, setColum] = useState();
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
    const Tabs = ({ items }) => {
        return (
            <Row gutter={[16, 40]}>
                {items.map((item, index) => (
                    <Col key={index} span={colum}>
                        <CardVideo index={index} item={item} />
                    </Col>
                ))}
            </Row>
        );
    };

    switch (index) {
        case 0:
            return <Tabs items={datas} />;
        case 2:
            break;
    }
}

export default Home;
