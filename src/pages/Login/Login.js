import classNames from 'classnames/bind';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import styles from './Login.module.scss';

import FormLogin from './FormLogin';
import FormRegister from './FormRegister';

import { onAuthStateChanged } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

const cx = classNames.bind(styles);

const config = {
    apiKey: process.env.FIREBASE_API_KEY || 'AIzaSyA4a_3xx1WevZFqRU0hL4JcExa7tvh403E',
    authDomain: process.env.FIREBASE_ATHUTH_DOMAIN || 'project-api-2728d.firebaseapp.com',
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
};

function Login() {
    const [statusLogin, setStatusLogin] = useState(true);
    const [userSignedIn, setUserSignedIn] = useState(false);
    const elementRef = useRef(null);
    const handleSetStatusLogin = (boolean) => {
        setStatusLogin(boolean);
    };

    const handleSignup = (text, e) => () => {
        if (text === 'login') {
            setStatusLogin(true);
        } else {
            setStatusLogin(false);
        }
    };

    useEffect(() => {
        const firebaseUiWidget = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());

        const unregisterAuthObserver = onAuthStateChanged(firebase.auth(), (user) => {
            if (!user && userSignedIn) firebaseUiWidget.reset();
            setUserSignedIn(!!user);
        });

        firebaseUiWidget.start(elementRef.current, uiConfig);

        return () => {
            unregisterAuthObserver();
            firebaseUiWidget.reset();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const classBtn = cx('btn');
    const classBtnBackgroundLogin = cx({ active: statusLogin });
    const classBtnBackgroundSingup = cx({ active: !statusLogin });
    return (
        <section className={cx('wrapper')}>
            <div className={cx('contai')}>
                <Link to={'/'} className={cx('logo-contai')}>
                    <img src={images.logo} alt="logo" />
                </Link>
                <div className={cx('wrapper-button')}>
                    <button
                        onClick={handleSignup('login')}
                        className={cx('btn-login', classBtn, classBtnBackgroundLogin)}
                    >
                        Login
                    </button>
                    <button onClick={handleSignup('signup')} className={cx(classBtn, classBtnBackgroundSingup)}>
                        signup
                    </button>
                </div>
                {statusLogin ? (
                    <FormLogin setStatus={handleSetStatusLogin} />
                ) : (
                    <FormRegister setStatus={handleSetStatusLogin} />
                )}
                <div className={cx('from-2')} ref={elementRef} />
            </div>
        </section>
    );
}

export default React.memo(Login);
