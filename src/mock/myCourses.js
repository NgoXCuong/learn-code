import { mockCourses } from "./courses";

// Simulate user progress mapped directly to Global Courses (ID: 1 = JS, 2 = Python, 3 = Java, 5 = C++)

// Progress mapped by User ID
const ALL_USERS_PROGRESS = {
  1: {
    2: { progress_percentage: 60 }, // Python
    3: { progress_percentage: 100 }, // Java
    5: { progress_percentage: 0 }, // C++
  },
  2: {} // New user has no progress
};

export const getMockMyCourses = (userId) => {
  const userProgress = ALL_USERS_PROGRESS[userId] || {};
  
  return mockCourses
    .filter(course => userProgress[course.path_id] !== undefined)
    .map(course => {
      const progressData = userProgress[course.path_id];
      const progress = progressData.progress_percentage;
      
      // Tính toán số bài học đã hoàn thành dựa trên tổng số bài và % tiến độ
      const completed = Math.floor((course.total_lessons_in_path * progress) / 100);
      
      return {
        ...course,
        progress_percentage: progress,
        completed_lessons: completed,
      };
    });
};

// Keep for backward compatibility if needed elsewhere, but default to user 1
export const mockMyCourses = getMockMyCourses(1);
