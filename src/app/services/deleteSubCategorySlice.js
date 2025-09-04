import { apiSlice } from "./apiSlice";

export const deleteSubCategorySlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      deleteSubCategory : builder.mutation({
        query : (value) => ({
            url: 'subCategory/delete',
            method: "DELETE",
            body: value
        }),
        invalidatesTags: ['sub-category']
      })
    })
})

export const {useDeleteSubCategoryMutation} = deleteSubCategorySlice