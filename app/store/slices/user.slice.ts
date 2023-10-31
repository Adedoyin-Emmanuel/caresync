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
  location?: string;

  //looks weird adding this here, well an hospital is also a type of user soo yeah YGTV
  clinicName?: string;
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

export interface hospitalProps {
  _id: string;
  clinicName: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  isVerified: boolean;
  appointments: userAppointment[];
  messages: [];
  reviews: [];
  healthCareHistory: healthCareHistoryProps[];
  allTotalAppointments: number;
  bio: string;
  location?: string;
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
  healthCareHistoryInfo: loadFromLocalStorage(
    "userHealthCareHistoryInfo",
    null
  ) as healthCareHistoryProps[] | null,
  hospitalSearchInfo: loadFromLocalStorage("userHospitalSearchInfo", null) as
    | hospitalProps[]
    | null,
  hospitalSearchProfileInfo: loadFromLocalStorage(
    "userHospitalSearchProfileInfo",
    null
  ) as hospitalProps | null,

  userSearchInfo: loadFromLocalStorage("hospitalUserSearchInfo", null) as
    | userDashboardInfoProps[]
    | null,

  userSearchProfileInfo: loadFromLocalStorage(
    "hospitalUserSearchProfileInfo",
    null
  ) as userDashboardInfoProps | null,

  /*
     @see this relates to when the user clicks a particular appointment from all appointments
     
   */
  userSpecificAppointmentInfo: loadFromLocalStorage(
    "userSpecificAppointmentInfo",
    null
  ) as userAppointment | null,
};

const userSlice = createSlice({
  name: "userDashboardInfo",
  initialState,
  reducers: {
    saveDashboardInfo: (state, action) => {
      state.userDashboardInfo = action.payload;
      localStorage.setItem("userDashboardInfo", JSON.stringify(action.payload));
    },


    // all appointment information this is for not specific for a user or hospital
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

    //action to dispatch when an hospital search for a user
    saveHospitalSearchInfo: (state, action) => {
      state.hospitalSearchInfo = action.payload;
      localStorage.setItem(
        "userHospitalSearchInfo",
        JSON.stringify(action.payload)
      );
    },

    //action to dispatch when an hospital search for a user and then wants to view his/her profile
    saveHospitalSearchProfileInfo: (state, action) => {
      state.hospitalSearchProfileInfo = action.payload;
      localStorage.setItem(
        "userHospitalSearchProfileInfo",
        JSON.stringify(action.payload)
      );
    },

    //action to dispatch when a user searches for an hosptial
    saveUserSearchInfo: (state, action) => {
      state.userSearchInfo = action.payload;
      localStorage.setItem(
        "hospitalUserSearchInfo",
        JSON.stringify(action.payload)
      );
    },

    //action to dispatch when a user searches for an hosptial and then wants to view their profile
    saveUserSearchProfileInfo: (state, action) => {
      state.userSearchProfileInfo = action.payload;
      localStorage.setItem(
        "hospitalUserSearchProfileInfo",
        JSON.stringify(action.payload)
      );
    },

    // this is a specific appointment, like one out of many
    saveUserSpecificAppointmentInfo: (state, action) => {
      state.userSpecificAppointmentInfo = action.payload;
      localStorage.setItem(
        "userSpecificAppointmentInfo",
        JSON.stringify(action.payload)
      );
    },

    // clear data reducers

    clearHospitalSearchInfo: (state, action) => {
      state.hospitalSearchInfo = null;
      localStorage.removeItem("userHospitalSearchInfo");
    },

    clearUserSearchInfo: (state, action) => {
      state.userSearchInfo = null;
      localStorage.removeItem("hospitalUserSearchInfo");
    },

    resetUser: () => {
      localStorage.removeItem("userDashboardInfo");
      localStorage.removeItem("userAppointmentInfo");
      localStorage.removeItem("userRecentAppointmentInfo");
      localStorage.removeItem("userHealthCareHistoryInfo");
      localStorage.removeItem("userHospitalSearchInfo");
      localStorage.removeItem("userHospitalSearchProfileInfo");
      localStorage.removeItem("hospitalUserSearchInfo");
      localStorage.removeItem("userSpecificAppointmentInfo");
      localStorage.removeItem("hospitalUserSearchProfileInfo");
    },
  },
});

/*
  UserApiCalls
*/

