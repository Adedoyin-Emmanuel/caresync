"use client";
import Axios from "@/app/api/axios";
import { createApi } from "@reduxjs/toolkit/query/react";

interface AxiosBaseQueryProps {
  url?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  params?: any;
  headers?: any;
}



const axiosBaseQuery = async ({
  url,
  method,
  data,
  params,
  headers,
}: AxiosBaseQueryProps) => {
  try {
    const response = await Axios({
      url,
      method,
      data,
      params,
      headers,
    });
    return { data: response.data };
    console.log(response.headers);
  } catch (error: any) {
    return {
      error: {
        status: error?.response?.status,
        data: error?.response?.data || error?.message,
      },
    };
  }
};

// Define the API service
export const apiSlice = createApi({
  baseQuery: axiosBaseQuery,
  tagTypes: ["User", "Hospital", "userDashboardInfo"],
  endpoints: (builder) => ({}),
});

