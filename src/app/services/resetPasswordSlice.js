import { apiSlice } from "./apiSlice";

export const resetPasswordSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        resetPassword: builder.mutation({
            query: (value) => ({
                url: "reset-password",
                method: "PUT",
                body: value
            }),
             invalidatesTags: ["user"]
        })
    })
})

export const {useResetPasswordMutation} = resetPasswordSlice