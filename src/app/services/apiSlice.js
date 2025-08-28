import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/user/",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json"); // 🔄 "application-json" me typo tha
      return headers; // ✅ RETURN headers
    },
  }),
  tagTypes: ["user"],
  endpoints: () => ({}),
});
