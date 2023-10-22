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
      console.log("Request intercepted due to 401 error:", error.config);
      if (
        error.response.data.message.includes("invalid token") ||
        error.response.data.message.includes("Invalid auth token")
      ) {
        console.log(error.response.data.message);
        return;
      } else {
        await refreshAccessToken();
      }

      return Axios(error.config);
    }

    return Promise.reject(error);
  }
);

export default Axios;
