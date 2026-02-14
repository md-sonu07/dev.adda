import { createSlice } from "@reduxjs/toolkit";
import { getUserProfileAction, getAllUsersAction } from "../thunks/userThunk";

const initialState = {
    userProfile: null,
    users: [],
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUserError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get Profile
            .addCase(getUserProfileAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserProfileAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = action.payload.UserProfile;
            })
            .addCase(getUserProfileAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get All Users
            .addCase(getAllUsersAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsersAction.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.Users;
            })
            .addCase(getAllUsersAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;