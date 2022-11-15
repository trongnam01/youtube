// import { createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import userSplice from './userSplice';
import Watched from './watchedSplice';
import { configureStore } from '@reduxjs/toolkit';

// const compsedEnhancer = composeWithDevTools();

const store = configureStore({
    reducer: {
        user: userSplice,
        watched: Watched,
    },
});

export default store;
