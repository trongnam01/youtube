import { useFormik } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames/bind';
import 'firebase/compat/auth';

import styles from './Login.module.scss';
import { useEffect, useRef } from 'react';
import Request from '~/api/httpRequest';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '~/redux/userSplice';

const cx = classNames.bind(styles);
function FormLogin({ setStatus }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const emailRef = useRef();

    useEffect(() => {
        emailRef.current.focus();
    }, []);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .trim()
                .required('Vui lòng nhap trường này')
                .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Trường phải là Email'),
            password: Yup.string().required('Vui lòng nhap trường này').min(8, 'Mật khẩu tối thiểu 8 chữ số '),
        }),
        onSubmit: async (values) => {
            const email = values.email;
            const password = values.password;
            try {
                const res = await Request.getAllUser().then((datas) => {
                    return datas.find((data) => {
                        return data.email === email && data.password === password;
                    });
                });
                if (res) {
                    const token = res.token;
                    const Authorization = `Bearer ${token}`;
                    window.localStorage.setItem('Authorization', JSON.stringify(Authorization));
                    window.localStorage.setItem('id', JSON.stringify(res.id));
                    dispatch(addUser(res));
                    navigate('/');
                } else {
                    alert('email hoặc mật khẩu sai');
                }
                console.log(res);
            } catch (error) {}
        },
    });

    return (
        <form
            //  onSubmit={handleSubmit(statusLogin ? 'login' : 'signup')}
            onSubmit={formik.handleSubmit}
        >
            <div className={cx('wrapper-input')}>
                <div className={cx('ground-input')}>
                    <input
                        ref={emailRef}
                        className={cx('input-email')}
                        id="email"
                        placeholder="Email"
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
            </div>
            <button type="submit" className={cx('btn-submit')}>
                Đăng nhập'
            </button>
            <p>
                Not a member?{' '}
                <span className={cx('text')} onClick={() => setStatus(false)}>
                    signup now
                </span>
            </p>
        </form>
    );
}

export default FormLogin;
