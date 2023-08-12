import axiosClient from './axiosClient';

class HtppRequest {
    getAll = (params) => {
        const url = 'video';

        return axiosClient.get(url, {
            params,
            onDownloadProgress: (progressEvent) => {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                // console.log(progressEvent);
                // console.log(progressEvent.lengthComputable);
                // console.log(percentCompleted);
            },
        });
    };
    //sửa vivdeo
    UpdateVideoDetail = (id, params) => {
        const url = `video/${id}`;
        return axiosClient.put(url, params);
    };
    DeleteVideo = (id, params) => {
        const url = `video/${id}`;
        return axiosClient.delete(url, params);
    };
    createVideo = (params) => {
        const url = `video`;
        return axiosClient.post(url, params);
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
    UpdatAccount = (id, params) => {
        const url = `login/${id}`;
        return axiosClient.put(url, params);
    };
    getdataUser = (id) => {
        const url = `users/${id}`;
        return axiosClient.get(url);
    };
    putdataUser = (id, params) => {
        const url = `users/${id}`;
        return axiosClient.put(url, params);
    };
    postdataUser = (params) => {
        const url = `users`;
        return axiosClient.post(url, params);
    };
}

const Request = new HtppRequest();
export default Request;
