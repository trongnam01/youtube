import classNames from 'classnames/bind';
import 'firebase/compat/auth';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import * as Yup from 'yup';
import Request from '~/api/httpRequest';
import styles from './Login.module.scss';
// import emailjs from 'emailjs-com';
import { createFormVerify } from './Actions';
import bcryptjs from 'bcryptjs';

const cx = classNames.bind(styles);
function FormRegister({ setStatus, setIsCheckVerify, setOptCode, setDatAccount, messageApi, setisLoading }) {
    const emailRef = useRef();
    const formRef = useRef();

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            verify: false,
            confirmedPassword: '',
            image: 'https://scontent.fhan2-5.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=dst-png_p100x100&_nc_cat=1&cb=99be929b-59f725be&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=-tIpWnFaNRwAX9Zid8U&_nc_ht=scontent.fhan2-5.fna&oh=00_AfDYW-OmufrrS8Sub0a29GTmzlQGsdqNls8gN6QluavbHQ&oe=65015CF8',
            admin: false,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMjAzMjAwMSIsIm5hbWUiOiJzYW9zYW9zYW8iLCJpYXQiOjE1MTYyMzkwMjJ9.1q3COK31esbj6pwFrhzZP0RK6_tJsAmClQ9usDZX7a0',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập trường này').min(4, 'Tên tối thiểu 4 kí tự'),
            email: Yup.string()
                .trim()
                .required('Vui lòng nhap trường này')
                .matches(/^\w+([\\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Trường phải là Email'),
            password: Yup.string().required('Vui lòng nhap trường này').min(8, 'Mật khẩu tối thiểu 8 chữ số '),
            confirmedPassword: Yup.string()
                .required('Vui lòng nhập trường này')
                .oneOf([Yup.ref('password'), null], 'Nhập lại mật khẩu không chính xác'),
        }),
        onSubmit: async (dataForm) => {
            const { confirmedPassword, ...values } = dataForm;

            const hash = bcryptjs.hashSync(values.password, 10);
            values.password = hash;

            // bcryptjs.compare('anhnam01', hash, function (err, result) {
            //     console.log(err, result);
            //     if (err) {
            //         console.error(err);
            //     } else {
            //         if (result) {
            //             console.log('Password matches');
            //             return 'Password matches';
            //         } else {
            //             console.log('Password does not match');
            //         }
            //     }
            // });

            setisLoading(true);
            const email = values.email;

            try {
                const res = await Request.getAllUser().then((datas) => {
                    return datas.find((data) => {
                        return data.email === email;
                    });
                });
                if (res) {
                    setisLoading(false);
                    messageApi.open({
                        type: 'warning',
                        className: 'messageWarring',
                        content: 'Email này đã được sử dụng',
                    });
                } else {
                    const createDataAccount = await Request.post(values);

                    const datasUser = {
                        id: createDataAccount.id,
                        email,
                        data: {
                            watched: [],
                            whatLaster: [],
                            videoUser: [],
                            like: [],
                            movie: [],
                            listPlay: [],
                            notLike: [],
                            subscribedChanel: [],
                        },
                    };
                    Request.postdataUser(datasUser);

                    if (createDataAccount) {
                        setisLoading(false);

                        messageApi.open({
                            type: 'success',
                            className: 'messageSuccess',
                            content: 'Bạn đã đăng ký thành công tài khoản',
                        });

                        createFormVerify(values).then((code) => {
                            setIsCheckVerify(true);
                            setOptCode(code);
                            setDatAccount(createDataAccount);
                        });
                    }
                }
            } catch (error) {}
        },
    });

    return (
        <form
            //  onSubmit={handleSubmit(statusLogin ? 'login' : 'signup')}
            ref={formRef}
            onSubmit={formik.handleSubmit}
        >
            <div className={cx('wrapper-input')}>
                <div className={cx('ground-input')}>
                    <input
                        ref={emailRef}
                        className={cx('input-email')}
                        id="email"
                        placeholder="Nhập email"
                        type="text"
                        name="email"
                        value={formik.values.email}
                        onChange={(event) => {
                            formik.setFieldValue(event.target.name, event.target.value.trim());
                        }}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <span className={cx('errorMsg')}>{formik.errors.email}</span>
                    )}
                </div>
                <div className={cx('ground-input')}>
                    <input
                        placeholder="Tên tài khoản"
                        type="text"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={(event) => {
                            formik.setFieldValue(event.target.name, event.target.value.trim());
                        }}
                    />
                    {formik.errors.name && formik.touched.name && (
                        <span className={cx('errorMsg')}>{formik.errors.name}</span>
                    )}
                </div>
                <div className={cx('ground-input')}>
                    <input
                        placeholder="Mật khẩu"
                        type="text"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={(event) => {
                            formik.setFieldValue(event.target.name, event.target.value.trim());
                        }}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <span className={cx('errorMsg')}>{formik.errors.password}</span>
                    )}
                </div>

                <div className={cx('ground-input')}>
                    <input
                        // ref={emailRef}
                        className={cx('input-email')}
                        id="confirmedPassword"
                        placeholder="Nhập lại mật khẩu"
                        type="text"
                        value={formik.values.confirmedPassword}
                        name="confirmedPassword"
                        onChange={(event) => {
                            formik.setFieldValue(event.target.name, event.target.value.trim());
                        }}
                    />
                    {formik.errors.confirmedPassword && formik.touched.confirmedPassword && (
                        <span className={cx('errorMsg')}>{formik.errors.confirmedPassword}</span>
                    )}
                </div>
            </div>
            <button type="submit" className={cx('btn-submit')}>
                Đăng ký
            </button>
        </form>
    );
}

export default FormRegister;
