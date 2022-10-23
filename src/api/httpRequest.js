import axiosClient from './axiosClient';

class HtppRequest {
    getAll = (params) => {
        const url = 'video';

        return axiosClient.get(url, { params });
    };
    getAllUser = (params) => {
        const url = 'login';

        return axiosClient.get(url, { params });
    };

    getId = (id) => {
        const url = 'login/' + id;

        return axiosClient.get(url);
    };

    post = (params) => {
        const url = 'login';
        return axiosClient.post(url, params);
    };
}

const Request = new HtppRequest();
export default Request;
