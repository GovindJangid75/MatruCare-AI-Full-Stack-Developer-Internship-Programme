import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong';

    // Don't show toast for 401 on initial load
    if (error.response?.status === 401 && !error.config.url.includes('/me')) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error.response?.data || { message });
  }
);

// Auth API
export const authService = {
  signup: (data) => api.post('/auth/signup', data),
  verifyOTP: (data) => api.post('/auth/verify-otp', data),
  resendOTP: (data) => api.post('/auth/resend-otp', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
};

// User API
export const userService = {
  getProfile: () => api.get('/user/me'),
  updateProfile: (data) => api.put('/user/update', data),
};

// Hackathon API
export const hackathonService = {
  register: (data) => api.post('/hackathon/register', data),
  getMyEntry: () => api.get('/hackathon/my-entry'),
  updateEntry: (id, data) => api.put(`/hackathon/update/${id}`, data),
  deleteEntry: (id) => api.delete(`/hackathon/${id}`),
  getAllRegistrations: () => api.get('/hackathon/all'),
};

// Contact API
export const contactService = {
  submit: (data) => api.post('/contact', data),
  getAll: () => api.get('/contact/all'),
};

export default api;