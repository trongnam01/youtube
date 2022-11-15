import { createSlice } from '@reduxjs/toolkit';

const watchedSplice = createSlice({
    name: 'watched',
    initialState: [],
    reducers: {
        addView: (state, active) => {
            const result = [active.payload, ...state];
            const uniqueKeyToMember = new Map(result.map((m) => [m.id + '\t' + m.idName, m]));

            const uniqueMembers = [...uniqueKeyToMember.values()];

            return uniqueMembers;
        },
    },
});
const { reducer, actions } = watchedSplice;
export const { addView } = actions;

export default reducer;
