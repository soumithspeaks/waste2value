import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_CONFIG} from '../constants';

// Create axios instance
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
api.interceptors.response.use(
  response => response.data,
  async error => {
    if (error.response?.status === 401) {
      // Token expired, clear storage and redirect to login
      await AsyncStorage.multiRemove(['token', 'refreshToken', 'user']);
      // You can emit an event here to navigate to login
    }
    return Promise.reject(error);
  },
);

// Auth API
export const authAPI = {
  login: (email, password) =>
    api.post('/auth/user/login', {email, password}),
  
  register: userData =>
    api.post('/auth/user/register', userData),
  
  refreshToken: refreshToken =>
    api.post('/auth/refresh', {refreshToken}),
};

// User API
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  
  updateProfile: userData => api.put('/users/profile', userData),
  
  getDashboard: () => api.get('/users/dashboard'),
  
  getPickupHistory: () => api.get('/users/pickups'),
  
  getWallet: () => api.get('/users/wallet'),
  
  getAddresses: () => api.get('/users/addresses'),
  
  addAddress: addressData => api.post('/users/addresses', addressData),
  
  updateAddress: (id, addressData) =>
    api.put(`/users/addresses/${id}`, addressData),
  
  deleteAddress: id => api.delete(`/users/addresses/${id}`),
};

// Waste API
export const wasteAPI = {
  getWasteTypes: () => api.get('/waste/types'),
  
  classifyWaste: imageFormData =>
    api.post('/waste/classify', imageFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  getPricing: wasteTypeId => api.get(`/waste/pricing/${wasteTypeId}`),
};

// Pickup API
export const pickupAPI = {
  createPickup: pickupData => api.post('/pickups', pickupData),
  
  getPickup: id => api.get(`/pickups/${id}`),
  
  trackPickup: id => api.get(`/pickups/${id}/track`),
  
  cancelPickup: id => api.post(`/pickups/${id}/cancel`),
  
  ratePickup: (id, ratingData) =>
    api.post(`/pickups/${id}/rate`, ratingData),
};

// Payment API
export const paymentAPI = {
  getTransactionHistory: () => api.get('/payments/transactions/history'),
  
  getPayment: id => api.get(`/payments/${id}`),
};

export default api;
