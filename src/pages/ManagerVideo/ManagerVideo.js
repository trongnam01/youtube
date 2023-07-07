/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useState } from 'react';
import { ThemDefau } from '~/layouts/DefaultLayout';
import Request from '~/api/httpRequest';

import classNames from 'classnames/bind';
import styles from './ManagerVideo.module.scss';
import CustomTable from '~/component/TableCommon';
import { columnConfig } from './constants';
import Image from '~/component/Image';
import { EditOutlined, DeleteOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ButtonAcitions from './components/ButtonActions';
import ModalManagerVideo from './components/ModalManagerVideo';
import './ManagerVideo.scss';
import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ManagerVideo() {
    const them = useContext(ThemDefau);

    const { DataApi, handleLoadAllVideo, handleSetItemPlayVideo } = them;

    const [dataRequest, setDataRequest] = useState({
        page: 0,
        size: 10,
        isUpdate: false,
        dataDetail: {},
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modal, contextHolder] = Modal.useModal();

    const parseData = useCallback((item, field, index) => {
        if (field === 'title') {
            return (
                <>
                    <Link
                        as={'span'}
                        to={`/watch/@${item.video}`}
                        className={cx('wrapper')}
                        onClick={() => handleSetItemPlayVideo(item)}
                        // style={{ cursor: 'pointer' }}
                    >
                        {item[field]}
                    </Link>
                </>
            );
        }
        if (field === 'image') {
            return (
                <>
                    <Image
                        className={cx('imageVideo')}
                        src={
                            item.image ||
                            'https://scontent.fhan2-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p56x56&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=1Rph2yqJK04AX-m8j8z&_nc_ht=scontent.fhan2-2.fna&oh=00_AT-n9X9vkZyDv847ZcME2tZ_z_-GtKio3Jfp90uSMGVOaQ&oe=63787DF8'
                        }
                        alt="imageVideo"
                    />
                </>
            );
        }
        if (field === 'userChannel') {
            return (
                <>
                    <Link
                        as={'span'}
                        to={`/channel/@${item.idName}`}
                        // onClick={() => handleSetItemPlayVideo(item)}
                        style={{ cursor: 'pointer' }}
                    >
                        <Image
                            className={cx('channeImage')}
                            src={
                                item.channeImage ||
                                'https://scontent.fhan2-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p56x56&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=1Rph2yqJK04AX-m8j8z&_nc_ht=scontent.fhan2-2.fna&oh=00_AT-n9X9vkZyDv847ZcME2tZ_z_-GtKio3Jfp90uSMGVOaQ&oe=63787DF8'
                            }
                            alt="channeImage"
                        />
                        {item[field]}
                    </Link>
                </>
            );
        }
        if (field === 'actions') {
            return (
                <div className={cx('container-actions')}>
                    <ButtonAcitions handleClick={handleDetailVideo(item)}>
                        <EditOutlined style={{ fontSize: '16px', color: '#08c' }} />
                    </ButtonAcitions>

                    <ButtonAcitions handleClick={handleRemoveVideo(item)}>
                        <DeleteOutlined style={{ fontSize: '16px', color: 'red' }} />
                    </ButtonAcitions>
                </div>
            );
        }
        if (field === 'stt') {
            return <span>{index + 1}</span>;
        }
        return item[field];
    }, []);

    const handleRemoveVideo = (item) => () => {
        const deleteVideo = () => {
            Request.DeleteVideo(item.id).then(() => {
                handleLoadAllVideo();
            });
        };
        modal.confirm({
            title: 'Bạn có chắc chắn muôn xóa video này ?',
            onOk: deleteVideo,
            cancelText: 'HUỶ',
            okText: 'XÓA',
            icon: <CloseCircleOutlined style={{ color: 'red' }} />,
            okButtonProps: {
                // Tùy chỉnh kiểu dáng cho nút "Không đồng ý"
                style: { backgroundColor: 'red', color: 'white', borderColor: 'red' },
            },
            content: (
                <>
                    <div>
                        Xóa video: <b>{item.title}</b>
                        <br />
                        Kênh:
                        {/* <Image
                            className={cx('channeImage')}
                            src={
                                item.channeImage ||
                                'https://scontent.fhan2-2.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p56x56&_nc_cat=1&ccb=1-7&_nc_sid=7206a8&_nc_ohc=1Rph2yqJK04AX-m8j8z&_nc_ht=scontent.fhan2-2.fna&oh=00_AT-n9X9vkZyDv847ZcME2tZ_z_-GtKio3Jfp90uSMGVOaQ&oe=63787DF8'
                            }
                            alt="channeImage"
                        /> */}
                        <b>{item.userChannel}</b>
                    </div>
                </>
            ),
        });
    };

    const handleDetailVideo = (item) => () => {
        setIsModalOpen(true);
        setDataRequest((res) => ({ ...res, dataDetail: item, isUpdate: true }));
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setDataRequest((res) => ({ ...res, dataDetail: {}, isUpdate: false }));
    };
    const onChangePage = useCallback(
        (page) => {
            const newDataRequest = {
                // ...dataRequest,
                page,
            };
            setDataRequest(newDataRequest);
            handleLoadAllVideo();
            window.scrollTo(0, 0);
            //   handleQuery(newDataRequest);
        },
        [dataRequest.page],
    );
    const handleCreateVideo = () => {
        setIsModalOpen(true);
    };

    return (
        <div className={cx('ManagerVideo')}>
            <div style={{ padding: '20px 0' }}>
                <Button onClick={handleCreateVideo} type="primary">
                    Thêm mới
                </Button>
                {contextHolder}
            </div>

            <CustomTable
                data={DataApi || []}
                parseFunction={parseData}
                // isCheckedAll
                columns={columnConfig}
                isShowPaging
                // isShowCheckbox
                // onSelect={e => {
                //   setArrCheckBox([...e]);
                // }}
                onChangePage={(page) => onChangePage(page - 1)}
                // totalCountData={(dataList && dataList) || 0}
                defaultPage={dataRequest.page + 1}
                currentPage={dataRequest.page + 1}
                totalDisplay={dataRequest.size || 10}
                // classNameTable="grid-appNodeList"
                // isRemoveSelected={isRemoveSelec}
            />

            {isModalOpen && (
                <ModalManagerVideo
                    dataRequest={dataRequest}
                    isModalOpen={isModalOpen}
                    handleCancel={handleCancel}
                    handleLoadAllVideo={handleLoadAllVideo}
                    DataApi={DataApi}
                />
            )}
        </div>
    );
}

export default ManagerVideo;
