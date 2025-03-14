// app/services/userService.ts
import apiClient from "./apiClient";

export const getUserDetails = async () => {
  try {
    const response = await apiClient.get('/details');
    return { status: response.status, data: response.data };
  } catch (error: any) {
    return { 
      status: error.response?.status || 500, 
      data: error.response?.data || { message: "Failed to fetch user details" }
    };
  }
};