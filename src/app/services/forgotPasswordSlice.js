import { apiSlice } from "./apiSlice";

export const forgotPasswordSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        forgotPassword:builder.mutation({
            query: (value) => ({
                url: "user/forgot-password",
                method: "PUT",
                body: value
            }),
            invalidatesTags: ["user"]
        })
    })
})

export const {useForgotPasswordMutation} = forgotPasswordSlice