// import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:8080/api/v1/user/",
//   prepareHeaders: (headers) => {
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       headers.set("Authorization", `Bearer ${accessToken}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status == 401) {
//     console.log("Access token expired trying to refresh");

//     //Try to get a new token using refreshToken

//     const refreshToken = localStorage.getItem("refreshToken");

//     if (!refreshToken) {
//       localStorage.removeItem("accessToken");
//       window.location.href = "/login";
//       return result;
//     }

//     try {
//       const refreshResult = await baseQuery(
//         {
//           url: "refresh-token",
//           method: "POST",
//           body: { refreshToken },
//         },
//         api,
//         extraOptions
//       );

//       if (refreshResult?.data?.accessToken) {
//         //Save new tokens

//         localStorage.setItem("accessToken", refreshResult.data.accessToken);
//         localStorage.setItem("refreshToken", refreshResult.data.refreshToken);

//         //Retry original request with a new token

//         const retryResult = await baseQuery(args, api, extraOptions);
//         return retryResult;
//       } else {
//         //Refresh token is invalid, logout user

//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/login"; //or navigate if inside react
//         return refreshResult;
//       }
//     } catch (error) {
//       console.error("Token refresh failed", error);
//       localStorage
//         .removeItem("accessToken")
//         .localStorage.removeItem("refrewshToken");
//       window.location.href = "/login";
//       return result;
//     }
//   }
// };

import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api/v1/user/",
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log("Access token expired. Trying to refresh...");

    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
      return result;
    }

    try {
      const refreshResult = await baseQuery(
        {
          url: "refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult?.data?.accessToken) {
        localStorage.setItem("accessToken", refreshResult.data.accessToken);
        localStorage.setItem("refreshToken", refreshResult.data.refreshToken);

        // Retry original request with new token
        return await baseQuery(args, api, extraOptions);
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return refreshResult;
      }
    } catch (error) {
      console.error("Error during token refresh:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
      return result;
    }
  }

  return result;
};
