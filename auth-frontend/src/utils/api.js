import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/auth', // Remove /register from here
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to request headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
