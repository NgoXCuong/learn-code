import {
  userData,
  challenges,
  leaderboard,
  dailyQuests,
} from "@/mock/mockDataChallenge";

// Mock API delay để simulate real API
const MOCK_DELAY = 500;

// ==================== CHALLENGES API ====================

/**
 * Fetch challenges with optional filters
 * @param {Object} filters - Filter options
 * @param {string} filters.difficulty - Difficulty filter
 * @param {Array} filters.tags - Tags filter
 * @param {string} filters.sortBy - Sort criteria
 * @returns {Promise<Array>} Array of challenges
 */
export const fetchChallenges = async (filters = {}) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  let filteredChallenges = [...challenges];

  // Apply filters
  if (filters.difficulty && filters.difficulty !== "all") {
    filteredChallenges = filteredChallenges.filter(
      (challenge) => challenge.difficulty === filters.difficulty
    );
  }

  if (filters.tags && filters.tags.length > 0) {
    filteredChallenges = filteredChallenges.filter((challenge) =>
      filters.tags.some((tag) => challenge.tags.includes(tag))
    );
  }

  // Apply sorting
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case "difficulty":
        const difficultyOrder = { Dễ: 1, "Trung bình": 2, Khó: 3 };
        filteredChallenges.sort(
          (a, b) =>
            difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        );
        break;
      case "participants":
        filteredChallenges.sort((a, b) => b.participants - a.participants);
        break;
      case "points":
        filteredChallenges.sort((a, b) => b.points - a.points);
        break;
      default:
        break;
    }
  }

  return filteredChallenges;
};

export const fetchChallengeById = async (challengeId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const challenge = challenges.find((c) => c.id === challengeId);
  if (!challenge) {
    throw new Error("Challenge not found");
  }
  return challenge;
};

export const submitChallenge = async (challengeId, code, language) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  // Mock submission result
  const passed = Math.random() > 0.3; // 70% pass rate
  const timeSpent = Math.floor(Math.random() * 30) + 5; // 5-35 minutes

  const result = {
    challengeId,
    passed,
    timeSpent,
    points: passed
      ? challenges.find((c) => c.id === challengeId)?.points || 0
      : 0,
    message: passed
      ? "Challenge completed successfully!"
      : "Challenge failed. Try again!",
    testCases: passed ? "All test cases passed" : "Some test cases failed",
    submittedAt: new Date().toISOString(),
  };

  return result;
};

// ==================== User Challenge Data ====================
export const fetchUserChallengeData = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  // In a real app, this would fetch user-specific data
  return userData;
};

export const updateUserChallengeProgress = async (
  userId,
  challengeId,
  progress
) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  // Mock progress update
  const updatedProgress = {
    userId,
    challengeId,
    ...progress,
    updatedAt: new Date().toISOString(),
  };
  return updatedProgress;
};

// ==================== Leaderboard ====================
export const fetchChallengeLeaderboard = async (challengeId = null) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  // If challengeId is provided, return challenge-specific leaderboard
  // For now, return general leaderboard
  return leaderboard;
};

// ==================== DAILY QUESTS API ====================

/**
 * Fetch daily quests for user
 * @param {number} userId - User ID
 * @returns {Promise<Array>} Array of daily quests
 */
export const fetchDailyQuests = async (userId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  return dailyQuests;
};

export const updateQuestProgress = async (userId, questId, newProgress) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const quest = dailyQuests.find((q) => q.id === questId);
  if (!quest) {
    throw new Error("Quest not found");
  }

  const updatedQuest = {
    ...quest,
    progress: Math.min(newProgress, quest.target),
    completed: newProgress >= quest.target,
    updatedAt: new Date().toISOString(),
  };

  return updatedQuest;
};

export const claimQuestReward = async (userId, questId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const quest = dailyQuests.find((q) => q.id === questId);
  if (!quest) {
    throw new Error("Quest not found");
  }

  if (!quest.completed) {
    throw new Error("Quest not completed yet");
  }

  const reward = {
    questId,
    points: quest.reward,
    claimedAt: new Date().toISOString(),
  };

  return reward;
};

// ==================== Challenge Comments ====================
export const fetchChallengeComments = async (
  challengeId,
  page = 1,
  limit = 10
) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  // Mock comments data
  const mockComments = [
    {
      id: 1,
      userId: 1,
      username: "CodeMaster",
      avatar: "👨‍💻",
      content: "Thử thách này khá hay! Hint về HashMap rất hữu ích.",
      createdAt: "2024-01-15T10:30:00Z",
      likes: 5,
    },
    {
      id: 2,
      userId: 2,
      username: "AlgoQueen",
      avatar: "👩‍💻",
      content: "Mình đã giải được bằng cách khác, dùng two pointers.",
      createdAt: "2024-01-15T11:15:00Z",
      likes: 3,
    },
  ];

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedComments = mockComments.slice(startIndex, endIndex);

  return {
    comments: paginatedComments,
    total: mockComments.length,
    page,
    limit,
    totalPages: Math.ceil(mockComments.length / limit),
  };
};

export const addChallengeComment = async (challengeId, userId, content) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const newComment = {
    id: Date.now(), // Mock ID
    userId,
    username: "CurrentUser", // Would be fetched from user data
    avatar: "😊",
    content,
    createdAt: new Date().toISOString(),
    likes: 0,
  };

  return newComment;
};

// ==================== Challenge Statistics ====================
export const fetchChallengeStats = async (challengeId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const challenge = challenges.find((c) => c.id === challengeId);
  if (!challenge) {
    throw new Error("Challenge not found");
  }

  const stats = {
    challengeId,
    totalAttempts: challenge.participants,
    successRate: challenge.successRate,
    averageTime: challenge.avgTime,
    totalComments: challenge.comments,
    difficulty: challenge.difficulty,
    points: challenge.points,
    tags: challenge.tags,
  };

  return stats;
};
