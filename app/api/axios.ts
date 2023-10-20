"use client";

import axios from "axios";
import Cookies from "js-cookie";

export const apiBaseUrl =
  process.env.NEXT_BASE_URL || "http://localhost:2800/api";

const Axios = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

const accessToken = Cookies.get("accessToken");

if (accessToken) {
  console.log(`Access Token is ${accessToken}`);
  Axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
} else {
  console.log("Access Token cookie not found.");
}

const refreshAccessToken = async () => {
  try {
    const response = await Axios.post("/auth/refresh-token");

    const newAccessToken = response.data.data || Cookies.get("accessToken");

    if (newAccessToken) {
      console.log(`The new access token is ${newAccessToken}`);
      Axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${newAccessToken}`;
    } else {
      console.log("New access token not found in the cookie.");
    }
  } catch (error) {
    console.log(error);
  }
};

// Interceptors for token expiration
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
       console.log("Request intercepted due to 401 error:", error.config);
      // The token has expired, make a new request
      await refreshAccessToken();

      // Retry the original request
      error.config.headers[
        "Authorization"
      ] = `Bearer ${Axios.defaults.headers.common["Authorization"]}`;
      return Axios(error.config);
    }

    return Promise.reject(error);
  }
);

export default Axios;
