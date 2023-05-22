import { Form, Input, Modal, Switch } from 'antd';
import { useRef, useState, useEffect } from 'react';
import Request from '~/api/httpRequest';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ItemFormCreateVideo } from '../constants';

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

function ModalManagerVideo(props) {
    const { isModalOpen, handleCancel, dataRequest, handleLoadAllVideo, DataApi } = props;

    const schema = yup
        .object()
        .shape({
            idName: yup
                .string()
                .required('Vui lòng nhập trường này')
                .test('idName', 'Không được chứa khoảng trắng ở đầu', (value) => {
                    if (typeof value === 'string') {
                        return !value.startsWith(' ');
                    }
                    return true;
                }),
            video: yup.string().required('Vui lòng nhập trường này'),
            // age: yup.number().required(),
        })
        .required();

    const {
        register,
        handleSubmit,
        control,
        reset,
        trigger,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: dataRequest.isUpdate ? dataRequest.dataDetail : initialState,
        // defaultValues: initialState,
    });

    const refrom = useRef();
    const [isDisabledInput, setIsDisabledInput] = useState(false);

    useEffect(() => {
        if (!dataRequest.isUpdate) {
            setIsDisabledInput(true);
        }
    }, [dataRequest]);
    // console.log(dataRequest.dataDetail);

    const onSubmit = (data) => {
        if (dataRequest.isUpdate) {
            Request.UpdateVideoDetail(data.id, data).then((res) => {
                handleLoadAllVideo();
                handleCancel();
            });
        } else {
            handleCreateVideo(data);
        }
    };
    // thêm video
    const handleCreateVideo = (data) => {
        const lastVideo = DataApi[DataApi.length - 1];
        const getIDLast = Number(lastVideo.id);
        const customValue = {
            id: getIDLast + 1,
            ...data,
            date: handleGetDate(),
        };

        Request.createVideo(customValue).then(() => {
            handleLoadAllVideo();
            handleCancel();
        });
        console.log(customValue);
    };
    const handleModalOk = function name(params) {
        refrom.current.click();
    };

    // bật tắt disabled input
    const handleChangeSwitch = function name(value) {
        setIsDisabledInput(value);
    };
    const handleGetDate = () => {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Tháng được đánh số từ 0 đến 11, cần cộng 1 để lấy tháng hiện tại
        const year = currentDate.getFullYear();

        return `${day} th${month} ${year}`;
    };

    return (
        <div>
            <Modal
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleCancel}
                width={800}
                cancelText="Hủy"
                okText={dataRequest.isUpdate ? 'Cập nhật' : 'Thêm mới'}
                title={dataRequest.isUpdate ? 'Cập nhật video' : 'Thêm mới video'}
            >
                {dataRequest.isUpdate && (
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Switch
                            // defaultChecked
                            onChange={handleChangeSwitch}
                            style={{ float: 'right' }}
                        />
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container-item-form">
                        {ItemFormCreateVideo.map((item) => {
                            const { field, label, disabled } = item;
                            // console.log(field);
                            // console.log(errors[field] && errors[field], errors[field] && errors[field].message);

                            const message = errors[field] && errors[field].message;
                            return (
                                <section key={field}>
                                    <label>{label}</label>
                                    <Controller
                                        key={field}
                                        name={field}
                                        control={control}
                                        render={({ field, value }) => (
                                            // <Form.Item
                                            //     label={label}
                                            //     name={field}
                                            //     validateStatus={message && 'error'}
                                            //     help={message}
                                            //     labelCol={{ span: 24 }}
                                            //     style={{ width: '100%' }}
                                            //     // {...field}
                                            // >
                                            //     {/* {console.log(field, 'field')} */}
                                            //     <Input
                                            //         {...field}
                                            //         // value={field.value}
                                            //         onChange={(e) => {
                                            //             setValue(field.name, e.target.value);
                                            //             trigger(field.name);
                                            //         }}
                                            //         placeholder={label}
                                            //     />
                                            // </Form.Item>
                                            <Input
                                                {...field}
                                                // value={field.value}
                                                onChange={(e) => {
                                                    setValue(field.name, e.target.value);
                                                    trigger(field.name);
                                                }}
                                                disabled={disabled && !isDisabledInput}
                                                placeholder={label}
                                            />
                                        )}
                                    />
                                    <p className="text-red-600">{message && message}</p>
                                </section>
                            );
                        })}
                    </div>
                    <input type="submit" ref={refrom} style={{ position: 'absolute', left: '-99999999px' }} />
                </form>
            </Modal>
        </div>
    );
}

export default ModalManagerVideo;
