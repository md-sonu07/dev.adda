import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

const API_URL = "/comments";

export const createCommentAction = createAsyncThunk(
    "comment/create",
    async (commentData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${API_URL}`, commentData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getCommentsAction = createAsyncThunk(
    "comment/getPostComments",
    async ({ postId, sort, limit, startIndex }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${API_URL}/${postId}`, {
                params: { sort, limit, startIndex }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAdminCommentsAction = createAsyncThunk(
    "comment/getAdmin",
    async ({ limit, startIndex }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${API_URL}/admin`, {
                params: { limit, startIndex }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



export const deleteCommentAction = createAsyncThunk(
    "comment/delete",
    async (commentId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`${API_URL}/${commentId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateCommentAction = createAsyncThunk(
    "comment/update",
    async ({ commentId, text }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`${API_URL}/${commentId}`, { text });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const likeCommentAction = createAsyncThunk(
    "comment/like",
    async (commentId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${API_URL}/${commentId}/like`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

