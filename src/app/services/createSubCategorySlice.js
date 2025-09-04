import { apiSlice } from "./apiSlice";

export const createSubCategorySlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createSubCategory: builder.mutation({
            query: (formData) => ({
                url: 'subCategory/create',
                method:'POST',
                body: formData
            }),
            invalidatesTags: ['sub-category']
        })
    })
})

export const {useCreateSubCategoryMutation} = createSubCategorySlice