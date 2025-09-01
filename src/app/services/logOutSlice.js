import { apiSlice } from "./apiSlice";

export const logoutSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: (value) => ({
        url: "user/logout",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useLogoutMutation } = logoutSlice;
