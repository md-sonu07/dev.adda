import { createAsyncThunk } from "@reduxjs/toolkit";
import * as likeApi from "../../api/like.api";

export const toggleLikeAction = createAsyncThunk(
    'likes/toggle',
    async (postId, { rejectWithValue }) => {
        try {
            const response = await likeApi.toggleLike(postId);
            return { postId, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getPostLikesAction = createAsyncThunk(
    'likes/getPostLikes',
    async (postId, { rejectWithValue }) => {
        try {
            const response = await likeApi.getPostLikes(postId);
            return { postId, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
