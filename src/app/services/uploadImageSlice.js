import {apiSlice} from "./apiSlice"
export const uploadImageSlice = apiSlice.injectEndpoints({
    endpoints :(builder) => ({
        uploadImage :builder.mutation({
            query: (formData) => ({
                url: 'file/upload',
                method: "POST",
                body: formData
            }),
            invalidatesTags: ['file']
        })
    })
})

export const {useUploadImageMutation} = uploadImageSlice