export const userApiCall = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //auth based endpoints

    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["User", "Hospital"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["User", "Hospital"],
    }),

    verifyEmail: builder.query({
      query: (data) => {
        return {
          url: `${AUTH_URL}/verify-email?email=${data}`,
          method: "GET",
        };
      },
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

    // miscellaneous

    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "PUT",
        data: data.body,
      }),
      invalidatesTags: ["User", "Hospital"],
    }),

    updateHospital: builder.mutation({
      query: (data) => ({
        url: `${HOSPITALS_URL}/${data.id}`,
        method: "PUT",
        data: data.body,
      }),
      invalidatesTags: ["User", "Hospital"],
    }),

    getAllUsers: builder.query({
      query: (data) => ({
        url: USERS_URL,
        method: "GET",
      }),
      providesTags: ["User", "Hospital"],
    }),

    getAllHospitals: builder.query({
      query: (data) => ({
        url: HOSPITALS_URL,
        method: "GET",
      }),
      providesTags: ["User", "Hospital"],
    }),

    getUserById: builder.query({
      query: (data) => ({
        url: `${USERS_URL}/${data}`,
        method: "GET",
      }),
      providesTags: ["User", "Hospital"],
    }),

    getHospitalById: builder.query({
      query: (data) => ({
        url: `${HOSPITALS_URL}/${data}`,
        method: "GET",
      }),
      providesTags: ["User", "Hospital"],
    }),

    searchHospital: builder.query({
      query: (data) => ({
        url: `${HOSPITALS_URL}/search`,
        method: "GET",
        params: {
          searchTerm: data,
        },
      }),
      providesTags: ["User", "Hospital"],
    }),

    //search user

    searchUser: builder.query({
      query: (data) => ({
        url: `${USERS_URL}/search`,
        method: "GET",
        params: {
          searchTerm: data,
        },
      }),
      providesTags: ["User", "Hospital"],
    }),

    getHospitalRating: builder.query({
      query: (data) => ({
        url: `${HOSPITALS_URL}/rating/${data}`,
        method: "GET",
      }),
      providesTags: ["User", "Hospital"],
    }),

    // user resource deletion

    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User", "Hospital"],
    }),

    deleteHospital: builder.mutation({
      query: (data) => ({
        url: `${HOSPITALS_URL}/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User", "Hospital"],
    }),

    //dashboard based endpoints

    getUser: builder.query({
      query: () => ({
        url: `${USERS_URL}/me`,
        method: "GET",
      }),
      providesTags: ["User", "Hospital"],
    }),

    getHospital: builder.query({
      query: () => ({
        url: `${HOSPITALS_URL}/me`,
        method: "GET",
      }),
      providesTags: ["User", "Hospital"],
    }),

    //appointments based endpoints
    getUserAppointments: builder.query({
      query: (data) => ({
        url: `${APPOINTMENTS_URL}/user/${data}`,
        method: "GET",
      }),
      providesTags: ["User", "Hospital"],
    }),

    getHospitalAppointments: builder.query({
      query: (data) => ({
        url: `${APPOINTMENTS_URL}/hospital/${data}`,
        method: "GET",
      }),
      providesTags: ["User", "Hospital"],
    }),

    getAppointmentById: builder.query({
      query: (data) => ({
        url: `${APPOINTMENTS_URL}/${data}`,
        method: "GET",
      }),
      providesTags: ["User", "Hospital"],
    }),

    getLatestAppointments: builder.query({
      query: (data) => {
        return {
          url: `${APPOINTMENTS_URL}/latest/${data.id}`,
          method: "GET",
          params: {
            userType: data.userType,
            limit: data.limit,
          },
        };
      },
      providesTags: ["User", "Hospital"],
    }),

    createAppointment: builder.mutation({
      query: (data) => ({
        url: APPOINTMENTS_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["User", "Hospital"],
    }),

    updateAppointment: builder.mutation({
      query: (data) => {
        const { id, ...dataWithoutId } = data;

        return {
          url: `${APPOINTMENTS_URL}/${id}`,
          method: "PUT",
          data: dataWithoutId,
        };
      },
      invalidatesTags: ["User", "Hospital"],
    }),

    cancelAppointment: builder.mutation({
      query: (data) => {
        const { id } = data;

        return {
          url: `${APPOINTMENTS_URL}/cancel/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["User", "Hospital"],
    }),

    approveAppointment: builder.mutation({
      query: (data) => {
        const { id } = data;

        return {
          url: `${APPOINTMENTS_URL}/approve/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["User", "Hospital"],
    }),

    deleteAppointment: builder.mutation({
      query: (data) => {
        const { id, ...dataWithoutId } = data;

        return {
          url: `${APPOINTMENTS_URL}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["User", "Hospital"],
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
  useGetHospitalByIdQuery,
  useDeleteUserMutation,
  useDeleteHospitalMutation,

  useSearchHospitalQuery,
  useGetHospitalRatingQuery,

  useSearchUserQuery,

  useGetUserQuery,
  useGetHospitalQuery,

  useGetUserAppointmentsQuery,
  useGetHospitalAppointmentsQuery,
  useGetAppointmentByIdQuery,
  useGetLatestAppointmentsQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useCancelAppointmentMutation,
  useApproveAppointmentMutation,
  useDeleteAppointmentMutation,
} = userApiCall;
export const {
  saveDashboardInfo,
  resetUser,
  saveAppointmentInfo,
  saveRecentAppointmentInfo,
  saveHealthCareHistoryInfo,
  saveHospitalSearchInfo,
  saveHospitalSearchProfileInfo,
  saveUserSpecificAppointmentInfo,
  saveUserSearchInfo,
  saveUserSearchProfileInfo,
  clearHospitalSearchInfo,
  clearUserSearchInfo,
} = userSlice.actions;
export default userSlice.reducer;
