import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { ThemDefau } from '~/layouts/DefaultLayout';
import styles from './UserChannel.module.scss';
import './UserChannel.scss';
import { BellIcon, PlayICon, SearchIcon } from '~/Icons';
import Video from '~/component/Video';
import { Button, Col, Modal, Row } from 'antd';
import CrardImage from '~/component/CardImage';
import Buttons from '~/component/Buttons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import { addRegister, unRegister } from '~/redux/dataUserSplice';

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
    const dispatch = useDispatch();

    const Them = useContext(ThemDefau);
    const [colum, setColum] = useState();
    const [isRegister, setIsRegister] = useState(false);

    const [value, setValue] = useState(0);
    const inputRef = useRef();
    const [datas, setDatas] = useState([{}]);
    const { width } = Them;
    const refTabs = useRef();

    const selectorRgisterChannel = useSelector((state) => state.dataUser.data.subscribedChanel);
    useEffect(() => {
        let prevScrollpos = window.pageYOffset;
        let handeleScroll = () => {};
        handeleScroll = () => {
            if (width < 877) {
                let currentScrollPos = window.pageYOffset;
                if (prevScrollpos > currentScrollPos) {
                    refTabs.current.style.top = '48px';
                } else {
                    refTabs.current.style.top = '-66px';
                }
                prevScrollpos = currentScrollPos;
            } else {
                refTabs.current.style.top = '48px';
            }
        };
        window.addEventListener('scroll', handeleScroll);

        return () => {
            window.removeEventListener('scroll', handeleScroll);
        };
    }, [width]);

    useEffect(() => {
        const fiter = selectorRgisterChannel.some((item) => {
            return item.idName === datas[0].idName && item.IduserChannel === datas[0].IduserChannel;
        });
        setIsRegister(fiter);
    }, [selectorRgisterChannel, datas]);

    useEffect(() => {
        const pat = Them.locotion.pathname.slice(10);
        const result = Them.DataApi.filter((item) => {
            return pat === item.idName;
        });

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenCurrent, setIsModalOpenCurrent] = useState(false);

    const showModal = () => {
        if (Them.currentUser) {
            setIsModalOpenCurrent(false);
            if (isRegister) {
                setIsModalOpen(true);
            } else {
                const dataId = {
                    idName: datas[0].idName,
                    IduserChannel: datas[0].IduserChannel,
                };
                dispatch(addRegister(dataId));
            }
        } else {
            setIsModalOpenCurrent(true);
        }
    };

    const handleOk = () => {
        const dataId = {
            idName: datas[0].idName,
            IduserChannel: datas[0].IduserChannel,
        };
        dispatch(unRegister(dataId));

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalOpenCurrent(false);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <div className={cx('wrapper', 'wrapper-USERCHANNEL')}>
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
                    <Button className={cx({ Registered: isRegister })} onClick={showModal}>
                        {isRegister ? 'Đã đăng ký' : 'Đăng ký'}
                    </Button>
                    <span className={cx('icon-bell')}>{isRegister && <BellIcon />}</span>
                    <Modal
                        key={1}
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        cancelText={'Hủy'}
                        okText={'Hủy đăng ký'}
                        className={cx('modal-register', 'modal-register2')}
                        centered
                    >
                        Hủy đăng ký {datas[0].userChannel}?
                    </Modal>
                    <Modal
                        className={cx('modal-register', 'modal-register2')}
                        key={2}
                        closable={false}
                        open={isModalOpenCurrent}
                        onCancel={handleCancel}
                        footer={[
                            <Link to={'/login'} className={cx('link-login')}>
                                Đăng nhập
                            </Link>,
                        ]}
                        centered
                    >
                        <h4>Bạn muốn đăng ký kênh này?</h4>
                        <span className={cx('text-modal')}>Đăng nhập để đăng ký kênh này.</span>
                    </Modal>
                </div>
            </div>
            <div className={cx('content-user-channel', 'content-user-channel-USERCHANNEL')}>
                <Box sx={{ width: '100%' }}>
                    <Box
                        ref={refTabs}
                        className={'tabs-USERCHANNEL'}
                        sx={{ borderBottom: 1, borderColor: 'transparent' }}
                    >
                        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
                            {menuUserChannel.map((item, index) => {
                                return (
                                    <Tab key={index} label={item} {...a11yProps(index)} className={cx('tabs-menu')} />
                                );
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
