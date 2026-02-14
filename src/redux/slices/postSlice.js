import { createSlice } from "@reduxjs/toolkit";
import { createPostAction, getAllPostsAction, getMyPostsAction, getPostByIdAction, updatePostAction, deletePostAction, updatePostStatusAction } from "../thunks/postThunk";

const initialState = {
    posts: [],
    myPosts: [], // Separate storage for user's own posts
    singlePost: null,
    loading: false,
    error: null,
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        clearPostError: (state) => {
            state.error = null;
        },
        clearSinglePost: (state) => {
            state.singlePost = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Post
            .addCase(createPostAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPostAction.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.push(action.payload.post);
            })
            .addCase(createPostAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get All Posts
            .addCase(getAllPostsAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllPostsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload.posts;
            })
            .addCase(getAllPostsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get My Posts
            .addCase(getMyPostsAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMyPostsAction.fulfilled, (state, action) => {
                state.loading = false;
                state.myPosts = action.payload.posts;
            })
            .addCase(getMyPostsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get Post By Id
            .addCase(getPostByIdAction.pending, (state) => {
                state.loading = true;
                state.singlePost = null;
            })
            .addCase(getPostByIdAction.fulfilled, (state, action) => {
                state.loading = false;
                state.singlePost = action.payload.post;
            })
            .addCase(getPostByIdAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Post
            .addCase(updatePostAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePostAction.fulfilled, (state, action) => {
                state.loading = false;
                // Update in all posts
                const index = state.posts.findIndex(p => p._id === action.payload.post._id);
                if (index !== -1) {
                    state.posts[index] = action.payload.post;
                }
                // Update in my posts
                const myIndex = state.myPosts.findIndex(p => p._id === action.payload.post._id);
                if (myIndex !== -1) {
                    state.myPosts[myIndex] = action.payload.post;
                }
            })
            .addCase(updatePostAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Post
            .addCase(deletePostAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePostAction.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = state.posts.filter(p => p._id !== action.meta.arg);
                state.myPosts = state.myPosts.filter(p => p._id !== action.meta.arg);
            })
            .addCase(deletePostAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Post Status
            .addCase(updatePostStatusAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePostStatusAction.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.posts.findIndex(p => p._id === action.payload.post._id);
                if (index !== -1) {
                    state.posts[index] = action.payload.post;
                }
            })
            .addCase(updatePostStatusAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearPostError, clearSinglePost } = postSlice.actions;
export default postSlice.reducer;
