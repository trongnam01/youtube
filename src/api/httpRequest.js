import axios from 'axios';
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
    DeleteAccount = (id) => {
        const url = `login/${id}`;
        return axiosClient.delete(url);
    };
    DeleteDataAccount = (id) => {
        const url = `users/${id}`;
        return axiosClient.delete(url);
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

    // api youtube

    getdataApiYoutube = async (nextPageToken, size) => {
        return await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,player,contentDetails,statistics&chart=mostPopular&regionCode=VN&key=${process.env.REACT_APP_KEY_API_YOUTUBE}&maxResults=${size}&pageToken=${nextPageToken}`,
        );
    };
    getdataChannelID = async (channelId) => {
        return await axios.get(
            `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&key=${process.env.REACT_APP_KEY_API_YOUTUBE}&part=snippet,statistics`,
        );
    };

    getdataVideoDetail = async (channelId) => {
        return await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${channelId}&key=${process.env.REACT_APP_KEY_API_YOUTUBE}&part=snippet`,
        );
    };

    getCommentsVideoDetail = async (id, size, nextPageToken = '') => {
        return await axios.get(
            `https://www.googleapis.com/youtube/v3/commentThreads?&videoId=${id}&key=${process.env.REACT_APP_KEY_API_YOUTUBE}&part=snippet&maxResults=${size}&pageToken=${nextPageToken}`,
        );
    };
}

const Request = new HtppRequest();
export default Request;
