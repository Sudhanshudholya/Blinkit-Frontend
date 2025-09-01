import { apiSlice } from "./apiSlice";

export const userAvatarSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userAvatarUpload: builder.mutation({
      query: (formData) => ({
        url: "user/upload-avatar",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useUserAvatarUploadMutation } = userAvatarSlice;
