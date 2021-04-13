import axios from "axios";
import { getToken } from "./Auth";

const syslaudoApi = axios.create({
  baseURL: process.env.REACT_APP_API_SYSLAUDO,
});

syslaudoApi.interceptors.request.use(async (config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export default syslaudoApi;
