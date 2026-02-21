import { createAsyncThunk } from "@reduxjs/toolkit";
import * as bookmarkApi from "../../api/bookmark.api";

export const toggleBookmarkAction = createAsyncThunk(
    'bookmarks/toggle',
    async ({ postId, post }, { rejectWithValue }) => {
        try {
            const response = await bookmarkApi.toggleBookmark(postId);
            return { postId, post, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getMyBookmarksAction = createAsyncThunk(
    'bookmarks/getMy',
    async (_, { rejectWithValue }) => {
        try {
            const response = await bookmarkApi.getMyBookmarks();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
