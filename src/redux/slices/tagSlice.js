import { createSlice } from "@reduxjs/toolkit";
import { getAllTagsAction, createTagAction, deleteTagAction } from "../thunks/tagThunk";

const initialState = {
    tags: [],
    loading: false,
    error: null,
}

const tagSlice = createSlice({
    name: "tag",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get All
            .addCase(getAllTagsAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllTagsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.tags = action.payload.tags;
            })
            .addCase(getAllTagsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create
            .addCase(createTagAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTagAction.fulfilled, (state, action) => {
                state.loading = false;
                state.tags.push(action.payload.tag);
            })
            .addCase(createTagAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete
            .addCase(deleteTagAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTagAction.fulfilled, (state, action) => {
                state.loading = false;
                state.tags = state.tags.filter(t => t._id !== action.payload.id);
            })
            .addCase(deleteTagAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default tagSlice.reducer;
