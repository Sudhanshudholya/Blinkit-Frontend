import { apiSlice } from "./apiSlice";

export const otpVerificationSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
         otpVerification : builder.mutation({
           query:(value) => ({
            url: "user/verify-forgot-password-otp",
            method: "PUT",
            body: value
           }),
            invalidatesTags:["user"]
         })
    })
})

export const {useOtpVerificationMutation} = otpVerificationSlice