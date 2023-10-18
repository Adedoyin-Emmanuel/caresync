import axios from "axios";

const apiBaseUrl = process.env.NEXT_BASE_URL || "http://localhost:2800/api";

const Axios = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

const accessToken = document?.cookie
  ?.split("; ")
  ?.find((row) => row.startsWith("X-Auth-Access-Token="))
  ?.split("=")[1];

console.log(`Access Token is ${accessToken}`);

Axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

const refreshAccessToken = async () => {
  try {
    const response = await Axios.post("/auth/refresh-token");
    console.log(response);

    const newAccessToken = document?.cookie
      ?.split("; ")
      ?.find((row) => row.startsWith("X-Auth-Access-Token="))
      ?.split("=")[1];

    console.log(`The new access token is ${newAccessToken}`);

    Axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
  } catch (error) {}
};

//Interceptors for the token expiration
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // the token has expired, make a new request
      await refreshAccessToken();

      // retry the original request
      error.config.headers[
        "Authorization"
      ] = `Bearer ${Axios.defaults.headers.common["Authorization"]}`;
      return Axios(error.config);
    }

    return Promise.reject(error);
  }
);
export default Axios;
