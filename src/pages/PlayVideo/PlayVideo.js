import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '~/component/Image';

import { OpenCommentsIcon } from '~/Icons';
import { ThemDefau } from '~/layouts/DefaultLayout';
import CardImage from '../../component/CardImage';
import Video from '../../component/Video';
import { a11yProps, TabPanel } from '../Home/Home';
import CommentVideo from './component/CommentVideo';
import { useDispatch } from 'react-redux';
import styles from './PlayVideo.module.scss';
import './PlayVideo.scss';
import { debounce } from 'lodash';

import { addView } from '~/redux/dataUserSplice';
import ActionVideo from './component/ActionVideo';
import { formatViewCount, handleGetTimeDate } from '~/Commonts';
import Request from '~/api/httpRequest';

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
    const { itemVideoPlay, DataApi, locotion, setisLoading, refPageToken, setDataApi, handleLoadAllVideo } = Them;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [value, setValue] = useState(0);
    const [colum, setColum] = useState(false);

    const [isShowContent, setIsShowContent] = useState(false);
    const [IsCommentsMobi, setIsCommentsMobi] = useState(false);
    const [dataComments, setdataComments] = useState([]);

    const videoDetailRef = useRef({});
    const dataResponCommentRef = useRef({});
    const dataRequest = useRef({
        sizeVideo: 30,
        sizeComment: 22,
    });

    //
    const debounGetVideo = debounce(() => handleLoadAllVideo(dataRequest.current.sizeVideo), 300);

    const debounNextPageToken = debounce(() => {
        // check khi het comments
        if (dataResponCommentRef.current.nextPageToken) {
            handleGetComments(videoDetailRef.current, dataResponCommentRef.current.nextPageToken);
        }
    }, 300);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            const visibleHeight = document.documentElement.clientHeight;
            const totalHeight = document.documentElement.scrollHeight;

            if (scrollY + visibleHeight >= totalHeight - 100 && Object.keys(videoDetailRef.current).length) {
                setisLoading(true);

                debounGetVideo();
                debounNextPageToken();
            }
        };
        window.scrollTo(0, 0);

        window.addEventListener('scroll', handleScroll);
        handleLoadAllVideo(dataRequest.current.sizeVideo);

        // Xóa sự kiện khi unmount component
        return () => {
            setDataApi([]);
            refPageToken.current = '';
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleGetComments = async (element, nextPageToken = '') => {
        const getComments = await Request.getCommentsVideoDetail(
            element.id,
            dataRequest.current.sizeComment,
            nextPageToken,
        ).then((res) => {
            dataResponCommentRef.current = res.data;
            const custumData = res.data.items.map((el) => el.snippet);
            setisLoading(false);
            return custumData;
        });
        setdataComments((res) => [...res, ...getComments]);
    };

    useEffect(() => {
        const handleGetDetail = async () => {
            const idVideo = locotion.pathname.slice(8);

            const getChannelIcon = async (element) => {
                const channelUrl = await Request.getdataChannelID(element.snippet.channelId);
                element.channelUrl = channelUrl.data.items[0].snippet.thumbnails.default.url;
                element.subscriberCount = channelUrl.data.items[0].statistics.subscriberCount;
            };

            const res = await Request.getdataVideoDetail(idVideo).then((respon) => {
                let result = respon.data.items[0];
                getChannelIcon(result);
                handleGetComments(result);
                setisLoading(false);

                // get xong lần đầu set lại size khi cuộn cho đều nhau
                dataRequest.current = {
                    ...dataRequest.current,
                    sizeVideo: 20,
                    sizeComment: 21,
                };

                return result;
            });

            videoDetailRef.current = res;
            dispatch(addView(videoDetailRef.current));
        };
        setisLoading(true);
        handleGetDetail();
    }, []);

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
        const custumName = videoDetailRef.current.idName;
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

    return (
        <div className={cx('wrapper', 'wrapper-PLAYVIDEO')}>
            <Row gutter={[24, 16]}>
                <Col span={colum ? 24 : 16} className={cx('colum-mobile')}>
                    <div className={cx('wrapper-left')}>
                        <div className={cx('wrapper-video')}>
                            <Video
                                item={itemVideoPlay.length === 0 ? videoDetailRef.current : itemVideoPlay}
                                opts={opts}
                            />
                            <div className={cx('wrapper-content')}>
                                <h1 className={cx('wraper-content-title')}>{videoDetailRef.current?.snippet?.title}</h1>
                                <div className={cx('contai-interaction')}>
                                    <p className={cx(cx('first-Information'))}>
                                        <span>
                                            {formatViewCount(videoDetailRef.current?.statistics?.viewCount)} lượt xem
                                        </span>

                                        <span>{handleGetTimeDate(videoDetailRef.current?.snippet?.publishedAt)}</span>
                                    </p>
                                    <ActionVideo videoPlay={videoDetailRef.current} />
                                </div>
                            </div>
                            <div className={cx('wrapper-information')}>
                                <div className={cx('contai-channel')}>
                                    <div onClick={handleChangeUserChannel}>
                                        {videoDetailRef.current?.channelUrl && (
                                            <Image
                                                className={cx('avatar-user')}
                                                src={videoDetailRef.current?.channelUrl}
                                                alt="avatar"
                                            />
                                        )}
                                    </div>
                                    <div className={cx('user-channel')}>
                                        <span className={cx('user-name')} onClick={handleChangeUserChannel}>
                                            {videoDetailRef.current?.snippet?.channelTitle}
                                        </span>
                                        <span className={cx('user-subscriber')}>
                                            {formatViewCount(videoDetailRef.current?.subscriberCount)} người đăng ký
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
                                    style={{ height: isShowContent ? 'auto' : '72px' }}
                                >
                                    <span className={cx('information-content-title')}>
                                        {videoDetailRef.current?.snippet?.title}
                                        <br />
                                    </span>
                                    <span className={cx('information-content_description')}>
                                        {videoDetailRef.current?.snippet?.description}
                                    </span>
                                </div>
                                <button
                                    className={cx('isShow-content-btn')}
                                    onClick={() => setIsShowContent(!isShowContent)}
                                >
                                    {isShowContent ? 'ẩn bới' : 'hiện thêm'}
                                </button>
                            </div>

                            <div className={cx('comment-dellTop')}>
                                <CommentVideo videoPlay={videoDetailRef.current} dataComments={dataComments} />
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
                                            <CommentVideo
                                                dataComments={dataComments}
                                                videoPlay={videoDetailRef.current}
                                            />
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
                                {DataApi.map((item, index) => {
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
