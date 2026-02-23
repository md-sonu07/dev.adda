import { createSlice } from "@reduxjs/toolkit";
import { toggleLikeAction, getPostLikesAction } from "../thunks/likeThunk";

const initialState = {
    // We can store likes status for specific posts
    postLikes: {}, // e.g., { postId: { count: 10, isLiked: true } }
    loading: false,
    error: null,
};

const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers: {
        clearLikeError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostLikesAction.fulfilled, (state, action) => {
                const { postId, likesCount, isLiked } = action.payload;
                state.postLikes[postId] = { count: likesCount, isLiked };
            })
            .addCase(toggleLikeAction.fulfilled, (state, action) => {
                const { postId, isLiked } = action.payload;
                if (state.postLikes[postId]) {
                    state.postLikes[postId].isLiked = isLiked;
                    state.postLikes[postId].count += isLiked ? 1 : -1;
                } else {
                    state.postLikes[postId] = { count: isLiked ? 1 : 0, isLiked };
                }
            })
            .addCase(toggleLikeAction.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
});

export const { clearLikeError } = likeSlice.actions;
export default likeSlice.reducer;
