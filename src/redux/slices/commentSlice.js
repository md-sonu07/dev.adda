import { createSlice } from "@reduxjs/toolkit";
import {
    getAdminCommentsAction,
    deleteCommentAction,
    getCommentsAction,
    createCommentAction,
    updateCommentAction,
    likeCommentAction
} from "../thunks/commentThunk";

const commentSlice = createSlice({
    name: "comment",
    initialState: {
        comments: [],
        totalComments: 0,
        adminComments: [],
        totalAdminComments: 0,
        loading: false,
        error: null,
    },
    reducers: {
        clearCommentError: (state) => {
            state.error = null;
        },
        resetComments: (state) => {
            state.comments = [];
            state.totalComments = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get Admin Comments
            .addCase(getAdminCommentsAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAdminCommentsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.adminComments = action.payload.comments;
                state.totalAdminComments = action.payload.totalComments;
            })
            .addCase(getAdminCommentsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch comments";
            })

            // Get Post Comments
            .addCase(getCommentsAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCommentsAction.fulfilled, (state, action) => {
                state.loading = false;
                // If startIndex is 0 or not provided, we replace, otherwise we append
                if (!action.meta.arg.startIndex || action.meta.arg.startIndex === 0) {
                    state.comments = action.payload.comments;
                } else {
                    state.comments = [...state.comments, ...action.payload.comments];
                }
                state.totalComments = action.payload.totalComments;
            })
            .addCase(getCommentsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch comments";
            })

            // Create Comment
            .addCase(createCommentAction.fulfilled, (state, action) => {
                state.comments = [action.payload.comment, ...state.comments];
                state.totalComments += 1;
            })

            // Update Comment
            .addCase(updateCommentAction.fulfilled, (state, action) => {
                state.comments = state.comments.map(c =>
                    c._id === action.payload.comment._id ? action.payload.comment : c
                );
            })

            // Like Comment
            .addCase(likeCommentAction.fulfilled, (state, action) => {
                state.comments = state.comments.map(c =>
                    c._id === action.payload.comment._id ? action.payload.comment : c
                );
            })

            // Delete Comment
            .addCase(deleteCommentAction.fulfilled, (state, action) => {
                state.comments = state.comments.filter(c => c._id !== action.meta.arg);
                state.adminComments = state.adminComments.filter(c => c._id !== action.meta.arg);
                state.totalComments -= 1;
                state.totalAdminComments -= 1;
            });
    },
});

export const { clearCommentError, resetComments } = commentSlice.actions;

export default commentSlice.reducer;
