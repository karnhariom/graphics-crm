import { createAsyncThunk } from "@reduxjs/toolkit";
import { isLoadingToggle } from "./authSlice";
import axios from "axios";
import { toast } from "react-toastify";

export const login: any = createAsyncThunk(
    "user/login",
    async (data: any, { rejectWithValue, fulfillWithValue, dispatch }: any) => {
        try {
            dispatch(isLoadingToggle(true));
            const response = await axios({
                method: "POST",
                url: `/api/auth/user-login`,
                data: data,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("response => ", response)
            if (response.status === 200) {
                toast.success(response?.data?.message);
                dispatch(isLoadingToggle(false));
                return fulfillWithValue(response?.data);
            } else {
                toast.error(response?.data?.message);
                dispatch(isLoadingToggle(false));
                return rejectWithValue();
            }
        } catch (err) {
            dispatch(isLoadingToggle(false));
            return rejectWithValue();
        }
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async (data, { rejectWithValue, fulfillWithValue, dispatch }: any) => {
        try {
            const response = await axios({
                method: "POST",
                url: `${process.env.REACT_APP_AUTH_URL}/user/logout`,
            });

            if (response.status === 200) {
                toast.success(response?.data?.message);
                return fulfillWithValue(response?.data?.status);
            } else {
                toast.error(response?.data?.message);
                return rejectWithValue();
            }
        } catch (error) {
            rejectWithValue();
        }
    }
);