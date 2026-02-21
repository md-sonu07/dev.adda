import { createSlice } from "@reduxjs/toolkit";
import { followUserAction, unfollowUserAction, getFollowersAction, getFollowingAction } from "../thunks/followThunk";

const initialState = {
    followers: [],
    following: [],
    loading: false,
    error: null,
};

const followSlice = createSlice({
    name: "follow",
    initialState,
    reducers: {
        clearFollowError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Follow User
            .addCase(followUserAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(followUserAction.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(followUserAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Unfollow User
            .addCase(unfollowUserAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(unfollowUserAction.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(unfollowUserAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get Followers
            .addCase(getFollowersAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFollowersAction.fulfilled, (state, action) => {
                state.loading = false;
                state.followers = action.payload.followers;
            })
            .addCase(getFollowersAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get Following
            .addCase(getFollowingAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFollowingAction.fulfilled, (state, action) => {
                state.loading = false;
                state.following = action.payload.following;
            })
            .addCase(getFollowingAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearFollowError } = followSlice.actions;
export default followSlice.reducer;
