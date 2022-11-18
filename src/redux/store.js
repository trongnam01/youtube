// import { createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import userSplice from './userSplice';
import dataUserSplice from './dataUserSplice';
import { configureStore } from '@reduxjs/toolkit';

// const compsedEnhancer = composeWithDevTools();

const store = configureStore({
    reducer: {
        user: userSplice,
        dataUser: dataUserSplice,
    },
});

export default store;
