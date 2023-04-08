import axios, { AxiosError } from 'axios';
import { getToken } from '../services';
import settings from '../settings';

const axiosApi = axios.create({
  baseURL: settings.backendBase,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosApi.interceptors.request.use(
  async (config) => {
    // const token = localStorage.getItem('token');
    const token = localStorage.token || await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
        console.log("UNAUTHORIZED")
    }
    return Promise.reject(error);
  }
);

export default axiosApi;