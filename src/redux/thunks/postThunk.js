import { createAsyncThunk } from "@reduxjs/toolkit";
import * as postApi from "../../api/post.api";

export const createPostAction = createAsyncThunk(
    'post/create',
    async (postData, { rejectWithValue }) => {
        try {
            const response = await postApi.createPost(postData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getAllPostsAction = createAsyncThunk(
    'post/getAll',
    async (params, { rejectWithValue }) => {
        try {
            const response = await postApi.getPosts(params);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getMyPostsAction = createAsyncThunk(
    'post/getMyPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await postApi.getMyPosts();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getPostByIdAction = createAsyncThunk(
    'post/getById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await postApi.getPostById(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updatePostAction = createAsyncThunk(
    'post/update',
    async ({ id, postData }, { rejectWithValue }) => {
        try {
            const response = await postApi.updatePost(id, postData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deletePostAction = createAsyncThunk(
    'post/delete',
    async (id, { rejectWithValue }) => {
        try {
            const response = await postApi.deletePost(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updatePostStatusAction = createAsyncThunk(
    'post/updateStatus',
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await postApi.updatePostStatus(id, status);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);