import { apiSlice } from "./apiSlice";

export const deleteCategorySlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        deleteCategory: builder.mutation({
            query: (value) => ({
                url: "category/delete-category",
                method: "DELETE",
                body: value
            }),
            invalidatesTags: ['category']
        })
    })
})

export const {useDeleteCategoryMutation} = deleteCategorySlice