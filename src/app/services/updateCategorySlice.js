import { apiSlice } from "./apiSlice";

export const updateCategorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateCategory: builder.mutation({
      query: (value) => ({
        url: "category/update-category",
        method: "PUT",
        body: value,
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {useUpdateCategoryMutation} = updateCategorySlice