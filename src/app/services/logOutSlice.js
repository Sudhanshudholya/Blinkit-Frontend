import { apiSlice } from "./apiSlice";

export const logoutSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST",
        headers : {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useLogoutMutation } = logoutSlice;
