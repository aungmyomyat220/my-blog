// postSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {updatePostHook} from "../../hooks/updatePostHook";

const postSlice = createSlice({
    name: 'post',
    initialState: {
        like : ""
    },
    reducers: {
        setLoveReact: async(state, action) => {
            const postId = action.payload;
            const {mutateAsync: like} = updatePostHook()
            try {
                const updateData = {
                    like : 1
                };
                await like({ Id: postId, updateData });
            } catch (error) {
                console.log(error)
            }
        },
    },
});

export const {
    setLoveReact,
} = postSlice.actions;

export default postSlice.reducer;
