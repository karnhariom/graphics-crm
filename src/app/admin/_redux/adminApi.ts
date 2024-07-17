import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAdminLoadingToggle } from "./adminSlice";
import axios from "axios";
import { toast } from "react-toastify";

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

export const addCategory: any = createAsyncThunk(
    "admin/create-category",
    async (data: any, { rejectWithValue, fulfillWithValue, dispatch }: any) => {
        try {
            dispatch(isAdminLoadingToggle(true));
            const response = await axios({
                method: "POST",
                url: `/api/admin/create-category`,
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                toast.success(response?.data?.message);
                dispatch(getCategories())
                dispatch(isAdminLoadingToggle(false));
                return fulfillWithValue(response?.data);
            } else {
                toast.error(response?.data?.message);
                dispatch(isAdminLoadingToggle(false));
                return rejectWithValue();
            }
        } catch (err) {
            dispatch(isAdminLoadingToggle(false));
            return rejectWithValue();
        }
    }
);

export const getCategories: any = createAsyncThunk(
    "admin/get-categories",
    async (data: any, { rejectWithValue, fulfillWithValue, dispatch }: any) => {
        try {
            dispatch(isAdminLoadingToggle(true));
            const response = await axios({
                method: "GET",
                url: `/api/admin/get-categories`,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("response => ", response)
            if (response.status === 200) {
                toast.success(response?.data?.message);
                dispatch(isAdminLoadingToggle(false));
                return fulfillWithValue(response?.data);
            } else {
                toast.error(response?.data?.message);
                dispatch(isAdminLoadingToggle(false));
                return rejectWithValue();
            }
        } catch (err) {
            dispatch(isAdminLoadingToggle(false));
            return rejectWithValue();
        }
    }
);

export const deleteCategory: any = createAsyncThunk(
    "admin/delete-category",
    async (data: any, { dispatch }: any) => {
        try {
            dispatch(isAdminLoadingToggle(true));
            const response = await axios({
                method: "POST",
                url: `/api/admin/delete-category`,
                data: data,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                dispatch(isAdminLoadingToggle(false));
                dispatch(getCategories())
                toast.success(response?.data?.message);
                return response?.data;
            } else {
                toast.error(response?.data?.message);
                dispatch(isAdminLoadingToggle(false));
            }
        } catch (err) {
            console.log('err: ', err);
            dispatch(isAdminLoadingToggle(false));
        }
    }
);

export const addProduct: any = createAsyncThunk(
    "admin/add-product",
    async (data: any, { rejectWithValue, fulfillWithValue, dispatch }: any) => {
        try {
            dispatch(isAdminLoadingToggle(true));
            const response = await axios({
                method: "POST",
                url: `/api/admin/add-product`,
                data: data,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                toast.success(response?.data?.message);
                dispatch(getCategories())
                dispatch(isAdminLoadingToggle(false));
                return fulfillWithValue(response?.data);
            } else {
                toast.error(response?.data?.message);
                dispatch(isAdminLoadingToggle(false));
                return rejectWithValue();
            }
        } catch (err) {
            dispatch(isAdminLoadingToggle(false));
            return rejectWithValue();
        }
    }
);
