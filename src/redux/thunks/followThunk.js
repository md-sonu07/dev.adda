import { createAsyncThunk } from "@reduxjs/toolkit";
import * as followApi from "../../api/follow.api";

export const followUserAction = createAsyncThunk(
    'follow/followUser',
    async (id, { rejectWithValue }) => {
        try {
            const response = await followApi.followUser(id);
            return { id, data: response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const unfollowUserAction = createAsyncThunk(
    'follow/unfollowUser',
    async (id, { rejectWithValue }) => {
        try {
            const response = await followApi.unfollowUser(id);
            return { id, data: response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getFollowersAction = createAsyncThunk(
    'follow/getFollowers',
    async (id, { rejectWithValue }) => {
        try {
            const response = await followApi.getFollowers(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getFollowingAction = createAsyncThunk(
    'follow/getFollowing',
    async (id, { rejectWithValue }) => {
        try {
            const response = await followApi.getFollowing(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
