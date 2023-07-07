import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '~/component/Image';
import moment from 'moment';

import { OpenCommentsIcon } from '~/Icons';
import { ThemDefau } from '~/layouts/DefaultLayout';
import CardImage from '../../component/CardImage';
import Video from '../../component/Video';
import { a11yProps, TabPanel } from '../Home/Home';
import CommentVideo from './component/CommentVideo';
import { useDispatch } from 'react-redux';
import styles from './PlayVideo.module.scss';
import './PlayVideo.scss';
import { addView } from '~/redux/dataUserSplice';
import ActionVideo from './component/ActionVideo';

const cx = classNames.bind(styles);

const itemTabsCrad = [
    { title: 'Tất cả' },
    { title: 'Video có liên quan' },
    { title: 'Của Viscenfil' },
    { title: 'Trực tiếp' },
    { title: 'Tải lên gần đây' },
    { title: 'Đã xem' },
];

const opts = {
    playerVars: {
        autoplay: 1,
        loop: 1,
    },
};

function PlayVideo() {
    const Them = useContext(ThemDefau);
    const { itemVideoPlay, DataApi, locotion } = Them;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [value, setValue] = useState(0);
    const [colum, setColum] = useState(false);

    const [isshowContent, setIsshowContent] = useState(false);
    const [videoPlay, setVideoPlay] = useState({});
    const [datas, setDatas] = useState([DataApi]);
    const [IsCommentsMobi, setIsCommentsMobi] = useState(false);

    useEffect(() => {
        if (!(Object.keys(videoPlay).length === 0)) {
            dispatch(addView(videoPlay));
        }
    }, [videoPlay]);

    useEffect(() => {
        setDatas(() => {
            const result = [...DataApi].sort(() => Math.random() - 0.5);
            return result;
        });
        setVideoPlay(() => {
            const idVideo = locotion.pathname.slice(8);
            const result =
                DataApi.find((item) => {
                    return item.video === idVideo;
                }) || [];
            return itemVideoPlay.length === 0 ? result : itemVideoPlay;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [DataApi, itemVideoPlay]);
    useEffect(() => {
        const number = Them.width;

        if (number <= 1050) {
            setColum(true);
        } else {
            setColum(false);
        }
    }, [Them.width]);
    const handleChangeUserChannel = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const custumName = videoPlay.idName;
        navigate(`/channel/@${custumName}`);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleIsItemsmobi = (value) => () => {
        switch (value) {
            case 'show':
                setIsCommentsMobi(true);
                document.body.style.overflow = 'hidden';
                break;
            case 'hide':
                setIsCommentsMobi(false);
                document.body.style.overflow = 'overlay';
                break;
            default:
        }
    };
    const handleGetDate = (value) => {
        if (value && moment(value).isValid()) {
            console.log(value);
            return (
                moment(value).format('DD') +
                ' ' +
                'th' +
                moment(value).format('MM') +
                ' ' +
                moment(value).format('YYYY')
            );
        }
    };
    return (
        <div className={cx('wrapper', 'wrapper-PLAYVIDEO')}>
            <Row gutter={[24, 16]}>
                <Col span={colum ? 24 : 16} className={cx('colum-mobile')}>
                    <div className={cx('wrapper-left')}>
                        <div className={cx('wrapper-video')}>
                            <Video item={itemVideoPlay.length === 0 ? videoPlay : itemVideoPlay} opts={opts} />
                            <div className={cx('wrapper-content')}>
                                <p className={cx('super-title')}>
                                    <a href="#">#nonstop2022</a>
                                    <a href="#">#nhactreremix</a>
                                    <a href="#">#nhacsanpro</a>
                                </p>
                                <h1 className={cx('wraper-content-title')}>{videoPlay.title}</h1>
                                <div className={cx('contai-interaction')}>
                                    <p className={cx(cx('first-Information'))}>
                                        <span>{videoPlay.view} lượt xem</span>

                                        <span>{handleGetDate(videoPlay.videoPostingData)}</span>
                                    </p>
                                    <ActionVideo videoPlay={videoPlay} />
                                </div>
                            </div>
                            <div className={cx('wrapper-information')}>
                                <div className={cx('contai-channel')}>
                                    <div onClick={handleChangeUserChannel}>
                                        <Image className={cx('avatar-user')} src={videoPlay.channeImage} alt="avatar" />
                                    </div>
                                    <div className={cx('user-channel')}>
                                        <span className={cx('user-name')} onClick={handleChangeUserChannel}>
                                            {videoPlay.userChannel}
                                        </span>
                                        <span className={cx('user-subscriber')}>
                                            {videoPlay.registerChannel} người đăng ký
                                        </span>
                                    </div>

                                    <button className={cx('register-btn')}>Đăng ký</button>
                                </div>
                                <div className={cx('commnets-length-mobi')}>
                                    <span>
                                        <strong>Bình luận</strong> • 3{' '}
                                    </span>
                                    <button onClick={handleIsItemsmobi('show')}>
                                        <OpenCommentsIcon />
                                    </button>
                                </div>
                                <div
                                    className={cx('information-content')}
                                    style={{ height: isshowContent ? 'auto' : '60px' }}
                                >
                                    <span className={cx('information-content-title')}>
                                        {videoPlay.title}
                                        <br />
                                    </span>
                                    <a href="https://www.youtube.com/redirect?event=video_description&amp;redir_token=QUFFLUhqbU56S2tIQ1h3d2xNa1ZISGRPZlR3X28zRzlVZ3xBQ3Jtc0tsVEVwMV8tRUdFSE1GZUhNdkRCNVBTbDNKTHRfOW5XTWVEVGJmY0pOWjlSMFc2QjRtUV8tckg0YmZzOTZJdXA5cjI4bzAzVjRHVE5Rd1Fodll1bHB2aDNad25aeWVxR25OWVNETkk0NWEwOFIyTnY0UQ&amp;q=http%3A%2F%2Fbit.ly%2F2YT0dK9&amp;v=JgdXcwuggpU">
                                        #{videoPlay.userChannel}
                                    </a>
                                    <a href="https://www.youtube.com/redirect?event=video_description&amp;redir_token=QUFFLUhqbU56S2tIQ1h3d2xNa1ZISGRPZlR3X28zRzlVZ3xBQ3Jtc0tsVEVwMV8tRUdFSE1GZUhNdkRCNVBTbDNKTHRfOW5XTWVEVGJmY0pOWjlSMFc2QjRtUV8tckg0YmZzOTZJdXA5cjI4bzAzVjRHVE5Rd1Fodll1bHB2aDNad25aeWVxR25OWVNETkk0NWEwOFIyTnY0UQ&amp;q=http%3A%2F%2Fbit.ly%2F2YT0dK9&amp;v=JgdXcwuggpU">
                                        #PhamMinhThanh
                                    </a>
                                    <a href="https://www.youtube.com/redirect?event=video_description&amp;redir_token=QUFFLUhqbU56S2tIQ1h3d2xNa1ZISGRPZlR3X28zRzlVZ3xBQ3Jtc0tsVEVwMV8tRUdFSE1GZUhNdkRCNVBTbDNKTHRfOW5XTWVEVGJmY0pOWjlSMFc2QjRtUV8tckg0YmZzOTZJdXA5cjI4bzAzVjRHVE5Rd1Fodll1bHB2aDNad25aeWVxR25OWVNETkk0NWEwOFIyTnY0UQ&amp;q=http%3A%2F%2Fbit.ly%2F2YT0dK9&amp;v=JgdXcwuggpU">
                                        #SMEVN
                                    </a>
                                    <br />
                                    <span className={cx('formatted-string')}>
                                        ------------------------- <br />
                                        Đừng quên SUBSCRIBE và nhấn 🔔 để nhận thông báo đầu tiên và cập nhật những sản
                                        phẩm mới nhất từ Sony Music Entertainment Vietnam nhé! <br />
                                        🎵 Listen & Stream | Nghe audio "Miền An Nhiên" tại: <br />
                                        NCT:
                                    </span>
                                    <a href="https://www.youtube.com/redirect?event=video_description&amp;redir_token=QUFFLUhqbU56S2tIQ1h3d2xNa1ZISGRPZlR3X28zRzlVZ3xBQ3Jtc0tsVEVwMV8tRUdFSE1GZUhNdkRCNVBTbDNKTHRfOW5XTWVEVGJmY0pOWjlSMFc2QjRtUV8tckg0YmZzOTZJdXA5cjI4bzAzVjRHVE5Rd1Fodll1bHB2aDNad25aeWVxR25OWVNETkk0NWEwOFIyTnY0UQ&amp;q=http%3A%2F%2Fbit.ly%2F2YT0dK9&amp;v=JgdXcwuggpU">
                                        http://bit.ly/2YT0dK9
                                    </a>
                                    <br />
                                    <span>-------------------------</span>
                                    <br />
                                    <span>
                                        © Bản quyền thuộc về SME <br />
                                        © Bản Việt hóa thuộc về SMEVN <br /> © Copyright by SMEVN ☞ Do not Re-up!
                                    </span>
                                    <br />
                                    <span style={{ display: 'block', marginTop: '15px' }}></span>
                                    <span>
                                        ►Fanpage:{' '}
                                        <a href="https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqazQ2ZkNwUElGbXB3bC1SdkVhMkRDQkI1NGNSd3xBQ3Jtc0ttSTlMbkgwUUowa1RhMDhqdmwyaU11Y0ttTTFxdnpqamdkMi14OVM4U0dBR21BbmZHQ1pUZVBQTVh5SnFKUk1mVGVSR3QyUFpGcXJvWFVCRUFBUlIyVzZ6OWlHYWs3bnVmNU03WXgwb3E2UzZ6SktlSQ&q=https%3A%2F%2Fwww.facebook.com%2FSonyMusicEnt..&v=JgdXcwuggpU">
                                            {' '}
                                            https://www.facebook.com/SonyMusicEnt..
                                        </a>
                                    </span>{' '}
                                    <br />
                                    <span>
                                        ►Instagram:
                                        <a href="https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqazQ2ZkNwUElGbXB3bC1SdkVhMkRDQkI1NGNSd3xBQ3Jtc0ttSTlMbkgwUUowa1RhMDhqdmwyaU11Y0ttTTFxdnpqamdkMi14OVM4U0dBR21BbmZHQ1pUZVBQTVh5SnFKUk1mVGVSR3QyUFpGcXJvWFVCRUFBUlIyVzZ6OWlHYWs3bnVmNU03WXgwb3E2UzZ6SktlSQ&q=https%3A%2F%2Fwww.facebook.com%2FSonyMusicEnt..&v=JgdXcwuggpU">
                                            {' '}
                                            https://www.facebook.com/SonyMusicEnt..
                                        </a>
                                    </span>
                                    <br />
                                    <span>
                                        ►YouTube:
                                        <a href="https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqazQ2ZkNwUElGbXB3bC1SdkVhMkRDQkI1NGNSd3xBQ3Jtc0ttSTlMbkgwUUowa1RhMDhqdmwyaU11Y0ttTTFxdnpqamdkMi14OVM4U0dBR21BbmZHQ1pUZVBQTVh5SnFKUk1mVGVSR3QyUFpGcXJvWFVCRUFBUlIyVzZ6OWlHYWs3bnVmNU03WXgwb3E2UzZ6SktlSQ&q=https%3A%2F%2Fwww.facebook.com%2FSonyMusicEnt..&v=JgdXcwuggpU">
                                            {' '}
                                            https://www.facebook.com/SonyMusicEnt..
                                        </a>
                                    </span>
                                </div>
                                <button
                                    className={cx('isShow-content-btn')}
                                    onClick={() => setIsshowContent(!isshowContent)}
                                >
                                    {isshowContent ? 'ẩn bới' : 'hiện thêm'}
                                </button>
                            </div>

                            <div className={cx('comment-dellTop')}>
                                <CommentVideo />
                            </div>
                            {IsCommentsMobi && (
                                <div className={cx('comment-mobile')}>
                                    <div className={cx('contai-mobile')}>
                                        <div className={cx('header-comments-mobi')}>
                                            <div className={cx('line')}></div>
                                            <div className={cx('header-title')}>
                                                <span>Bình luận</span>
                                                <button onClick={handleIsItemsmobi('hide')}>
                                                    <FontAwesomeIcon icon={faXmark} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className={cx('comments')}>
                                            <CommentVideo />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Col>
                <Col span={colum ? 24 : 8} className={cx('colum-mobile')}>
                    <div className={cx('wrapper-right', 'wrapper-right-PLAYVIDEO')}>
                        <Box sx={{ maxWidth: { xs: 320, sm: '100%' }, bgcolor: 'background.paper' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
                                    {itemTabsCrad.map((item, index) => {
                                        return (
                                            <Tab
                                                key={index}
                                                label={item.title}
                                                {...a11yProps(index)}
                                                className={cx('tabs-btn')}
                                            />
                                        );
                                    })}
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                {datas.map((item, index) => {
                                    return <CardImage key={index} item={item} classCustom={cx('card-PLAYVIDEO')} />;
                                })}
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                Item Three
                            </TabPanel>
                        </Box>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default PlayVideo;
