import { createAsyncThunk } from "@reduxjs/toolkit";
import * as categoryApi from "../../api/category.api";

export const getAllCategoriesAction = createAsyncThunk(
    'category/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await categoryApi.getCategories();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createCategoryAction = createAsyncThunk(
    'category/create',
    async (categoryData, { rejectWithValue }) => {
        try {
            const response = await categoryApi.createCategory(categoryData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteCategoryAction = createAsyncThunk(
    'category/delete',
    async (id, { rejectWithValue }) => {
        try {
            const response = await categoryApi.deleteCategory(id);
            return { id, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
