import { createSlice } from '@reduxjs/toolkit';

const userSplice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        addUser: (state, active) => {
            // state.push(active.payload);
            return [active.payload];
        },
        removeUser: (state, active) => {
            state.splice(active.payload, 1);
        },
        removeAll: (state, active) => {
            state.splice(active.payload, 1);
        },
    },
});
const { reducer, actions } = userSplice;
export const { addUser, removeUser, removeAll } = actions;

export default reducer;
