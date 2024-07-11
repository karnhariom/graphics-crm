import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAdminLoadingToggle } from "./adminSlice";
import axios from "axios";

export const getAdminDetail: any = createAsyncThunk(
    "admin/profile-detail",
    async (data: any, { dispatch }) => {
        try {
            dispatch(isAdminLoadingToggle(true));
            const response = await axios({
                method: "GET",
                url: `/api/admin/profile-detail`,
                data: data,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("response: ", response)
            if (response.status === 200) {
                dispatch(isAdminLoadingToggle(false));
                return response?.data;
            } else {
                dispatch(isAdminLoadingToggle(false));
            }
        } catch (err: any) {
            dispatch(isAdminLoadingToggle(false));
        }
    }
)

export const getUserList: any = createAsyncThunk(
    "admin/get-users",
    async (data: any, { fulfillWithValue, rejectWithValue, dispatch }: any) => {
        try {
            dispatch(isAdminLoadingToggle(true));
            const response = await axios({
                method: "GET",
                url: `/api/admin/get-users`,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("response: ", response)
            if (response.status === 200) {
                dispatch(isAdminLoadingToggle(false));
                return fulfillWithValue(response?.data)
            } else {
                dispatch(isAdminLoadingToggle(false));
                return rejectWithValue();
            }
        } catch (err: any) {
            dispatch(isAdminLoadingToggle(false));
            return rejectWithValue();
        }
    }
)