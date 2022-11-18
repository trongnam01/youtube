import { useContext, useEffect, useState } from 'react';
import { ThemDefau } from '~/layouts/DefaultLayout';
import classNames from 'classnames/bind';

import styles from './Channels.module.scss';
import './Channels.scss';
import Image from '~/component/Image';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { Modal } from 'antd';
import { BellIcon } from '~/Icons';
import { addRegister, unRegister } from '~/redux/dataUserSplice';

const cx = classNames.bind(styles);
const FrameItem = ({ item }) => {
    const dispatch = useDispatch();
    const [isRegister, setIsRegister] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        if (isRegister) {
            setIsModalOpen(true);
        } else {
            const dataId = {
                idName: item.idName,
                IduserChannel: item.IduserChannel,
            };
            setIsRegister(false);
            dispatch(addRegister(dataId));
        }
    };

    const handleOk = () => {
        const dataId = {
            idName: item.idName,
            IduserChannel: item.IduserChannel,
        };
        dispatch(unRegister(dataId));
        // setIsRegister(true);

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className={cx('frame-item-channel')}>
            <div className={cx('avatar-channel')}>
                <Image src={item.channeImage.replace(/88/g, '176')} />
            </div>
            <div className={cx('frame-item-content')}>
                <span>{item.userChannel}</span>
                <div className={cx('infomation-channel')}>
                    <span>{item.registerChannel} người đăng ký </span>
                    <span className={cx('icon-content')}>•</span>
                    <span> 402 video </span>
                </div>
            </div>
            <div className={cx('frame-item-footer')}>
                <Button className={cx('btn-sub-channel', { Registered: isRegister })} onClick={showModal}>
                    {isRegister ? 'Đã đăng ký' : 'Đăng ký'}
                </Button>

                <span className={cx('icon-bell')}>{isRegister && <BellIcon />}</span>
                <Modal
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    cancelText={'Hủy'}
                    okText={'Hủy đăng ký'}
                    className={cx('modal-channels', 'modal-channels-channels')}
                    centered
                >
                    Hủy đăng ký ?
                </Modal>
            </div>
        </div>
    );
};

function Channels() {
    const them = useContext(ThemDefau);
    const { DataApi } = them;

    const [subscribed, setSubscribed] = useState([]);

    const subscribedChanel = useSelector((state) => state.dataUser.data.subscribedChanel);

    useEffect(() => {
        if (DataApi.length > 0) {
            const filterChannel = subscribedChanel.map((item) => {
                const result = DataApi.find(function (sub) {
                    return item.IduserChannel === sub.IduserChannel && item.IduserChannel === sub.IduserChannel;
                });
                return result;
            });
            setSubscribed(filterChannel);
        }
    }, [subscribedChanel]);

    return (
        <article className={cx('Channels')}>
            <div className={cx('wrapper')}>
                {subscribed.map((item, index) => {
                    return <FrameItem item={item} key={index} />;
                })}
            </div>
        </article>
    );
}

export default Channels;
