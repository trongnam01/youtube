import classNames from 'classnames/bind';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ThemDefau } from '~/layouts/DefaultLayout';
import styles from './UserChannel.module.scss';
import './UserChannel.scss';
import { SearchIcon } from '~/Icons';
import { Button, Form, Input, Modal } from 'antd';
import { useSelector } from 'react-redux';

import { ItemFormCreateVideo } from './constants';

import 'antd/dist/antd.css';

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

const initialState = {
    idChannel: '',
    coverImage: '',
    channeImage: '',
    video: '',
    title: '',
    videoTime: '',
    image: '',
    userChannel: '',
    IduserChannel: '',
    date: '',
    like: '',
};

function UserChannel() {
    // const dispatch = useDispatch();

    // const [form] = Form.useForm();

    const schema = yup
        .object()
        .shape({
            idChannel: yup.string().required('Vui lòng nhập trường này'),
            // age: yup.number().required(),
        })
        .required();

    const {
        handleSubmit,
        control,
        reset,
        trigger,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialState,
    });

    const secletors =
        useSelector((state) => {
            const length = state.user.length;

            return state.user[length - 1];
        }) || {};

    useMemo(() => {
        console.log(secletors);
    }, [secletors]);

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    const Them = useContext(ThemDefau);
    const [colum, setColum] = useState();
    const [isRegister, setIsRegister] = useState(false);

    const [value, setValueTabs] = useState(0);
    const inputRef = useRef();
    const [datas, setDatas] = useState([{}]);
    const { width } = Them;
    const refTabs = useRef();

    const selectorRgisterChannel = useSelector((state) => state.dataUser.data.subscribedChanel);

    useEffect(() => console.log(secletors), [secletors]);
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

    const handleCancel = () => {
        setIsModalOpen(false);
        reset(initialState);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValueTabs(newValue);
    };
    const handleOK = () => {
        // form.submit();
    };
    const handleCreateVideo = () => {
        setIsModalOpen(true);
    };

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    return (
        <div className={cx('wrapper', 'YourChannel')}>
            <div className="d-flex">
                <div className={cx('header')}>
                    <div className={cx('header-user-channel')}>
                        <img src={secletors.image} alt={datas[0].userChannel} />
                        <div className={cx('header-information')}>
                            <span className={cx('user-name')}>{secletors.name}</span>
                            <span className={cx('subscribers')}>{secletors.email}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Button onClick={handleCreateVideo}>Thêm mới video</Button>
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

                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                </Box>
            </div>

            {isModalOpen && (
                <Modal open={isModalOpen} onOk={handleOK} onCancel={handleCancel} width={800} title="Thêm video">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {ItemFormCreateVideo.map((elment) => {
                            return (
                                <div className="container-item-form">
                                    {elment.map((item) => {
                                        const { field, label } = item;
                                        // console.log(field);
                                        // console.log(errors[field] && errors[field], errors[field] && errors[field].message);

                                        const message = errors[field] && errors[field].message;
                                        console.log(message);
                                        return (
                                            <Controller
                                                key={field}
                                                name={field}
                                                control={control}
                                                // rules={{ required: true }}
                                                render={({ field }) => (
                                                    <Form.Item
                                                        label={label}
                                                        name={field}
                                                        validateStatus={message && 'error'}
                                                        help={message}
                                                        labelCol={{ span: 24 }}
                                                        style={{ width: '100%' }}
                                                    >
                                                        <Input
                                                            {...field}
                                                            onChange={(e) => {
                                                                console.log(e.target.value);
                                                                setValue(field.name, e.target.value);
                                                                trigger(field.name);
                                                            }}
                                                            placeholder={label}
                                                        />
                                                    </Form.Item>
                                                )}
                                            />
                                        );
                                    })}
                                </div>
                            );
                        })}

                        <input type="submit" />
                    </form>
                </Modal>
            )}
        </div>
    );
}

export default UserChannel;
