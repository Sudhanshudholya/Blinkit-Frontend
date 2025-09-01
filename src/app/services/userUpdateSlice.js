import { apiSlice } from "./apiSlice";

export const userUpdateSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userUpdate: builder.mutation({
      query: (value) => ({
        url: "user/update-user",
        method: "PUT",
        body: value,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {useUserUpdateMutation} = userUpdateSlice
