import { apiSlice } from "./apiSlice";

export const addCategorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (formData) => ({
        url: "category/add-category",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {useAddCategoryMutation} = addCategorySlice