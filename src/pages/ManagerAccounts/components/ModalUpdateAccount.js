import { Checkbox, Input, Modal } from 'antd';
import { useRef } from 'react';
import Request from '~/api/httpRequest';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const initialState = {
    email: '',
    name: '',
};

function ModalUpdateAccount(props) {
    const { isModalOpen, handleCancel, dataUpdateAccount, handleCallDataLogin, setisLoading, handleMessage } = props;

    const schema = yup
        .object()
        .shape({
            email: yup.string().required('Vui lòng nhập trường này'),

            // age: yup.number().required(),
        })
        .required();

    const {
        handleSubmit,
        control,
        // reset,
        trigger,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: dataUpdateAccount.isUpdate ? dataUpdateAccount.dataDetail : initialState,
    });

    const refrom = useRef();

    const onSubmit = async (data) => {
        const { key, ...customData } = data;

        try {
            setisLoading(true);
            const res = await Request.UpdatAccount(data.id, customData);
            if (res) {
                handleCallDataLogin();
                handleCancel();
                handleMessage('Cập nhật thành công', 'success');
            }
        } catch (error) {}
    };

    const handleModalOk = function name(params) {
        refrom.current.click();
    };

    return (
        <div>
            <Modal
                open={isModalOpen}
                onOk={handleModalOk}
                onCancel={handleCancel}
                width={800}
                cancelText="Hủy"
                okText={dataUpdateAccount.isUpdate ? 'Cập nhật' : 'Thêm mới tài khoản'}
                title={dataUpdateAccount.isUpdate ? 'Cập nhật tài khoản' : 'Thêm mới tài khoản'}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container-item-formManagerAccount">
                        <section className="wapper-item-formManagerAccount">
                            <label>Email</label>
                            <Controller
                                key="email"
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Input
                                            disabled
                                            {...field}
                                            // value={field.value}
                                            onChange={(e) => {
                                                setValue('email', e.target.value);
                                                trigger('email'); // kiểm tra =>> validate
                                            }}
                                            placeholder="Email"
                                        />
                                    </>
                                )}
                            />
                            <p className="text-red-600">{errors.email && errors['email'].message}</p>
                        </section>
                        <section className="wapper-item-formManagerAccount">
                            <label>Tên tài khoản</label>
                            <Controller
                                key="name"
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Input
                                            {...field}
                                            // value={field.value}
                                            onChange={(e) => {
                                                setValue('name', e.target.value);
                                                trigger('name'); // kiểm tra =>> validate
                                            }}
                                            placeholder="Email"
                                        />
                                    </>
                                )}
                            />
                            <p className="text-red-600">{errors.email && errors['email'].message}</p>
                        </section>
                        <section className="wapper-item-formManagerAccount">
                            {/* <label>Cấp quyền quản lý</label> */}
                            <Controller
                                key="admin"
                                name="admin"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            // value={field.value}
                                            onChange={(e) => {
                                                setValue('admin', e.target.checked);
                                                trigger('admin'); // kiểm tra =>> validate
                                            }}
                                        >
                                            Cấp quyền quản lý
                                        </Checkbox>

                                        {/* <Checkbox.Group
                                            options={[
                                                { label: 'Apple', value: 'Apple' },
                                                { label: 'Pear', value: 'Pear' },
                                                { label: 'Orange', value: 'Orange' },
                                            ]}
                                            {...field}
                                            // value={field.value}
                                            onChange={(e) => {
                                                setValue('role', e.target.value);
                                                trigger('role'); // kiểm tra =>> validate
                                            }}
                                        /> */}
                                    </>
                                )}
                            />
                            <p className="text-red-600">{errors.email && errors['admin'].message}</p>
                        </section>
                    </div>

                    <input type="submit" ref={refrom} style={{ position: 'absolute', left: '-99999999px' }} />
                </form>
            </Modal>
        </div>
    );
}

export default ModalUpdateAccount;
