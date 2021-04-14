import axios from 'axios';

export const dummyApi = axios.create({
  baseURL: process.env.REACT_APP_API_DBFAKE,
});
