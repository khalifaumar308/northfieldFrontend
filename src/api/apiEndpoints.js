import { apiSlice } from "./apiSlice";

export const appApiEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveStudent: builder.mutation({
      query: (credentials) => ({
        url: "/sendresult",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    instructureRegister: builder.mutation({
      query: (credentials) => ({
        url: "/user/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    saveClassData: builder.mutation({
      query: (credentials) => ({
        url: "/user/data",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getClassData: builder.query({
      query: (classs) => ({
        url: `user/data/?class=${classs}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useSaveStudentMutation,
  useInstructureRegisterMutation,
  useSaveClassDataMutation,
  useGetClassDataQuery,
} = appApiEndpoints;
