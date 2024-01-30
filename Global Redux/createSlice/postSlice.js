// postSlice.js
import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
    name: 'post',
    initialState: {
        title: '',
        content: '',
        date: '',
        author: '',
        loveData: {},
        comment : "",
        image: null,
    },
    reducers: {
        setLoveReact: (state, action) => {
            const postId = action.payload;
            if (state.loveData[postId]) {
                state.loveData[postId].isLoved = !state.loveData[postId].isLoved;
                if (state.loveData[postId].isLoved) {
                    state.loveData[postId].loveCount++;
                } else {
                    state.loveData[postId].loveCount--;
                }
            } else {
                state.loveData[postId] = {
                    isLoved: true,
                    loveCount: 1,
                };
            }
        },
    },
});

export const {
    setLoveReact,
} = postSlice.actions;

export default postSlice.reducer;
