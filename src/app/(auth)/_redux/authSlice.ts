import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "./authApi";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoading: false,
        token: null,
    },
    reducers: {
        isLoadingToggle: (state, action) =>
        (state = {
            ...state,
            isLoading: action.payload,
        }),
        defaultLogout: (state, action) =>
        (state = {
            ...state,
            token: null,
        }),
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.token = action.payload.token;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
        });

        builder.addCase(logout.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.token = null;
        });

        builder.addCase(logout.rejected, (state, action) => {
            state.isLoading = false;
        });
    }
})

export const {
    isLoadingToggle,
    defaultLogout,

} = authSlice.actions;
export default authSlice.reducer;