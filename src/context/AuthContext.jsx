// src/context/AuthContext.jsx
import React, { createContext, useState } from "react";

// Tạo context
export const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  // user = null nếu chưa đăng nhập
  // Nếu đã đăng nhập, user = { id, username, email, ... }
  const [user, setUser] = useState(null);

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
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
