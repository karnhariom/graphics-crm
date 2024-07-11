import { createSlice } from "@reduxjs/toolkit";
import {  getAdminDetail, getUserList } from "./adminApi";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        isAdminLoading: false,
        adminDetail: [],
        userList: []
    },
    reducers: {
        isAdminLoadingToggle: (state, action) =>
        (state = {
            ...state,
            isAdminLoading: action.payload,
        }),
    },
    extraReducers: (builder) => {
        builder.addCase(getAdminDetail.pending, (state, action) => {
            state.isAdminLoading = true;
        });
        builder.addCase(getAdminDetail.fulfilled, (state, action) => {
            state.isAdminLoading = false;
            state.adminDetail = action?.payload?.admin;
        });
        builder.addCase(getAdminDetail.rejected, (state, action) => {
            state.isAdminLoading = false;
        });

        builder.addCase(getUserList.pending, (state, action) => {
            state.isAdminLoading = true;
        });
        builder.addCase(getUserList.fulfilled, (state, action) => {
            state.isAdminLoading = false;
            state.userList = action?.payload?.data;
        });
        builder.addCase(getUserList.rejected, (state, action) => {
            state.isAdminLoading = false;
        });
    }
})

export const { isAdminLoadingToggle } = adminSlice.actions;
export default adminSlice.reducer;