import { createSlice } from '@reduxjs/toolkit';

const dataUserSplice = createSlice({
    name: 'watched',
    initialState: {
        id: '3',
        email: 'admin@gmail.com',
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
    },
    reducers: {
        getinitialState: (state, active) => {
            return active.payload;
        },
        addView: (state, active) => {
            // const watched = state.data.watched;
            const { data } = state;
            const arr = [active.payload, ...data.watched];
            const uniqueKeyToMember = new Map(arr.map((m) => [m.id + '\t' + m.idName, m]));

            const uniqueMembers = [...uniqueKeyToMember.values()];
            const result = {
                ...state,
                data: {
                    ...state.data,
                    watched: uniqueMembers,
                },
            };

            return result;
        },
        addWhatLaster: (state, active) => {
            const { data } = state;
            const arr = [active.payload, ...data.whatLaster];
            const uniqueKeyToMember = new Map(arr.map((m) => [m.id + '\t' + m.idName, m]));

            const uniqueMembers = [...uniqueKeyToMember.values()];
            const result = {
                ...state,
                data: {
                    ...state.data,
                    whatLaster: uniqueMembers,
                },
            };

            return result;
        },
        addlistPlay: (state, active) => {
            const { listPlay } = state;
            const arr = [active.payload, ...listPlay];
            const uniqueKeyToMember = new Map(arr.map((m) => [m.id + '\t' + m.idName, m]));

            const uniqueMembers = [...uniqueKeyToMember.values()];
            const result = {
                ...state,
                listPlay: uniqueMembers,
            };

            return result;
        },
        addLike: (state, active) => {
            const { data } = state;
            const likes = [...data.like];
            likes.unshift(active.payload);
            const result = {
                ...state,
                data: {
                    ...state.data,
                    like: likes,
                },
            };

            return result;
        },
        removeLike: (state, active) => {
            const { data } = state;
            const likes = [...data.like];

            const likeSlice = likes.filter((item) => item.id !== active.payload);

            const result = {
                ...state,
                data: {
                    ...state.data,
                    like: likeSlice,
                },
            };

            return result;
        },
        addNotLike: (state, active) => {
            const { data } = state;
            const notlikes = [...data.notLike];
            notlikes.unshift(active.payload);

            const result = {
                ...state,
                data: {
                    ...state.data,
                    notLike: notlikes,
                },
            };

            return result;
        },
        removeNotLike: (state, active) => {
            const { data } = state;
            const notLikes = [...data.notLike];

            const notLikeSlice = notLikes.filter((item) => item.id !== active.payload);

            const result = {
                ...state,
                data: {
                    ...state.data,
                    notLike: notLikeSlice,
                },
            };

            return result;
        },
        addRegister: (state, active) => {
            const { data } = state;
            const datapust = [...data.subscribedChanel];
            datapust.push(active.payload);

            state.data.subscribedChanel = datapust;
        },
        unRegister: (state, active) => {
            const { data } = state;
            const dataRegister = data.subscribedChanel;

            const unRegister = dataRegister.filter(
                (item) => item.idName !== active.payload.idName && item.IduserChannel !== active.payload.IduserChannel,
            );
            state.data.subscribedChanel = unRegister;
        },
    },
});
const { reducer, actions } = dataUserSplice;
export const {
    addView,
    getinitialState,
    addLike,
    addWhatLaster,
    removeLike,
    addNotLike,
    removeNotLike,
    addRegister,
    unRegister,
} = actions;

export default reducer;
