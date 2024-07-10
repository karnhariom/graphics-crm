import authSlice from "@/app/(auth)/_redux/authSlice";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducers = combineReducers({
    auth: authSlice
}) 