// src/api/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Adjust based on backend server
});

export default axiosInstance;
