import { apiSlice } from "./api.slice";
const USERS_URL = "/user";
const HOSPITALS_URL = "/hospital";
const AUTH_URL = "/auth";

export const userApiSlice:any = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),

    verifyEmail: builder.query({
      query: (data) => ({
        url: `${AUTH_URL}/verify-email`,
        method: "GET",
        body: data,
      }),
    }),

    confirmEmail: builder.query({
      query: (data) => ({
        url: `${AUTH_URL}/confirm-email`,
        method: "GET",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),

    registerUser: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: "POST",
        body: data,
      }),
    }),

    registerHospital: builder.mutation({
      query: (data) => ({
        url: HOSPITALS_URL,
        method: "POST",
        body: data,
      }),
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: "PUT",
        body: data,
      }),
    }),

    updateHospital: builder.mutation({
      query: (data) => ({
        url: HOSPITALS_URL,
        method: "PUT",
        body: data,
      }),
    }),

    getAllUsers: builder.query({
      query: (data) => ({
        url: USERS_URL,
        method: "GET",
      }),
    }),

    getAllHospitals: builder.query({
      query: (data) => ({
        url: HOSPITALS_URL,
        method: "GET",
      }),
    }),

    getUserById: builder.query({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "GET",
      }),
    }),

    getHospitalsById: builder.query({
      query: (data) => ({
        url: `${HOSPITALS_URL}/${data.id}`,
        method: "GET",
      }),
    }),

    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "DELETE",
      }),
    }),

    deleteHospital: builder.mutation({
      query: (data) => ({
        url: `${HOSPITALS_URL}/${data.id}`,
        method: "DELETE",
      }),
    }),
  }),
});


export const {
  useLoginMutation,
  useLogoutMutation,
  useVerifyEmailQuery,
  useConfirmEmailQuery,
  useForgotPasswordMutation,
  useRegisterUserMutation,
  useRegisterHospitalMutation,
  useUpdateUserMutation,
  useUpdateHospitalMutation,
  useGetAllUsersQuery,
  useGetAllHospitalsQuery,
  useGetUserByIdQuery,
  useGetHospitalsByIdQuery,
  useDeleteUserMutation,
  useDeleteHospitalMutation,
} = userApiSlice;
