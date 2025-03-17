import apiClient from "./apiClient";

export const addMenuItem = async (restaurantId:string, menuItem:any) => {
  try {
    const response = await apiClient.post(`/restaurants/${restaurantId}/menu`, menuItem);
    return { status: response.status, data: response.data };
  } catch (error:any) {
    return { 
      status: error.response?.status || 500, 
      data: error.response?.data || { message: "Failed to add menu item" }
    };
  }
};
export const getAllMenuItem = async (restaurantId:string, menuItem:any) => {
  try {
    const response = await apiClient.get(`/restaurants/${restaurantId}/menu`);
    return { status: response.status, data: response.data };
  } catch (error:any) {
    return { 
      status: error.response?.status || 500, 
      data: error.response?.data || { message: "Failed to get menu item" }
    };
  }
};
