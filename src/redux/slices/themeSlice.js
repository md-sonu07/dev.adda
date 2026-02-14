import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const applyTheme = (isDark) => {
    const root = document.documentElement;
    if (isDark) {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

const initialIsDark = getInitialTheme();
applyTheme(initialIsDark);

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDark: initialIsDark,
    },
    reducers: {
        toggleTheme: (state) => {
            state.isDark = !state.isDark;
            applyTheme(state.isDark);
        },
        setTheme: (state, action) => {
            state.isDark = action.payload;
            applyTheme(state.isDark);
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
