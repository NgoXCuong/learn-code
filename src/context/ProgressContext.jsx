import React, { createContext, useState, useEffect, useContext } from "react";

export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [courseProgress, setCourseProgress] = useState({});
  const [lessonProgress, setLessonProgress] = useState({});
  const [exerciseProgress, setExerciseProgress] = useState({});

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedCourseProgress = JSON.parse(
      localStorage.getItem("courseProgress") || "{}"
    );
    const savedLessonProgress = JSON.parse(
      localStorage.getItem("lessonProgress") || "{}"
    );
    const savedExerciseProgress = JSON.parse(
      localStorage.getItem("exerciseProgress") || "{}"
    );

    setCourseProgress(savedCourseProgress);
    setLessonProgress(savedLessonProgress);
    setExerciseProgress(savedExerciseProgress);
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("courseProgress", JSON.stringify(courseProgress));
  }, [courseProgress]);

  useEffect(() => {
    localStorage.setItem("lessonProgress", JSON.stringify(lessonProgress));
  }, [lessonProgress]);

  useEffect(() => {
    localStorage.setItem("exerciseProgress", JSON.stringify(exerciseProgress));
  }, [exerciseProgress]);

  // Course progress methods
  const updateCourseProgress = (courseId, progress) => {
    setCourseProgress((prev) => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        progress: Math.min(100, Math.max(0, progress)),
        lastUpdated: new Date().toISOString(),
      },
    }));
  };

  const getCourseProgress = (courseId) => {
    return courseProgress[courseId]?.progress || 0;
  };

  // Lesson progress methods
  const markLessonAsRead = (lessonId) => {
    setLessonProgress((prev) => ({
      ...prev,
      [lessonId]: {
        ...prev[lessonId],
        isRead: true,
        readAt: new Date().toISOString(),
      },
    }));

    // Update course progress when lesson is read
    updateCourseProgressFromLessons();
  };

  const markLessonAsUnread = (lessonId) => {
    setLessonProgress((prev) => ({
      ...prev,
      [lessonId]: {
        ...prev[lessonId],
        isRead: false,
        readAt: null,
      },
    }));

    updateCourseProgressFromLessons();
  };

  const isLessonRead = (lessonId) => {
    return lessonProgress[lessonId]?.isRead || false;
  };

  // Exercise progress methods
  const markExerciseAsCompleted = (exerciseId, lessonId, courseId) => {
    setExerciseProgress((prev) => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        isCompleted: true,
        completedAt: new Date().toISOString(),
      },
    }));

    // Update lesson and course progress when exercise is completed
    updateLessonProgressFromExercises(lessonId);
    updateCourseProgressFromLessons();
  };

  const markExerciseAsIncomplete = (exerciseId, lessonId, courseId) => {
    setExerciseProgress((prev) => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        isCompleted: false,
        completedAt: null,
      },
    }));

    updateLessonProgressFromExercises(lessonId);
    updateCourseProgressFromLessons();
  };

  const isExerciseCompleted = (exerciseId) => {
    return exerciseProgress[exerciseId]?.isCompleted || false;
  };

  // Helper function to update course progress based on lesson completion
  const updateCourseProgressFromLessons = () => {
    // Import mock data to calculate course progress
    const mockLessons = require("../mock/lessons").mockLessons;
    const mockCourses = require("../mock/courses").mockCourses;

    // Calculate progress for each course based on completed lessons
    mockCourses.forEach((course) => {
      const courseLessons = mockLessons.filter(
        (lesson) => lesson.course_id === course.id
      );
      const totalLessons = courseLessons.length;
      const completedLessons = courseLessons.filter((lesson) =>
        isLessonRead(lesson.id)
      ).length;

      if (totalLessons > 0) {
        const progress = Math.round((completedLessons / totalLessons) * 100);
        updateCourseProgress(course.id, progress);
      }
    });
  };

  // Helper function to update lesson progress based on exercise completion
  const updateLessonProgressFromExercises = (lessonId) => {
    // Import mock data to calculate lesson progress
    const mockExercises = require("../mock/exercises").mockExercises;

    // Calculate progress for the lesson based on completed exercises
    const lessonExercises = mockExercises.filter(
      (ex) => ex.lesson_id === lessonId
    );
    const totalExercises = lessonExercises.length;
    const completedExercises = lessonExercises.filter((ex) =>
      isExerciseCompleted(ex.id)
    ).length;

    if (totalExercises > 0) {
      const progress = Math.round((completedExercises / totalExercises) * 100);
      // For now, we'll mark lesson as read if all exercises are completed
      if (progress === 100) {
        markLessonAsRead(lessonId);
      }
    }
  };

  // Get progress statistics
  const getProgressStats = () => {
    const totalExercises = Object.keys(exerciseProgress).length;
    const completedExercises = Object.values(exerciseProgress).filter(
      (p) => p.isCompleted
    ).length;
    const totalLessons = Object.keys(lessonProgress).length;
    const readLessons = Object.values(lessonProgress).filter(
      (p) => p.isRead
    ).length;

    return {
      exercises: {
        total: totalExercises,
        completed: completedExercises,
        percentage:
          totalExercises > 0
            ? Math.round((completedExercises / totalExercises) * 100)
            : 0,
      },
      lessons: {
        total: totalLessons,
        read: readLessons,
        percentage:
          totalLessons > 0 ? Math.round((readLessons / totalLessons) * 100) : 0,
      },
    };
  };

  const value = {
    // Course progress
    courseProgress,
    updateCourseProgress,
    getCourseProgress,

    // Lesson progress
    lessonProgress,
    markLessonAsRead,
    markLessonAsUnread,
    isLessonRead,

    // Exercise progress
    exerciseProgress,
    markExerciseAsCompleted,
    markExerciseAsIncomplete,
    isExerciseCompleted,

    // Stats
    getProgressStats,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};
