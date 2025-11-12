import React, { createContext, useState, useEffect } from "react";

// Tạo context
export const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  // user = null nếu chưa đăng nhập
  // Nếu đã đăng nhập, user = { id, username, email, ... }
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (username, password) => {
    // Fake login
    const fakeUser = {
      id: 1,
      username: username,
      email: `${username}@example.com`,
    };
    setUser(fakeUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
