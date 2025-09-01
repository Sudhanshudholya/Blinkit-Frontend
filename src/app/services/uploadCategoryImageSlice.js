import {apiSlice} from "./apiSlice"
export const uploadCategoryImageSlice = apiSlice.injectEndpoints({
    endpoints :(builder) => ({
        uploadCategoryImage :builder.mutation({
            query: (formData) => ({
                url: 'file/upload',
                method: "POST",
                body: formData
            }),
            invalidatesTags: ['file']
        })
    })
})

export const {useUploadCategoryImageMutation} = uploadCategoryImageSlice