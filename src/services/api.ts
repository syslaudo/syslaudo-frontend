import axios from 'axios';
import { token } from "./auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_SYSLAUDO,
});

api.interceptors.request.use(async (config) => {
  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export default api;
