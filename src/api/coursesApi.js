// src/api/coursesApi.js
import { mockCourses, mockLanguages } from "@/mock/courses";
import { mockLessons } from "@/mock/lessons";
import { mockExercises } from "@/mock/exercises";
import httpClient from "./httpClient";
import { API_ENDPOINTS, API_CONFIG } from "./api";

// Mock API delay để simulate real API
const MOCK_DELAY = 500;

// ==================== Courses ====================
export const fetchCourses = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(mockCourses);
      } catch (error) {
        reject(new Error("Failed to fetch courses"));
      }
    }, MOCK_DELAY);
  });
};

// Lấy khóa học theo lang_id
export const fetchCoursesByLang = async (langId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const filteredCourses = mockCourses.filter(
          (course) => course.lang_id === langId
        );
        resolve(filteredCourses);
      } catch (error) {
        reject(new Error("Failed to fetch courses by language"));
      }
    }, MOCK_DELAY);
  });
};

export const fetchCourseById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const course = mockCourses.find((course) => course.id === id);
        if (!course) throw new Error("Course not found");
        resolve(course);
      } catch (error) {
        reject(new Error("Failed to fetch course"));
      }
    }, MOCK_DELAY);
  });
};

// ==================== Lessons ====================
export const fetchLessonsByCourse = async (courseId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const lessons = mockLessons.filter(
          (lesson) => lesson.course_id === courseId
        );
        resolve(lessons);
      } catch (error) {
        reject(new Error("Failed to fetch lessons"));
      }
    }, MOCK_DELAY);
  });
};

export const fetchLessonById = async (lessonId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const lesson = mockLessons.find((lesson) => lesson.id === lessonId);
        if (!lesson) throw new Error("Lesson not found");
        resolve(lesson);
      } catch (error) {
        reject(new Error("Failed to fetch lesson"));
      }
    }, MOCK_DELAY);
  });
};

export const fetchLessonProgress = async (userId, lessonId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock progress data - in real API this would come from database
      const mockProgress = {
        user_id: userId,
        lesson_id: lessonId,
        completed: Math.random() > 0.5, // Random for demo
        progress_percentage: Math.floor(Math.random() * 100),
      };
      resolve(mockProgress);
    }, MOCK_DELAY);
  });
};

// ==================== Exercises ====================
export const fetchExercisesByLesson = async (lessonId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const exercises = mockExercises.filter(
          (exercise) => exercise.lesson_id === lessonId
        );
        resolve(exercises);
      } catch (error) {
        reject([]);
      }
    }, MOCK_DELAY);
  });
};

// ==================== Languages ====================
export const fetchLanguage = async (langId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const language = mockLanguages.find((lang) => lang.id === langId);
        resolve(language || null);
      } catch (error) {
        reject(null);
      }
    }, MOCK_DELAY);
  });
};

// Lấy tất cả languages
export const fetchLanguages = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(mockLanguages);
      } catch (error) {
        reject(new Error("Failed to fetch languages"));
      }
    }, MOCK_DELAY);
  });
};

// ==================== Run & Submit Code ====================
export const runCode = async ({ language, code }) => {
  console.log("Run code:", { language, code });

  // Fake run code: trả về output dạng string
  return new Promise((resolve) => {
    setTimeout(() => {
      let output;
      if (code.includes("Hello")) {
        output = "Output:\nHello World!";
      } else {
        output = `Output giả lập:\n${code}`;
      }
      resolve({ output });
    }, 1000);
  });
};

export const submitExercise = async ({ exerciseId, code }) => {
  const passed = code.includes("Hello");

  // Mock feedback - in real API this would come from database
  const mockFeedbacks = [
    { content: "Code chạy tốt!" },
    { content: "Cần tối ưu hóa performance" },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        passed,
        message: passed ? "Bài tập passed!" : "Bài tập failed!",
        comments: passed
          ? mockFeedbacks
          : [{ content: "Code chưa đúng yêu cầu" }],
        warning: false,
      });
    }, 1500);
  });
};

// ==================== REAL API FUNCTIONS ====================

/**
 * Fetch all courses from real API
 * @returns {Promise<Array>} Array of courses
 */
export const fetchCoursesReal = async () => {
  try {
    const response = await httpClient.get(API_ENDPOINTS.COURSES);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch courses");
  }
};

/**
 * Fetch courses by language from real API
 * @param {number} langId - Language ID
 * @returns {Promise<Array>} Array of courses filtered by language
 */
export const fetchCoursesByLangReal = async (langId) => {
  try {
    const response = await httpClient.get(
      API_ENDPOINTS.COURSES_BY_LANGUAGE(langId)
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch courses by language"
    );
  }
};

