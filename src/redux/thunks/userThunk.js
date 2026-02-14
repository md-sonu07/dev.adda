import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userApi from "../../api/user.api";

export const getUserProfileAction = createAsyncThunk(
    'user/getProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userApi.userProfile();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getAllUsersAction = createAsyncThunk(
    'user/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userApi.getAllUsers();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
