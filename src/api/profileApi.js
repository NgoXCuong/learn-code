import {
  user,
  courses,
  badges,
  stats,
  recentActivity,
  achievements,
} from "@/mock/profile";

// Mock API delay để simulate real API
const MOCK_DELAY = 500;

// ==================== PROFILE API ====================

/**
 * Fetch user profile by ID
 * @param {number} userId - User ID
 * @returns {Promise<Object>} User profile object
 */
export const fetchUserProfile = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  return user;
};

/**
 * Update user profile
 * @param {number} userId - User ID
 * @param {Object} profileData - Profile data to update
 * @returns {Promise<Object>} Updated user profile
 */
export const updateUserProfile = async (userId, profileData) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  return { ...user, ...profileData };
};

// ==================== USER COURSES API ====================

/**
 * Fetch user's enrolled courses
 * @param {number} userId - User ID
 * @returns {Promise<Array>} Array of user's courses
 */
export const fetchUserCourses = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  return courses;
};

/**
 * Fetch user's progress in a specific course
 * @param {number} userId - User ID
 * @param {number} courseId - Course ID
 * @returns {Promise<Object>} Course progress object
 */
export const fetchUserCourseProgress = async (userId, courseId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const course = courses.find((c) => c.id === courseId);
  if (!course) throw new Error("Course not found");
  return course;
};

// ==================== BADGES API ====================

/**
 * Fetch user's badges
 * @param {number} userId - User ID
 * @returns {Promise<Array>} Array of user's badges
 */
export const fetchUserBadges = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  return badges;
};

/**
 * Unlock a badge for user
 * @param {number} userId - User ID
 * @param {number} badgeId - Badge ID
 * @returns {Promise<Object>} Unlocked badge object
 */
export const unlockBadge = async (userId, badgeId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const badge = badges.find((b) => b.id === badgeId);
  if (!badge) throw new Error("Badge not found");
  return {
    ...badge,
    date: new Date().toISOString().split("T")[0],
  };
};

// ==================== STATS API ====================

/**
 * Fetch user's statistics
 * @param {number} userId - User ID
 * @returns {Promise<Object>} User stats object
 */
export const fetchUserStats = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  return stats;
};

/**
 * Update user statistics
 * @param {number} userId - User ID
 * @param {Object} newStats - New stats data
 * @returns {Promise<Object>} Updated stats object
 */
export const updateUserStats = async (userId, newStats) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  return { ...stats, ...newStats };
};

// ==================== ACTIVITY API ====================

/**
 * Fetch user's recent activity
 * @param {number} userId - User ID
 * @param {number} limit - Number of activities to fetch
 * @returns {Promise<Array>} Array of recent activities
 */
export const fetchRecentActivity = async (userId, limit = 10) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  return recentActivity.slice(0, limit);
};

// ==================== ACHIEVEMENTS API ====================

/**
 * Fetch user's achievements
 * @param {number} userId - User ID
 * @returns {Promise<Array>} Array of user's achievements
 */
export const fetchUserAchievements = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  return achievements;
};

// ==================== GAMIFICATION API ====================

/**
 * Update user's XP and level
 * @param {number} userId - User ID
 * @param {number} xpGained - XP to add
 * @returns {Promise<Object>} Updated user with new XP/level
 */
export const updateUserXP = async (userId, xpGained) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const newXp = user.xp + xpGained;
  const newLevel = Math.floor(newXp / 500) + 1;
  const nextLevelXp = newLevel * 500;
  return {
    ...user,
    xp: newXp,
    level: newLevel,
    nextLevelXp: nextLevelXp,
  };
};

/**
 * Update user's streak
 * @param {number} userId - User ID
 * @param {number} newStreak - New streak value
 * @returns {Promise<Object>} Updated user with new streak
 */
export const updateUserStreak = async (userId, newStreak) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  return {
    ...user,
    streak: newStreak,
  };
};
