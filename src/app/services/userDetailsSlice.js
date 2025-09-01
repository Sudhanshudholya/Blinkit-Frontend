import { apiSlice } from "./apiSlice";

export const userDetailsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
    getUserDetails: builder.query({
        query: () => ({
            url: "user/user-details",
            method: "GET",
        }),
        providesTags: ["user"]
    })
    })
})

export const {useGetUserDetailsQuery} = userDetailsSlice