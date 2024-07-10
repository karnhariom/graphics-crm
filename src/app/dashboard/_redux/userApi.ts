import { createAsyncThunk } from "@reduxjs/toolkit";
import { isUserLoadingToggle } from "./userSlice";
import axios from "axios";
import { toast } from "react-toastify";

export const getUserDetail: any = createAsyncThunk(
    "user/profile-detail",
    async (data: any, { dispatch }) => {
        try {
            dispatch(isUserLoadingToggle(true));
            const response = await axios({
                method: "GET",
                url: `/api/user/profile-detail`,
                data: data,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                dispatch(isUserLoadingToggle(false));
                return response?.data;
            } else {
                dispatch(isUserLoadingToggle(false));
            }
        } catch (err: any) {
            dispatch(isUserLoadingToggle(false));
        }
    }
)

export const changeUserPassword: any = createAsyncThunk(
    "user/change-password",
    async (data: any, { dispatch }) => {
        try {
            dispatch(isUserLoadingToggle(true));
            const response = await axios({
                method: "POST",
                url: `/api/user/change-password`,
                data: data,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                dispatch(isUserLoadingToggle(false));
                toast.success(response?.data?.message)
                return response?.data;
            } else {
                toast.error(response?.data?.message)
                dispatch(isUserLoadingToggle(false));
            }
        } catch (err: any) {
            dispatch(isUserLoadingToggle(false));
        }
    }
)
