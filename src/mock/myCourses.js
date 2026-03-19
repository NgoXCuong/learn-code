import { mockCourses } from "./courses";

// Simulate user progress mapped directly to Global Courses (ID: 1 = JS, 2 = Python, 3 = Java, 5 = C++)

// Progress mapped by User ID
const ALL_USERS_PROGRESS = {
  1: {
    1: { progress_percentage: 45, completed_lessons: 9 }, // JavaScript
    2: { progress_percentage: 60, completed_lessons: 12 }, // Python
    3: { progress_percentage: 100, completed_lessons: 25 }, // Java
    5: { progress_percentage: 10, completed_lessons: 2 }, // C++
  },
  2: {} // New user has no progress
};

export const getMockMyCourses = (userId) => {
  const userProgress = ALL_USERS_PROGRESS[userId] || {};
  
  return mockCourses
    .filter(course => userProgress[course.id] !== undefined)
    .map(course => {
      const progressData = userProgress[course.id];
      return {
        path_id: course.id,
        path_name: course.title,
        description: course.description,
        imageUrl: course.image,
        difficulty_level: course.level === "Cơ bản" ? "beginner" : course.level === "Trung bình" ? "intermediate" : "advanced",
        progress_percentage: progressData.progress_percentage,
        completed_lessons: progressData.completed_lessons,
        total_lessons_in_path: course.lessons,
        estimated_hours: parseInt(course.duration) || 10,
        total_sections: 5,
        average_rating: course.rating
      };
    });
};

// Keep for backward compatibility if needed elsewhere, but default to user 1
export const mockMyCourses = getMockMyCourses(1);
