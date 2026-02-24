import { createAsyncThunk } from "@reduxjs/toolkit";
import * as tagApi from "../../api/tag.api";

export const getAllTagsAction = createAsyncThunk(
    'tag/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await tagApi.getTags();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createTagAction = createAsyncThunk(
    'tag/create',
    async (tagData, { rejectWithValue }) => {
        try {
            const response = await tagApi.createTag(tagData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteTagAction = createAsyncThunk(
    'tag/delete',
    async (id, { rejectWithValue }) => {
        try {
            const response = await tagApi.deleteTag(id);
            return { id, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
