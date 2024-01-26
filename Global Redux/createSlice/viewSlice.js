import { createSlice } from '@reduxjs/toolkit';

const viewSlice = createSlice({
    name: 'view',
    initialState: {
        viewCounts: {},
    },
    reducers: {
        viewCount: (state, action) => {
            const postId = action.payload;
            if (state.viewCounts[postId]) {
                state.viewCounts[postId]++;
            } else {
                state.viewCounts[postId] = 1;
            }
        },
    },
});

export const { viewCount } = viewSlice.actions;
export default viewSlice.reducer;
