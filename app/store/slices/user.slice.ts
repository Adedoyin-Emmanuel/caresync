"use client";

import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./api.slice";

const USERS_URL = "/user";
const HOSPITALS_URL = "/hospital";
const AUTH_URL = "/auth";
const APPOINTMENTS_URL = "/appointment";

const loadFromLocalStorage = (key: string, defaultValue: any) => {
  const storedData = localStorage.getItem(key);
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (error) {
      console.error("Error parsing data from localStorage:", error);
    }
  }
  return defaultValue;
};

export interface userDashboardInfoProps {
  _id: string;
  name: string;
  username: string;
  email: string;
  profilePicture: string;
  bio: string;
  isVerified: boolean;
  allTotalAppointments: number;
  appointments: userAppointment[];
  messages: any[];
  reviews: any[];
  healthCareHistory: healthCareHistoryProps[];
  updatedAt: Date;
  createdAt: Date;
}

export interface userAppointmentInfoProps {
  _id: string;
  title?: string;
  description?: string;
  hospitalId: string;
  userId?: string;
  status: "pending" | "success" | "failed";
  startDate?: Date;
  endDate?: Date;
  reviews?: any[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface userAppointment extends userAppointmentInfoProps {
  className?: string;
  attender: string;
  dateCreated: Date;
  status: "pending" | "failed" | "success";
  id: string;
  href: string;
}

export interface healthCareHistoryProps {
  attender: string;
  _id: string;
  createdAt: Date;
  href: string;
}

const initialState = {
  userDashboardInfo: loadFromLocalStorage(
    "userDashboardInfo",
    null
  ) as userDashboardInfoProps | null,
  userAppointmentInfo: loadFromLocalStorage("userAppointmentInfo", null) as
    | userAppointmentInfoProps[]
    | null,
  recentAppointmentInfo: loadFromLocalStorage(
    "userRecentAppointmentInfo",
    null
  ) as userAppointment[] | null,
  healthCareHistoryInfo: null as healthCareHistoryProps[] | null,
};

const userSlice = createSlice({
  name: "userDashboardInfo",
  initialState,
  reducers: {
    saveDashboardInfo: (state, action) => {
      state.userDashboardInfo = action.payload;
      localStorage.setItem("userDashboardInfo", JSON.stringify(action.payload));
    },

    saveAppointmentInfo: (state, action) => {
      state.userAppointmentInfo = action.payload;
      localStorage.setItem(
        "userAppointmentInfo",
        JSON.stringify(action.payload)
      );
    },

    saveRecentAppointmentInfo: (state, action) => {
      state.recentAppointmentInfo = action.payload;
      localStorage.setItem(
        "userRecentAppointmentInfo",
        JSON.stringify(action.payload)
      );
    },

    saveHealthCareHistoryInfo: (state, action) => {
      state.healthCareHistoryInfo = action.payload;
      localStorage.setItem(
        "userHealthCareHistoryInfo",
        JSON.stringify(action.payload)
      );
    },

    resetUser: () => {
      localStorage.removeItem("userDashboardInfo");
      localStorage.removeItem("userAppointmentInfo");
      localStorage.removeItem("userRecentAppointmentInfo");
      localStorage.removeItem("userHealthCareHistoryInfo");
    },
  },
});

/*
  UserApiCalls
*/

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

    getUserById: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data}`,
        method: "GET",
      }),
    }),

    getHospitalById: builder.mutation({
      query: (data) => ({
        url: `${HOSPITALS_URL}/${data}`,
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

    getHospital: builder.mutation({
      query: () => ({
        url: `${HOSPITALS_URL}/me`,
        method: "GET",
      }),
    }),

    //appointments based endpoints
    getUserAppointments: builder.mutation({
      query: (data) => ({
        url: `${APPOINTMENTS_URL}/user/${data}`,
        method: "GET",
      }),
    }),

    getLatestAppointments: builder.mutation({
      query: (data) => ({
        url: `${APPOINTMENTS_URL}/latest/${data.id}`,
        method: "GET",
        params: {
          limit: data.limit,
          userType: data.userType,
        },
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
  useGetUserByIdMutation,
  useGetHospitalByIdMutation,
  useDeleteUserMutation,
  useDeleteHospitalMutation,

  useGetUserMutation,
  useGetHospitalMutation,

  useGetUserAppointmentsMutation,
  useGetLatestAppointmentsMutation,
} = userApiCall;
export const {
  saveDashboardInfo,
  resetUser,
  saveAppointmentInfo,
  saveRecentAppointmentInfo,
  saveHealthCareHistoryInfo,
} = userSlice.actions;
export default userSlice.reducer;
