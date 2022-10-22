// import { createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import userSplice from './userSplice';
import { configureStore } from '@reduxjs/toolkit';

// const compsedEnhancer = composeWithDevTools();

const store = configureStore({
    reducer: {
        user: userSplice,
    },
});

export default store;
