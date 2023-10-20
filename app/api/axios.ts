"use client";

import axios from "axios";

export const apiBaseUrl =
  process.env.NEXT_BASE_URL || "http://localhost:2800/api";

const Axios = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});




const refreshAccessToken = async () => {
  try {
    const response = await Axios.post("/auth/refresh-token");

    if (response) {
      console.log("Request to refresh token endpoint successful");
      console.log(response.data.data);
    }
  } catch (error) {
    console.log(error);
  }
};

// // Interceptors for token expiration
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log(error.response);
      console.log("Request intercepted due to 401 error:", error.config);

      await refreshAccessToken();

      //return Axios(error.config);
    }

    return Promise.reject(error);
  }
);

export default Axios;
