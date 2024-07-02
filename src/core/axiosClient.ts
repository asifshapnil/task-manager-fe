import axios from "axios";

import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { removeToken, setToken } from "./auth.service";

var numberOfAjaxCAllPending = 0;
const cookies = new Cookies();

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = cookies.get("refresh_token");
    const response = await axios.post('/refresh-token', { refresh_token: refreshToken }, {
      headers: {
        Authorization: `bearer ${refreshToken}`
      }
    });
    cookies.set("refresh_token", response.data.refresh_token, { path: "/" });
    setToken( response.data.access_token, response.data.refresh_token)

    return response.data.access_token;
  } catch (error) {
    console.error('Failed to refresh access token', error);
    removeToken();
    window.location.href = 'http:/localhost:3000/login'
    return null;
  }
};

axiosInstance.interceptors.request.use(
  function (config) {
    const token = cookies.get("access_token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    numberOfAjaxCAllPending++;

    document.body.classList.add("loading-indicator");

    return config;
  },

  function (error) {
    document.body.classList.remove("loading-indicator");
    if (numberOfAjaxCAllPending === 0) {
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    numberOfAjaxCAllPending--;

    if (numberOfAjaxCAllPending === 0) {
      document.body.classList.remove("loading-indicator");
    }

    return response;
  },

  async function (error) {
    numberOfAjaxCAllPending--;
    const originalRequest = error.config;

    document.body.classList.remove("loading-indicator");
    if (numberOfAjaxCAllPending === 0) {
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
