import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../middleware/auth/authSlice";
// export const appApi = createApi({
//   reducerPath: "appApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
//   endpoints: (builder) => ({
//     saveStudent: builder.mutation({
//       query: (credentials) => ({
//         url: "/",
//         method: "POST",
//         body: { ...credentials },
//       }),
//     }),
//   }),
// });

const baseQuery = fetchBaseQuery({
  baseUrl: "https://northfield-montessori.onrender.com",
  // baseUrl: "http://localhost:3000",
  credentials: "same-origin",
  // mode: "no-cors",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery("user/refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
