import React, { createContext, useState, useEffect } from "react";
import { authApi } from "@/services/authApi";
import { JWT_CONFIG } from "@/services/api";

// Tạo context
export const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  // user = null nếu chưa đăng nhập
  // Nếu đã đăng nhập, user = { id, username, email, ... }
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem(JWT_CONFIG.tokenKey);

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
        localStorage.removeItem(JWT_CONFIG.tokenKey);
        localStorage.removeItem(JWT_CONFIG.refreshTokenKey);
      }
    }

    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials);

      // Store tokens
      localStorage.setItem(JWT_CONFIG.tokenKey, response.access_token);
      localStorage.setItem(JWT_CONFIG.refreshTokenKey, response.refresh_token);

      // Store user data
      const userData = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        loginTime: new Date().toISOString(),
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Always clear local data
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem(JWT_CONFIG.tokenKey);
      localStorage.removeItem(JWT_CONFIG.refreshTokenKey);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
