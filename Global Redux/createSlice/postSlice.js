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
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setContent: (state, action) => {
            state.content = action.payload;
        },
        setDate: (state, action) => {
            state.date = action.payload;
        },
        setAuthor: (state, action) => {
            state.author = action.payload;
        },
        setImage: (state, action) => {
            state.image = action.payload;
        },
    },
});

export const {
    setTitle,
    setContent,
    setDate,
    setAuthor,
    setLoveReact,
    setImage,
} = postSlice.actions;

export default postSlice.reducer;
