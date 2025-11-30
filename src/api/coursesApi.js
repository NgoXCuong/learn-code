// src/api/coursesApi.js
import { mockCourses, mockLanguages } from "@/mock/courses";
import { mockLessons } from "@/mock/lessons";
import { mockExercises } from "@/mock/exercises";

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
