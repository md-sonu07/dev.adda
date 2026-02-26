import { createSlice } from "@reduxjs/toolkit";

const loadHistory = () => {
    try {
        const serializedHistory = localStorage.getItem("readingHistory");
        if (serializedHistory === null) {
            return [];
        }
        return JSON.parse(serializedHistory);
    } catch (err) {
        return [];
    }
};

const saveHistory = (history) => {
    try {
        const serializedHistory = JSON.stringify(history);
        localStorage.setItem("readingHistory", serializedHistory);
    } catch (err) {
        // Ignore write errors
    }
};

const initialState = {
    historyPosts: loadHistory(),
    loading: false,
};

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        addToHistory: (state, action) => {
            const post = action.payload;
            // Remove if already exists to move to top
            state.historyPosts = state.historyPosts.filter(p => p._id !== post._id);
            // Add to the beginning
            state.historyPosts.unshift(post);
            // Limit to last 20 posts
            if (state.historyPosts.length > 20) {
                state.historyPosts.pop();
            }
            saveHistory(state.historyPosts);
        },
        clearHistory: (state) => {
            state.historyPosts = [];
            localStorage.removeItem("readingHistory");
        }
    }
});

export const { addToHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;
