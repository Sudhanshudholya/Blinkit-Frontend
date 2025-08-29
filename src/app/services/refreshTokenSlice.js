import { apiSlice } from "./apiSlice";

export const refreshTokenSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    refreshToken: builder.mutation({
      query: (value) => ({
        url: "refresh-token",
        method: "POST",
        body: value,
        headers: {
            Authorization : `Bearer ${refreshToken}`
        }
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useRefreshTokenMutation } = refreshTokenSlice;
