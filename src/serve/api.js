import React from "react";
import axios from "axios";

import baseUrl from "./config";

axios.defaults.headers["Content-Type"] = "application/json";

let config = {
  baseURL: baseUrl,
  timeout: 60 * 1000,
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error.response);
  }
);

React.Component.prototype.$axios = _axios;
