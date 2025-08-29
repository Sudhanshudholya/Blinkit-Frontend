import { apiSlice } from "./apiSlice";

export const logOutSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: (value) => ({
        url: "logout",
        method: "POST",
        body: value
      }),
      invalidatesTags: ["user"],
    }),
  }),
});


export const {useLogoutMutation} = logOutSlice