import axios from 'axios';
import { API_URL, TOKEN_CYBERSOFT } from '../constants';

const fetcher = axios.create({
  baseURL: API_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
  },
});


fetcher.interceptors.request.use((config) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  if (currentUser) {
    config.headers.Authorization = `Bearer ${currentUser.accessToken}`;
  }
  return config;
});

export default fetcher;