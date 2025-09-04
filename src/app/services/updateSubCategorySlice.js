import { apiSlice } from "./apiSlice";

export const updateSubCategorySlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        updateSubCategory: builder.mutation({
            query: (value) => ({
                url: "subCategory/update",
                method: "PUT",
                body: value
            }),
            invalidatesTags : ['sub-category']
            
        })
    })
})

export const {useUpdateSubCategoryMutation} = updateSubCategorySlice