/**
 * Fetch course by ID from real API
 * @param {number} id - Course ID
 * @returns {Promise<Object>} Course object
 */
export const fetchCourseByIdReal = async (id) => {
  try {
    const response = await httpClient.get(API_ENDPOINTS.COURSE_BY_ID(id));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch course");
  }
};

/**
 * Fetch lessons by course from real API
 * @param {number} courseId - Course ID
 * @returns {Promise<Array>} Array of lessons
 */
export const fetchLessonsByCourseReal = async (courseId) => {
  try {
    const response = await httpClient.get(
      API_ENDPOINTS.LESSONS_BY_COURSE(courseId)
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch lessons");
  }
};

/**
 * Fetch lesson by ID from real API
 * @param {number} lessonId - Lesson ID
 * @returns {Promise<Object>} Lesson object
 */
export const fetchLessonByIdReal = async (lessonId) => {
  try {
    const response = await httpClient.get(API_ENDPOINTS.LESSON_BY_ID(lessonId));
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch lesson");
  }
};

/**
 * Fetch exercises by lesson from real API
 * @param {number} lessonId - Lesson ID
 * @returns {Promise<Array>} Array of exercises
 */
export const fetchExercisesByLessonReal = async (lessonId) => {
  try {
    const response = await httpClient.get(
      API_ENDPOINTS.EXERCISES_BY_LESSON(lessonId)
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch exercises"
    );
  }
};

/**
 * Fetch all languages from real API
 * @returns {Promise<Array>} Array of languages
 */
export const fetchLanguagesReal = async () => {
  try {
    const response = await httpClient.get(API_ENDPOINTS.LANGUAGES);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch languages"
    );
  }
};

/**
 * Run code using real API
 * @param {Object} params - Code execution parameters
 * @param {string} params.language - Programming language
 * @param {string} params.code - Code to execute
 * @returns {Promise<Object>} Execution result
 */
export const runCodeReal = async ({ language, code }) => {
  try {
    const response = await httpClient.post(API_ENDPOINTS.RUN_CODE, {
      language,
      code,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to run code");
  }
};

/**
 * Submit exercise using real API
 * @param {Object} params - Submission parameters
 * @param {number} params.exerciseId - Exercise ID
 * @param {string} params.code - Submitted code
 * @returns {Promise<Object>} Submission result
 */
export const submitExerciseReal = async ({ exerciseId, code }) => {
  try {
    const response = await httpClient.post(API_ENDPOINTS.SUBMIT_CODE, {
      exerciseId,
      code,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to submit exercise"
    );
  }
};

// ==================== API SWITCHER ====================

/**
 * Get the appropriate API function based on configuration
 * @param {string} functionName - Name of the API function
 * @returns {Function} The appropriate API function (mock or real)
 */
const getApiFunction = (functionName) => {
  const useMock = API_CONFIG.useMockAPI;

  const mockFunctions = {
    fetchCourses,
    fetchCoursesByLang,
    fetchCourseById,
    fetchLessonsByCourse,
    fetchLessonById,
    fetchExercisesByLesson,
    fetchLanguages,
    runCode,
    submitExercise,
  };

  const realFunctions = {
    fetchCourses: fetchCoursesReal,
    fetchCoursesByLang: fetchCoursesByLangReal,
    fetchCourseById: fetchCourseByIdReal,
    fetchLessonsByCourse: fetchLessonsByCourseReal,
    fetchLessonById: fetchLessonByIdReal,
    fetchExercisesByLesson: fetchExercisesByLessonReal,
    fetchLanguages: fetchLanguagesReal,
    runCode: runCodeReal,
    submitExercise: submitExerciseReal,
  };

  return useMock ? mockFunctions[functionName] : realFunctions[functionName];
};

// Export functions that automatically switch between mock and real APIs
export const api = {
  fetchCourses: (...args) => getApiFunction("fetchCourses")(...args),
  fetchCoursesByLang: (...args) =>
    getApiFunction("fetchCoursesByLang")(...args),
  fetchCourseById: (...args) => getApiFunction("fetchCourseById")(...args),
  fetchLessonsByCourse: (...args) =>
    getApiFunction("fetchLessonsByCourse")(...args),
  fetchLessonById: (...args) => getApiFunction("fetchLessonById")(...args),
  fetchExercisesByLesson: (...args) =>
    getApiFunction("fetchExercisesByLesson")(...args),
  fetchLanguages: (...args) => getApiFunction("fetchLanguages")(...args),
  runCode: (...args) => getApiFunction("runCode")(...args),
  submitExercise: (...args) => getApiFunction("submitExercise")(...args),
};
