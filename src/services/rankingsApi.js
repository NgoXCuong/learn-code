import { COURSES, MOCK_USERS, CURRENT_USER_ID } from "@/mock/usersRank";

// Mock API delay để simulate real API
const MOCK_DELAY = 500;

// ==================== LEADERBOARD API ====================

/**
 * Fetch leaderboard with optional filters
 * @param {Object} filters - Filter options
 * @param {string} filters.course - Course filter
 * @returns {Promise<Array>} Array of ranked users
 */
export const fetchLeaderboard = async (filters = {}) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  let filteredUsers = [...MOCK_USERS];

  if (filters.course && filters.course !== "all") {
    filteredUsers = filteredUsers.filter(
      (user) => user.course === filters.course
    );
  }

  filteredUsers.sort((a, b) => b.xp - a.xp);
  return filteredUsers.map((user, index) => ({
    ...user,
    rank: index + 1,
  }));
};

/**
 * Fetch top rankings
 * @param {number} limit - Number of top users to fetch
 * @returns {Promise<Array>} Array of top ranked users
 */
export const fetchTopRankings = async (limit = 10) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const sortedUsers = [...MOCK_USERS].sort((a, b) => b.xp - a.xp);
  return sortedUsers.slice(0, limit).map((user, index) => ({
    ...user,
    rank: index + 1,
  }));
};

/**
 * Fetch user ranking
 * @param {number} userId - User ID
 * @returns {Promise<Object>} User ranking object
 */
export const fetchUserRanking = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const allUsers = [...MOCK_USERS].sort((a, b) => b.xp - a.xp);
  const userIndex = allUsers.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    throw new Error("User not found in rankings");
  }

  const user = allUsers[userIndex];
  return {
    ...user,
    rank: userIndex + 1,
    totalUsers: allUsers.length,
  };
};

export const fetchCurrentUserRanking = async () => {
  return fetchUserRanking(CURRENT_USER_ID);
};

// ==================== Courses for Filtering ====================
export const fetchAvailableCourses = async () => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  return COURSES;
};

// ==================== Statistics ====================
export const fetchRankingStats = async () => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const allUsers = [...MOCK_USERS];
  const totalUsers = allUsers.length;
  const averageXP = Math.round(
    allUsers.reduce((sum, user) => sum + user.xp, 0) / totalUsers
  );
  const topXP = Math.max(...allUsers.map((user) => user.xp));

  const stats = {
    totalUsers,
    averageXP,
    topXP,
    coursesCount: COURSES.length,
  };

  return stats;
};

// ==================== User Comparison ====================
export const fetchUserComparison = async (userId, compareWithIds = []) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const allUsers = [...MOCK_USERS].sort((a, b) => b.xp - a.xp);
  const currentUser = allUsers.find((user) => user.id === userId);

  if (!currentUser) {
    throw new Error("Current user not found");
  }

  const currentUserRank = allUsers.findIndex((user) => user.id === userId) + 1;

  // Get users to compare with
  const compareUsers = compareWithIds
    .map((id) => allUsers.find((user) => user.id === id))
    .filter((user) => user !== undefined)
    .map((user) => ({
      ...user,
      rank: allUsers.findIndex((u) => u.id === user.id) + 1,
    }));

  const comparison = {
    currentUser: {
      ...currentUser,
      rank: currentUserRank,
    },
    compareUsers,
    percentile: (
      ((allUsers.length - currentUserRank + 1) / allUsers.length) *
      100
    ).toFixed(1),
  };

  return comparison;
};

// ==================== Leaderboard Updates ====================
export const updateUserScore = async (userId, newXP, newCompleted) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  // In a real app, this would update the database
  // For mock, we'll just return success
  const updatedUser = {
    id: userId,
    xp: newXP,
    completed: newCompleted,
    updatedAt: new Date().toISOString(),
  };

  return updatedUser;
};

// ==================== Course-specific Rankings ====================
export const fetchCourseRankings = async (courseId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const courseUsers = MOCK_USERS.filter((user) => user.course === courseId);
  const sortedUsers = courseUsers.sort((a, b) => b.xp - a.xp);

  const rankedUsers = sortedUsers.map((user, index) => ({
    ...user,
    rank: index + 1,
    courseRank: index + 1,
    totalInCourse: sortedUsers.length,
  }));

  return rankedUsers;
};
