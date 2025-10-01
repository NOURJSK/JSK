// lib/authApi.ts
import { apiService } from "./apiService"

export const authApi = {
  login: async (email: string, password: string) => {
    await apiService.getCsrfCookie();
    const response = await apiService.login(email, password);
    
    if (response.token) {
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      return response;
    }
    throw new Error("Login failed: No token received");
  },

  logout: async () => {
    await apiService.logout();
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
    }
  },

  register: async (
    first_name: string, 
    last_name: string, 
    email: string, 
    password: string, 
    password_confirmation: string
  ) => {
    await apiService.getCsrfCookie();
    return apiService.register(first_name, last_name, email, password, password_confirmation);
  },

  isAuthenticated: (): boolean => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("auth_token");
    }
    return false;
  },

  getCurrentUser: () => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },

forgotPassword: async (email: string) => {
  await apiService.getCsrfCookie();
  return apiService.forgotPassword(email);
},

resetPassword: async (token: string, email: string, password: string, password_confirmation: string) => {
  await apiService.getCsrfCookie();
  return apiService.resetPassword(token, email, password, password_confirmation);
},
};