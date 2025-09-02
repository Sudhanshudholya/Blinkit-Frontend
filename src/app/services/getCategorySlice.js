import { apiSlice } from "./apiSlice";

export const getCategorySlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getCategory:builder.query({
            query: () => (
                {
                    url: "category/get-category",
                    method: "GET"
                }
            ),
            providesTags: ['category']
        })
    })
})

export const {useGetCategoryQuery} = getCategorySlice