// app/services/authService.js
import apiClient from './apiClient';

export const login = async (credentials:any) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return { status: response.status, data: response.data };
  } catch (error:any) {
    return { status: error.response?.status || 500, data: error.response?.data };
  }
};

export const signUp = async (userData:any) => {
  try {
 
    const response = await apiClient.post('/auth/signup', userData);
    return { status: response.status, data: response.data };
  } catch (error:any) {
    return { status: error.response?.status || 500, data: error.response?.data };
  }
};