import axios from "axios";

const apiBaseUrl = process.env.NEXT_BASE_URL || "http://localhost:2800/api";

const Axios = axios.create({
    baseURL: apiBaseUrl
});

export default Axios;
