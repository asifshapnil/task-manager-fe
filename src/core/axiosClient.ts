import axios from "axios";

import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { getUserInfo, removeToken, setToken } from "./auth.service";
import { isToastUnavailableRoute } from "./is-toast-unavailble-route";

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
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/refresh`, { email: getUserInfo().email, refresh_token: refreshToken }, {
      headers: {
        Authorization: `bearer ${refreshToken}`
      }
    });
    cookies.set("refresh_token", response.data.refresh_token, { path: "/" });
    setToken(response.data.access_token, response.data.refresh_token)

    return response.data.access_token;
  } catch (error) {
    console.error('Failed to refresh access token', error);
    removeToken();
    window.location.href = `http://localhost:3001/login`
    return null;
  }
};

axiosInstance.interceptors.request.use(
  function (config) {

    const token = cookies.get("access_token");

    config.headers["Authorization"] = `Bearer ${token}`;
    if (token) {
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

    const { method } = response.config;
    const responseURL = response.request.responseURL;
    const isAvailable = isToastUnavailableRoute(responseURL);

    if ((method === "put" || method === "post" || method === "delete") && !isAvailable) {
      toast.success('Data updated successfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
      });
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
    } else {
      if (error?.response?.data?.message) {
        for (let err of error.response.data.message) {
          toast.error(err, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
          });
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
