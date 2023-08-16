/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useState } from 'react';
import { ThemDefau } from '~/layouts/DefaultLayout';

import Request from '~/api/httpRequest';
import classNames from 'classnames/bind';
import styles from './ManagerAccounts.module.scss';
import CustomTable from '~/component/TableCommon';
import { columnConfig } from './constants';
import {
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    CheckCircleFilled,
    CloseCircleFilled,
} from '@ant-design/icons';
import ButtonAcitions from './components/ButtonActions';
import './ManagerAccounts.scss';
import Image from '~/component/Image';
import { Modal } from 'antd';
import ModalUpdateAccount from './components/ModalUpdateAccount';

const cx = classNames.bind(styles);

function ManagerAccounts() {
    const them = useContext(ThemDefau);

    const { setisLoading, messageApi } = them;

    const [dataRequest, setDataRequest] = useState({
        page: 0,
        size: 10,
        isUpdate: false,
        dataDetail: {},
    });
    const [dataUpdateAccount, setUpdateAccount] = useState({
        isUpdate: false,
        dataDetail: {},
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataAccounts, setDataAccounts] = useState([]);
    const [modal, contextHolder] = Modal.useModal();

    useEffect(() => {
        handleCallDataLogin();
    }, []);

    const handleCallDataLogin = async () => {
        setisLoading(true);
        const Response = await Request.getAllUser().then((datas) => datas);

        setDataAccounts(Response);
        setisLoading(false);

        return Response;
    };

    const parseData = useCallback((item, field, index) => {
        if (field === 'name') {
            return (
                <>
                    <Image className={cx('channeImage')} src={item.image} alt="channeImage" />
                    {item[field]}
                </>
            );
        }
        if (field === 'actions') {
            return (
                <div className={cx('container-actions')}>
                    <ButtonAcitions disabled={item.isUpdate} handleClick={handleUpdateAccount(item)}>
                        <EditOutlined style={{ fontSize: '16px', color: '#08c' }} />
                    </ButtonAcitions>
                    <ButtonAcitions handleClick={handleRemoveAccount(item)}>
                        <DeleteOutlined style={{ fontSize: '16px', color: 'red' }} />
                    </ButtonAcitions>
                </div>
            );
        }
        if (field === 'admin') {
            if (!item.admin) {
                return (
                    <>
                        <CloseCircleFilled style={{ color: '#ff4d4f', fontSize: '24px' }} />
                    </>
                );
            }
            return (
                <>
                    <CheckCircleFilled style={{ color: '#75dc43', fontSize: '24px' }} />
                </>
            );
        }
        if (field === 'stt') {
            return <span>{index + 1}</span>;
        }
        return item[field];
    }, []);

    const handleUpdateAccount = (item) => () => {
        setIsModalOpen(true);
        setUpdateAccount({ dataDetail: item, isUpdate: true });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setUpdateAccount({ dataDetail: {}, isUpdate: false });
    };
    const handleMessage = (content, type) => {
        messageApi.open({
            type: type,
            className: 'messageSuccess',
            content: content,
        });
    };

    const handleRemoveAccount = (item) => () => {
        const deleteVideo = () => {
            setisLoading(true);
            Request.DeleteAccount(item.id).then(() => {
                Request.DeleteDataAccount(item.id);
                handleCallDataLogin();
                setisLoading(false);
                messageApi.open({
                    type: 'success',
                    className: 'messageSuccess',
                    content: 'Xóa tài khoản thành công',
                });
            });
        };

        modal.confirm({
            title: 'Bạn có chắc chắn muôn xóa tài khoản này?',
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
                        Bạn chắc chắn muốn xóa tài khoản:
                        <br />
                        <Image className="ManageAccount-image" src={item.image} alt="image" />
                        <b>{item.name}</b>
                        <br />
                        Email: <b>{item.email}</b>
                    </div>
                </>
            ),
        });
    };

    const onChangePage = useCallback(
        (page) => {
            const newDataRequest = {
                // ...dataRequest,
                page,
            };
            setDataRequest(newDataRequest);
            window.scrollTo(0, 0);
            //   handleQuery(newDataRequest);
        },
        [dataRequest.page],
    );

    return (
        <div className={cx('ManagerAccounts')}>
            {contextHolder}
            <CustomTable
                data={dataAccounts || []}
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
                <ModalUpdateAccount
                    dataUpdateAccount={dataUpdateAccount}
                    isModalOpen={isModalOpen}
                    handleCancel={handleCancel}
                    handleCallDataLogin={handleCallDataLogin}
                    messageApi={messageApi}
                    setisLoading={setisLoading}
                    handleMessage={handleMessage}
                />
            )}
        </div>
    );
}

export default ManagerAccounts;
