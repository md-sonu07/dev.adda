import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../slices/themeSlice';
import authReducer from '../slices/authSlice';
import userReducer from '../slices/userSlice';
import postReducer from '../slices/postSlice';
import categoryReducer from '../slices/categorySlice';
import followReducer from '../slices/followSlice';
import bookmarkReducer from '../slices/bookmarkSlice';
import likeReducer from '../slices/likeSlice';
import commentReducer from '../slices/commentSlice';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        user: userReducer,
        post: postReducer,
        category: categoryReducer,
        follow: followReducer,
        bookmark: bookmarkReducer,
        like: likeReducer,
        comment: commentReducer,
    },
});

export default store;
