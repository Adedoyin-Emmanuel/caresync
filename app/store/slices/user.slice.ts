"use client";

import { apiSlice } from "./api.slice";
import { createSlice } from "@reduxjs/toolkit";

const USERS_URL = "/user";
const HOSPITALS_URL = "/hospital";
const AUTH_URL = "/auth";



const initialState = {
  userDashboardInfo: null,
};



const userSlice = createSlice({
  name: "userDashboardInfo",
  initialState,
  reducers: {
    saveDashboardInfo: (state, action) => {
      state.userDashboardInfo = action.payload;
    },

    resetDashboard: () => {
      return initialState;
    },
  },
});


export const userApiCall = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),

    verifyEmail: builder.query({
      query: (data) => ({
        url: `${AUTH_URL}/verify-email`,
        method: "GET",
        data: data,
      }),
    }),

    confirmEmail: builder.query({
      query: (data) => ({
        url: `${AUTH_URL}/confirm-email`,
        method: "GET",
        data: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: "POST",
        data: data,
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: "POST",
        data: data,
      }),
    }),

    registerHospital: builder.mutation({
      query: (data) => ({
        url: HOSPITALS_URL,
        method: "POST",
        data: data,
      }),
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: "PUT",
        data: data,
      }),
    }),

    updateHospital: builder.mutation({
      query: (data) => ({
        url: HOSPITALS_URL,
        method: "PUT",
        data: data,
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

    //dashboard based endpoints

    getUser: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/me`,
        method: "GET",
      }),
    }),

    getHospital: builder.query({
      query: () => ({
        url: `${HOSPITALS_URL}/me`,
        method: "GET",
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

  useGetUserMutation,
  useGetHospitalQuery
} = userApiCall;
export const { saveDashboardInfo, resetDashboard } = userSlice.actions;
export default userSlice.reducer;
