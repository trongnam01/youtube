import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import styles from '../Login.module.scss';
import classNames from 'classnames/bind';
import Countdown from 'antd/lib/statistic/Countdown';
import { createFormVerify } from '../Actions';
import Request from '~/api/httpRequest';
import { useDispatch } from 'react-redux';
import { addUser } from '~/redux/userSplice';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Verify({ optCode, messageApi, dataAccount, setOptCode }) {
    const [otp, setOtp] = useState('');
    const [expired, setExpiredCode] = useState(false); // hết hạn
    const [resetKey, setResetKey] = useState(Date.now() + 300 * 1000);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmitVerify = () => {
        if (expired) {
            messageApi.open({
                type: 'warning',
                className: 'messageWarring',
                content: 'Mã xác minh đã hết hạn. Vui lòng lấy lại mã',
            });
            return;
        }

        if (otp === optCode) {
            messageApi.open({
                type: 'success',
                className: 'messageSuccess',
                content: 'Xác minh thành công',
            });
            handleUpdateAccount();
        } else {
            messageApi.open({
                type: 'error',
                className: 'messageErrorr',
                content: 'Mã xác minh không chính xác. Vui lòng nhập lại mã xác minh',
            });
        }
    };
    const handleGetCode = () => {
        createFormVerify(dataAccount).then((code) => {
            setOptCode(code);
            setResetKey(Date.now() + 300 * 1000);
            setExpiredCode(false);
        });
    };
    const handleUpdateAccount = () => {
        const customData = {
            ...dataAccount,
            verify: true,
        };
        Request.UpdatAccount(customData.id, customData).then((res) => {
            const token = res.token;
            const Authorization = `Bearer ${token}`;
            window.localStorage.setItem('Authorization', JSON.stringify(Authorization));
            window.localStorage.setItem('id', JSON.stringify(res.id));
            dispatch(addUser(res));
            navigate('/');
        });
    };

    return (
        <div className={cx('wrapper-Verify')}>
            <section className={cx('Container')}>
                <span className={cx('title')}>Vui lòng xác minh tài khoản</span>
                <span className={cx('title-content')}>
                    Nhập mã gồm 5 chữ số mà chúng tôi đã gửi địa chỉ email của bạn để xác minh tài khoản Youtube mới của
                    bạn
                </span>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={5}
                    inputType={'number'}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={{
                        border: '1px solid #c6b9b9',
                        borderRadius: '8px',
                        width: '54px',
                        height: '54px',
                        fontSize: '20px',
                        color: '#000',
                        fontWeight: '400',
                        caretColor: 'blue',
                        margin: '0 5',
                        background: '#fff',
                    }}
                    renderSeparator={<span style={{ width: '8px' }}> </span>}
                    focusStyle={{
                        border: '1px solid #CFD3DB',
                        outline: 'none',
                    }}
                />
                <div className={cx('footer')}>
                    <div>
                        Không nhận được email ?<a onClick={handleGetCode}>Gửi lại mã xác minh</a>
                    </div>
                    <div className={cx('time')}>
                        Hết hạn sau
                        <Countdown
                            className="Countdown"
                            valueStyle={{ fontSize: '20px' }}
                            style={{ margin: '5px' }}
                            value={resetKey}
                            format="mm:ss"
                            onFinish={() => {
                                setExpiredCode(true);
                            }}
                        />
                    </div>
                </div>

                <button onClick={handleSubmitVerify} className={cx('btn-Rerify')}>
                    Xác nhận
                </button>
            </section>
        </div>
    );
}

export default Verify;
