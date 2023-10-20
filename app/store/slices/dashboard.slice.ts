"use client";

import { apiSlice } from "./api.slice";
const USERS_URL = "/user";
const HOSPITALS_URL = "/hospital";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserMe: builder.query({
      query: () => ({
        url: `${USERS_URL}/me`,
        method: "PUT",
      }),
    }),

    getHospitalMe: builder.query({
      query: () => ({
        url: `${HOSPITALS_URL}/me`,
        method: "PUT",
      }),
    }),
  }),
});

export const { useGetUserMeQuery, useGetHospitalMeQuery } = userApiSlice;
