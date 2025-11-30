import { mockCourses, mockLanguages } from "@/mock/courses";
import { mockLessons } from "@/mock/lessons";
import { mockExercises } from "@/mock/exercises";

// Mock API delay để simulate real API
const MOCK_DELAY = 500;

// Mock database cho auth
let mockUsers = [
  {
    id: 1,
    username: "Nguyen Van A",
    email: "a@gmail.com",
    password_hash: "123456",
  },
  {
    id: 2,
    username: "Tran Thi B",
    email: "b@gmail.com",
    password_hash: "abcdef",
  },
];

// Utility function để simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API Service Class
class MockApiService {
  // ==================== Auth ====================
  async login(credentials) {
    await delay(MOCK_DELAY);
    const user = mockUsers.find(
      (u) =>
        u.email === credentials.email &&
        u.password_hash === credentials.password
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
  }

  async register(userData) {
    await delay(MOCK_DELAY);
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
  }

  async logout() {
    await delay(MOCK_DELAY);
    return { message: "Logged out successfully" };
  }

  async getProfile(userId) {
    await delay(MOCK_DELAY);
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
  }

  // ==================== Courses ====================
  async getCourses() {
    await delay(MOCK_DELAY);
    return mockCourses;
  }

  async getCoursesByLanguage(langId) {
    await delay(MOCK_DELAY);
    const filteredCourses = mockCourses.filter(
      (course) => course.lang_id === langId
    );
    return filteredCourses;
  }

  async getCourseById(id) {
    await delay(MOCK_DELAY);
    const course = mockCourses.find((course) => course.id === id);
    if (!course) throw new Error("Course not found");
    return course;
  }

  // ==================== Lessons ====================
  async getLessonsByCourse(courseId) {
    await delay(MOCK_DELAY);
    const lessons = mockLessons.filter(
      (lesson) => lesson.course_id === courseId
    );
    return lessons;
  }

  async getLessonById(id) {
    await delay(MOCK_DELAY);
    const lesson = mockLessons.find((lesson) => lesson.id === id);
    if (!lesson) throw new Error("Lesson not found");
    return lesson;
  }

  // ==================== Exercises ====================
  async getExercisesByLesson(lessonId) {
    await delay(MOCK_DELAY);
    const exercises = mockExercises.filter(
      (exercise) => exercise.lesson_id === lessonId
    );
    return exercises;
  }

  async getExerciseById(id) {
    await delay(MOCK_DELAY);
    const exercise = mockExercises.find((exercise) => exercise.id === id);
    if (!exercise) throw new Error("Exercise not found");
    return exercise;
  }

  // ==================== Languages ====================
  async getLanguages() {
    await delay(MOCK_DELAY);
    return mockLanguages;
  }

  async getLanguageById(langId) {
    await delay(MOCK_DELAY);
    const language = mockLanguages.find((lang) => lang.id === langId);
    return language || null;
  }

  // ==================== Progress ====================
  async getUserProgress(userId) {
    await delay(MOCK_DELAY);
    // Mock progress data - in real API this would come from database
    return {
      user_id: userId,
      courses_completed: 2,
      lessons_completed: 15,
      exercises_completed: 45,
      total_xp: 1250,
      streak_days: 7,
    };
  }

  async updateLessonProgress(userId, lessonId, progressData) {
    await delay(MOCK_DELAY);
    return {
      user_id: userId,
      lesson_id: lessonId,
      completed: progressData.completed,
      progress_percentage: progressData.progress_percentage,
      updated_at: new Date().toISOString(),
    };
  }

  async updateExerciseProgress(userId, exerciseId, progressData) {
    await delay(MOCK_DELAY);
    return {
      user_id: userId,
      exercise_id: exerciseId,
      completed: progressData.completed,
      score: progressData.score || 0,
      updated_at: new Date().toISOString(),
    };
  }

  // ==================== Compiler ====================
  async runCode({ language, code }) {
    await delay(1000); // Simulate compilation time
    let output;
    if (code.includes("Hello")) {
      output = "Output:\nHello World!";
    } else {
      output = `Output giả lập:\n${code}`;
    }
    return { output };
  }

  async submitCode({ exerciseId, code }) {
    await delay(1500); // Simulate testing time
    const passed = code.includes("Hello");

    const mockFeedbacks = [
      { content: "Code chạy tốt!" },
      { content: "Cần tối ưu hóa performance" },
    ];

    return {
      success: true,
      passed,
      message: passed ? "Bài tập passed!" : "Bài tập failed!",
      comments: passed
        ? mockFeedbacks
        : [{ content: "Code chưa đúng yêu cầu" }],
      warning: false,
    };
  }
}

// Create singleton instance
export const mockApiService = new MockApiService();
