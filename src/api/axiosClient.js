import axios from 'axios';
import firebase from 'firebase/compat/app';

export const getFireBaseToken = async () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) return currentUser.getIdToken();

    return new Promise((resolve, reject) => {
        const idTimeout = setTimeout(() => {
            reject(null);
            console.log(reject, resolve);
        }, 10000);
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                resolve(false);
                clearTimeout(idTimeout);
                return null;
            }
            const token = await user.getIdToken();
            resolve(token);

            unregisterAuthObserver();
            clearTimeout(idTimeout);
        });
    });
};

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://6290441a27f4ba1c65b64525.mockapi.io/api/',
    // headers: {
    //     'content-type': 'application/json',
    // },
    // paramsSerializer: (params) => query-string.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
    try {
        const token = await getFireBaseToken();

        if (token) {
            const Authorization = `Bearer ${token}`;

            window.localStorage.setItem('Authorization', JSON.stringify(Authorization));
            window.localStorage.setItem('token', JSON.stringify('succes'));
        }
    } catch (error) {
        console.log('lỗi get firebase');
    }
    return config;
});
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        // Handle errors
        throw error;
    },
);
export default axiosClient;
