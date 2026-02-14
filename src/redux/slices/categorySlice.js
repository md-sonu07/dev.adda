import { createSlice } from "@reduxjs/toolkit";
import { getAllCategoriesAction, createCategoryAction, deleteCategoryAction } from "../thunks/categoryThunk";

const initialState = {
    categories: [],
    loading: false,
    error: null,
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get All
            .addCase(getAllCategoriesAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCategoriesAction.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload.categories;
            })
            .addCase(getAllCategoriesAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create
            .addCase(createCategoryAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCategoryAction.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload.category);
            })
            .addCase(createCategoryAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete
            .addCase(deleteCategoryAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCategoryAction.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter(c => c._id !== action.payload.id);
            })
            .addCase(deleteCategoryAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default categorySlice.reducer;
