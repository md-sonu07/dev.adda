import { createSlice } from "@reduxjs/toolkit";
import { createPostAction, getAllPostsAction, getMyPostsAction, getPostByIdAction, updatePostAction, deletePostAction, updatePostStatusAction, incrementViewsAction, deleteAllMyPostsAction } from "../thunks/postThunk";
import { createCommentAction, deleteCommentAction } from "../thunks/commentThunk";

const initialState = {
    posts: [],
    myPosts: [],
    singlePost: null,
    selectedCategory: 'Latest',
    loading: false,
    error: null,
    pagination: {
        totalPosts: 0,
        totalPages: 0,
        currentPage: 1,
        limit: 10,
        hasMore: false
    }
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
        },
        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        resetPosts: (state) => {
            state.posts = [];
            state.pagination = {
                totalPosts: 0,
                totalPages: 0,
                currentPage: 1,
                limit: state.pagination.limit,
                hasMore: false
            };
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
                const { posts, pagination } = action.payload;

                if (pagination.currentPage === 1) {
                    state.posts = posts;
                } else {
                    // Avoid duplicates if any
                    const existingIds = new Set(state.posts.map(p => p._id));
                    const newPosts = posts.filter(p => !existingIds.has(p._id));
                    state.posts = [...state.posts, ...newPosts];
                }

                state.pagination = {
                    ...pagination,
                    hasMore: pagination.currentPage < pagination.totalPages
                };
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
                // Sync with posts list to update view count globally
                const index = state.posts.findIndex(p => p._id === action.payload.post._id);
                if (index !== -1) {
                    state.posts[index] = { ...state.posts[index], ...action.payload.post };
                }
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
            })
            // Comment Actions Integration
            .addCase(createCommentAction.fulfilled, (state, action) => {
                const postId = action.meta.arg.postId;
                // Update in singlePost
                if (state.singlePost && state.singlePost._id === postId) {
                    state.singlePost.commentCount = (state.singlePost.commentCount || 0) + 1;
                }
                // Update in posts list
                const postIndex = state.posts.findIndex(p => p._id === postId);
                if (postIndex !== -1) {
                    state.posts[postIndex].commentCount = (state.posts[postIndex].commentCount || 0) + 1;
                }
            })
            .addCase(deleteCommentAction.fulfilled, (state, action) => {
                const postId = action.payload.postId;
                // Update in singlePost
                if (state.singlePost && state.singlePost._id === postId) {
                    state.singlePost.commentCount = Math.max(0, (state.singlePost.commentCount || 0) - 1);
                }
                // Update in posts list
                const postIndex = state.posts.findIndex(p => p._id === postId);
                if (postIndex !== -1) {
                    state.posts[postIndex].commentCount = Math.max(0, (state.posts[postIndex].commentCount || 0) - 1);
                }
            })
            // Increment Views
            .addCase(incrementViewsAction.fulfilled, (state, action) => {
                const { id, views } = action.payload;
                // Update in singlePost
                if (state.singlePost && state.singlePost._id === id) {
                    state.singlePost.views = views;
                }
                // Update in posts list
                const index = state.posts.findIndex(p => p._id === id);
                if (index !== -1) {
                    state.posts[index].views = views;
                }
            })
            // Delete All My Posts
            .addCase(deleteAllMyPostsAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteAllMyPostsAction.fulfilled, (state) => {
                state.loading = false;
                state.myPosts = [];
                state.posts = [];
                state.pagination = {
                    ...state.pagination,
                    totalPosts: 0,
                    totalPages: 0,
                    currentPage: 1,
                    hasMore: false
                };
            })
            .addCase(deleteAllMyPostsAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearPostError, clearSinglePost, setCategory, resetPosts } = postSlice.actions;
export default postSlice.reducer;
