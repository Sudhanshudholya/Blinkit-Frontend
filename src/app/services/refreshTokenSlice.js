import { apiSlice } from "./apiSlice";

const refreshToken = localStorage.getItem('refreshToken');

export const refreshTokenSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    refreshToken: builder.mutation({
      query: (value) => ({
        url: "user/refresh-token",
        method: "POST",
        body: value,
        headers: {
            Authorization : `Bearer ${value.refreshToken}`
        }
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useRefreshTokenMutation } = refreshTokenSlice;
