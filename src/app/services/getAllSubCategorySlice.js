import { apiSlice } from "./apiSlice";

export const getAllSubCategorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubCategory: builder.query({
      query: () => ({
        url: "subCategory/get",
        method: "GET",
      }),
      providesTags: ["sub-category"],
    }),
  }),
});

export const { useGetAllSubCategoryQuery } = getAllSubCategorySlice;
