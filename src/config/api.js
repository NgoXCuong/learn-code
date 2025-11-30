// API Configuration
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api",
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  useMockAPI: import.meta.env.VITE_USE_MOCK_API === "true",
};

// JWT Configuration
export const JWT_CONFIG = {
  secretKey: import.meta.env.VITE_JWT_SECRET_KEY,
  tokenKey: "access_token",
  refreshTokenKey: "refresh_token",
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/refresh",
  PROFILE: "/auth/profile",

  // Courses
  COURSES: "/courses",
  COURSE_BY_ID: (id) => `/courses/${id}`,
  COURSES_BY_LANGUAGE: (langId) => `/courses/language/${langId}`,

  // Lessons
  LESSONS_BY_COURSE: (courseId) => `/courses/${courseId}/lessons`,
  LESSON_BY_ID: (id) => `/lessons/${id}`,

  // Exercises
  EXERCISES_BY_LESSON: (lessonId) => `/lessons/${lessonId}/exercises`,
  EXERCISE_BY_ID: (id) => `/exercises/${id}`,

  // Progress
  USER_PROGRESS: "/progress",
  LESSON_PROGRESS: (lessonId) => `/progress/lessons/${lessonId}`,
  EXERCISE_PROGRESS: (exerciseId) => `/progress/exercises/${exerciseId}`,

  // Languages
  LANGUAGES: "/languages",

  // Compiler
  RUN_CODE: "/compiler/run",
  SUBMIT_CODE: "/compiler/submit",
};
