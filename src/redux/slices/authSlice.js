import { createSlice } from '@reduxjs/toolkit';
import { registerAction, loginAction, logoutAction } from '../thunks/authThunk';
import { getUserProfileAction } from '../thunks/userThunk';

const initialState = {
    user: null,
    isAdmin: false,
    loading: true,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Register
        builder
            .addCase(registerAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerAction.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.User;
                state.isAdmin = action.payload.isAdmin;
                localStorage.setItem("isLoggedIn", "true");
            })
            .addCase(registerAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Login
        builder
            .addCase(loginAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.User;
                state.isAdmin = action.payload.isAdmin;
                localStorage.setItem("isLoggedIn", "true");
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Logout
        builder
            .addCase(logoutAction.fulfilled, (state) => {
                state.user = null;
                state.isAdmin = false;
                localStorage.removeItem("isLoggedIn");
            });

        // Profile (Session Check)
        builder
            .addCase(getUserProfileAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserProfileAction.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.UserProfile;
                state.isAdmin = action.payload.isAdmin;
                localStorage.setItem("isLoggedIn", "true");
            })
            .addCase(getUserProfileAction.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAdmin = false;
                localStorage.removeItem("isLoggedIn");
            });
    }
});

export const { clearError, setLoading } = authSlice.actions;
export default authSlice.reducer;
