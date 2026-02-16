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

export const updateProfileAction = createAsyncThunk(
    'user/updateProfile',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await userApi.updateProfile(userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateUserRoleAction = createAsyncThunk(
    'user/updateRole',
    async ({ userId, role }, { rejectWithValue }) => {
        try {
            const response = await userApi.updateUserRole(userId, role);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteUserAction = createAsyncThunk(
    'user/delete',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await userApi.deleteUser(userId);
            return { userId, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
