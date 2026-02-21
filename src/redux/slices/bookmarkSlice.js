import { createSlice } from "@reduxjs/toolkit";
import { toggleBookmarkAction, getMyBookmarksAction } from "../thunks/bookmarkThunk";

const initialState = {
    bookmarkedPosts: [],
    loading: false,
    error: null,
};

const bookmarkSlice = createSlice({
    name: "bookmark",
    initialState,
    reducers: {
        clearBookmarkError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Toggle Bookmark
            .addCase(toggleBookmarkAction.pending, (state) => {
                // state.loading = true; // Avoid UI flicker on toggle
            })
            .addCase(toggleBookmarkAction.fulfilled, (state, action) => {
                state.loading = false;
                const { isBookmarked, postId, post } = action.payload;

                if (isBookmarked) {
                    // Add to bookmarks if we have post data
                    if (post && !state.bookmarkedPosts.find(p => p._id === postId)) {
                        state.bookmarkedPosts.push(post);
                    } else if (!state.bookmarkedPosts.find(p => p._id === postId)) {
                        // If no post data, add a stub so isBookmarked check works
                        state.bookmarkedPosts.push({ _id: postId });
                    }
                } else {
                    // Remove from bookmarks
                    state.bookmarkedPosts = state.bookmarkedPosts.filter(
                        (p) => p._id !== postId
                    );
                }
            })
            .addCase(toggleBookmarkAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get My Bookmarks
            .addCase(getMyBookmarksAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMyBookmarksAction.fulfilled, (state, action) => {
                state.loading = false;
                state.bookmarkedPosts = action.payload.bookmarks;
            })
            .addCase(getMyBookmarksAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearBookmarkError } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
