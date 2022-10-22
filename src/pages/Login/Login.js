import classNames from 'classnames/bind';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import styles from './Login.module.scss';

import FormLogin from './FormLogin';
import FormRegister from './FormRegister';

const cx = classNames.bind(styles);

const config = {
    apiKey: process.env.FIREBASE_API_KEY || 'AIzaSyA4a_3xx1WevZFqRU0hL4JcExa7tvh403E',
    authDomain: process.env.FIREBASE_ATHUTH_DOMAIN || 'project-api-2728d.firebaseapp.com',
};
firebase.initializeApp(config);

// console.log(process.env);

const uiConfig = {
    signInFlow: 'redirect',
    signInSuccessUrl: '/',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
};

function Login() {
    const [statusLogin, setStatusLogin] = useState(true);

    const handleSetStatusLogin = (boolean) => {
        console.log(boolean);
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
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) return;

            const token = user;
            console.log(token.getIdToken);
        });

        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
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

                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        </section>
    );
}

export default Login;
