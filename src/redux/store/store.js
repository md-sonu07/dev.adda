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
import tagReducer from '../slices/tagSlice';
import quickPostReducer from '../slices/quickPostSlice';
import historyReducer from '../slices/historySlice';

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
        tag: tagReducer,
        quickPost: quickPostReducer,
        history: historyReducer,
    },
});

export default store;
