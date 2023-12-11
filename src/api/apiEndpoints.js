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
  }),
});

export const { useSaveStudentMutation, useInstructureRegisterMutation } = appApiEndpoints;