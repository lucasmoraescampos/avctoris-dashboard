import axios from 'axios';
import AuthService from './AuthService';
import router from '@/router';

const client = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  }
});

client.interceptors.request.use(
  config => {
    const token = AuthService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

client.interceptors.response.use(
  response => Promise.resolve(response),
  error => {
    if (error.response.status === 401) {
      AuthService.logout();
      router.push('/login');
    }
    const errorMessage = error.response.data.message
    error.response.data.message = errorMessage.length > 200
      ? JSON.parse(errorMessage.split('code :').pop()).error.message.split(':')[0]
      : errorMessage
    throw error
    // Promise.reject(error)
  }
);

export default client;