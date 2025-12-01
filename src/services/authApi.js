import httpClient from "./httpClient";
import { API_ENDPOINTS, API_CONFIG } from "./api";

// Mock database cho auth
let mockUsers = [
  {
    id: 1,
    username: "Nguyen Van A",
    email: "a@gmail.com",
    password_hash: "123456",
  },
];

// Utility function để simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ==================== MOCK AUTHENTICATION APIs ====================

/**
 * Mock login user
 */
export const mockLogin = async (credentials) => {
  await delay(500);
  const user = mockUsers.find(
    (u) =>
      u.email === credentials.email && u.password_hash === credentials.password
  );

  if (user) {
    const token = `mock-jwt-token-${user.id}`;
    return {
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
      },
      access_token: token,
      refresh_token: `mock-refresh-token-${user.id}`,
    };
  }
  throw new Error("Invalid credentials");
};

/**
 * Mock register user
 */
export const mockRegister = async (userData) => {
  await delay(500);
  // Check if user already exists
  const existingUser = mockUsers.find((u) => u.email === userData.email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const newUser = {
    id: mockUsers.length + 1,
    username: userData.name,
    email: userData.email,
    password_hash: userData.password,
  };
  mockUsers.push(newUser);

  const token = `mock-jwt-token-${newUser.id}`;
  return {
    user: {
      id: newUser.id,
      name: newUser.username,
      email: newUser.email,
    },
    access_token: token,
    refresh_token: `mock-refresh-token-${newUser.id}`,
  };
};

/**
 * Mock logout
 */
export const mockLogout = async () => {
  await delay(500);
  return { message: "Logged out successfully" };
};

/**
 * Mock get profile
 */
export const mockGetProfile = async (userId) => {
  await delay(500);
  const user = mockUsers.find((u) => u.id === userId);
  if (!user) throw new Error("User not found");

  return {
    id: user.id,
    name: user.username,
    email: user.email,
    profile: {
      avatar: null,
      bio: "Mock user profile",
      joinedAt: new Date().toISOString(),
    },
  };
};

// ==================== REAL AUTHENTICATION APIs ====================

/**
 * Login user
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} Login response with user data and tokens
 */
export const login = async (credentials) => {
  try {
    const response = await httpClient.post(API_ENDPOINTS.LOGIN, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

/**
 * Register new user
 * @param {Object} userData - User registration data
 * @param {string} userData.name - User name
 * @param {string} userData.email - User email
 * @param {string} userData.password - User password
 * @returns {Promise<Object>} Registration response with user data and tokens
 */
export const register = async (userData) => {
  try {
    const response = await httpClient.post(API_ENDPOINTS.REGISTER, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

/**
 * Logout user
 * @returns {Promise<Object>} Logout response
 */
export const logout = async () => {
  try {
    const response = await httpClient.post(API_ENDPOINTS.LOGOUT);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

/**
 * Refresh access token
 * @param {string} refreshToken - Refresh token
 * @returns {Promise<Object>} New tokens response
 */
export const refreshToken = async (refreshToken) => {
  try {
    const response = await httpClient.post(API_ENDPOINTS.REFRESH_TOKEN, {
      refresh_token: refreshToken,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Token refresh failed");
  }
};

/**
 * Get user profile
 * @param {number} userId - User ID
 * @returns {Promise<Object>} User profile data
 */
export const getProfile = async (userId) => {
  try {
    const response = await httpClient.get(API_ENDPOINTS.PROFILE);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};

// ==================== API SWITCHER ====================

/**
 * Get the appropriate API function based on configuration
 * @param {string} functionName - Name of the API function
 * @returns {Function} The appropriate API function (mock or real)
 */
const getAuthApiFunction = (functionName) => {
  const useMock = API_CONFIG.useMockAPI;

  const mockFunctions = {
    login: mockLogin,
    register: mockRegister,
    logout: mockLogout,
    refreshToken: () => Promise.resolve({}), // Mock refresh
    getProfile: mockGetProfile,
  };

  const realFunctions = {
    login,
    register,
    logout,
    refreshToken,
    getProfile,
  };

  return useMock ? mockFunctions[functionName] : realFunctions[functionName];
};

// Export functions that automatically switch between mock and real APIs
export const authApi = {
  login: (...args) => getAuthApiFunction("login")(...args),
  register: (...args) => getAuthApiFunction("register")(...args),
  logout: (...args) => getAuthApiFunction("logout")(...args),
  refreshToken: (...args) => getAuthApiFunction("refreshToken")(...args),
  getProfile: (...args) => getAuthApiFunction("getProfile")(...args),
};
