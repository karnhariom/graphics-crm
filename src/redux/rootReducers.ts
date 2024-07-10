import authSlice from "@/app/(auth)/_redux/authSlice";
import userSlice from "@/app/dashboard/_redux/userSlice";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducers = combineReducers({
    auth: authSlice,
    user: userSlice
}) 