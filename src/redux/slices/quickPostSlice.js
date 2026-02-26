import { createSlice } from '@reduxjs/toolkit';
import { createQuickPostAction } from '../thunks/quickPostThunk';

const quickPostSlice = createSlice({
    name: 'quickPost',
    initialState: {
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        resetQuickPostState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createQuickPostAction.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createQuickPostAction.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(createQuickPostAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { resetQuickPostState } = quickPostSlice.actions;
export default quickPostSlice.reducer;
