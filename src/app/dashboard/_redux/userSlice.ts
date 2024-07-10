import { createSlice } from "@reduxjs/toolkit";
import { getUserDetail } from "./userApi";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isUserLoading: false,
        userDetail: []
    },
    reducers: {
        isUserLoadingToggle: (state, action) =>
        (state = {
            ...state,
            isUserLoading: action.payload,
        }),
    },
    extraReducers: (builder) => {
        builder.addCase(getUserDetail.pending, (state, action) => {
            state.isUserLoading = true;
        });
        builder.addCase(getUserDetail.fulfilled, (state, action) => {
            
            state.isUserLoading = false;
            state.userDetail = action.payload.user;
        });
        builder.addCase(getUserDetail.rejected, (state, action) => {
            state.isUserLoading = false;
        });
    },
})

export const { isUserLoadingToggle } = userSlice.actions;
export default userSlice.reducer;