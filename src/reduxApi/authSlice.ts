import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api",
    }),
    endpoints: (builder) => ({
        userRegister: builder.mutation({
            query: (data) => ({
                url: "/user/login-user",
                method: "POST",
                body: data,
            })
        })
    })
}) 

export const { UseUserRegisterMutation } = authApi