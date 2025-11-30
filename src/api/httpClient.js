import axios from "axios";
import { API_CONFIG, JWT_CONFIG } from "./api";

// Create axios instance
const httpClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor để thêm JWT token
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(JWT_CONFIG.tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để handle token refresh và errors
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa retry, thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(JWT_CONFIG.refreshTokenKey);
        if (refreshToken) {
          const response = await axios.post(
            `${API_CONFIG.baseURL}/auth/refresh`,
            {
              refresh_token: refreshToken,
            }
          );

          const { access_token, refresh_token } = response.data;

          // Lưu token mới
          localStorage.setItem(JWT_CONFIG.tokenKey, access_token);
          localStorage.setItem(JWT_CONFIG.refreshTokenKey, refresh_token);

          // Retry request gốc với token mới
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return httpClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem(JWT_CONFIG.tokenKey);
        localStorage.removeItem(JWT_CONFIG.refreshTokenKey);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;
