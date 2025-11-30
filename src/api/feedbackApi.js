import { getRandomFeedback } from "@/mock/mockFeedback";
import httpClient from "./httpClient";
import { API_ENDPOINTS, API_CONFIG } from "./api";

// Mock API delay để simulate real API
const MOCK_DELAY = 500;

// Mock feedback data - Updated to match current feedback interface
const mockFeedbackData = getRandomFeedback();

// Mock feedback stats function
const getFeedbackStats = (courseId) => {
  return {
    courseId,
    averageRating: 4.5,
    totalReviews: 25,
    recentReviews: [
      {
        id: 1,
        userName: "Nguyen Van A",
        rating: 5,
        comment: "Khóa học rất hay!",
        submittedAt: new Date().toISOString(),
        helpful: 10,
      },
      {
        id: 2,
        userName: "Tran Thi B",
        rating: 4,
        comment: "Nội dung tốt nhưng cần thêm ví dụ",
        submittedAt: new Date().toISOString(),
        helpful: 5,
      },
    ],
  };
};

// Mock user feedback
const userFeedback = [
  {
    id: 1,
    type: "exercise",
    title: "Bài tập về biến",
    rating: 5,
    comment: "Bài tập dễ hiểu",
    submittedAt: new Date().toISOString(),
  },
];

// Enhanced feedback stats with more courses

// ==================== Exercise Feedback ====================
export const fetchExerciseFeedback = async (exerciseId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

  // Import mock data dynamically to avoid circular imports
  const { mockFeedbackData } = await import("@/mock/mockFeedback");

  // Return different feedback based on exerciseId for variety
  const feedbackKeys = Object.keys(mockFeedbackData);
  const index = parseInt(exerciseId) || 0;
  const feedbackKey = feedbackKeys[index % feedbackKeys.length];
  const feedback = mockFeedbackData[feedbackKey];

  return feedback;
};

// ==================== Feedback Submission ====================
export const submitFeedback = async (feedbackData) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const newFeedback = {
    id: Date.now(), // Mock ID
    ...feedbackData,
    submittedAt: new Date().toISOString(),
    helpful: 0,
    userName: "Current User", // Would be fetched from auth
    userAvatar: "😊",
  };

  return newFeedback;
};

export const submitCourseFeedback = async (
  courseId,
  rating,
  comment,
  anonymous = false
) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const feedback = {
    id: Date.now(),
    courseId,
    rating,
    comment,
    anonymous,
    submittedAt: new Date().toISOString(),
    helpful: 0,
    status: "pending", // pending, approved, rejected
  };

  return feedback;
};

// ==================== Feedback Retrieval ====================
export const fetchCourseFeedback = async (
  courseId,
  page = 1,
  limit = 10,
  sortBy = "newest"
) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const courseStats = getFeedbackStats(courseId);
  let reviews = [...courseStats.recentReviews];

  // Sort reviews
  switch (sortBy) {
    case "newest":
      reviews.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
      break;
    case "oldest":
      reviews.sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
      break;
    case "highest":
      reviews.sort((a, b) => b.rating - a.rating);
      break;
    case "lowest":
      reviews.sort((a, b) => a.rating - b.rating);
      break;
    case "most_helpful":
      reviews.sort((a, b) => b.helpful - a.helpful);
      break;
    default:
      break;
  }

  // Paginate
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedReviews = reviews.slice(startIndex, endIndex);

  const result = {
    courseId,
    reviews: paginatedReviews,
    total: reviews.length,
    page,
    limit,
    totalPages: Math.ceil(reviews.length / limit),
    averageRating: courseStats.averageRating,
    totalReviews: courseStats.totalReviews,
  };

  return result;
};

export const fetchFeedbackStats = async (courseId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  return {
    courseId,
    ...getFeedbackStats(courseId),
  };
};

// ==================== User Feedback ====================
export const fetchUserFeedback = async (userId, page = 1, limit = 10) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  // Mock user feedback history

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedFeedback = userFeedback.slice(startIndex, endIndex);

  return {
    userId,
    feedback: paginatedFeedback,
    total: userFeedback.length,
    page,
    limit,
    totalPages: Math.ceil(userFeedback.length / limit),
  };
};

// ==================== Feedback Interaction ====================
export const markFeedbackHelpful = async (feedbackId, userId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  // Mock marking feedback as helpful
  const result = {
    feedbackId,
    userId,
    action: "marked_helpful",
    newHelpfulCount: Math.floor(Math.random() * 50) + 1,
    success: true,
  };

  return result;
};

export const reportFeedback = async (feedbackId, userId, reason) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const report = {
    feedbackId,
    userId,
    reason,
    reportedAt: new Date().toISOString(),
    status: "submitted",
  };

  return report;
};

// ==================== Instructor Response ====================
export const submitInstructorResponse = async (feedbackId, response) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const instructorResponse = {
    feedbackId,
    response,
    respondedBy: "Instructor Name", // Would be actual instructor
    respondedAt: new Date().toISOString(),
    status: "published",
  };

  return instructorResponse;
};

// ==================== Feedback Analytics ====================
export const fetchFeedbackAnalytics = async (courseId, instructorId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const analytics = {
    courseId,
    instructorId,
    totalFeedback: 45,
    averageRating: 4.7,
    responseRate: 85, // % of feedback that got instructor responses
    trendingTopics: [
      { topic: "Content Quality", mentions: 28, sentiment: "positive" },
      { topic: "Pace", mentions: 15, sentiment: "neutral" },
      { topic: "Examples", mentions: 12, sentiment: "positive" },
      { topic: "Assignments", mentions: 8, sentiment: "mixed" },
    ],
    ratingTrends: {
      last30Days: [4.5, 4.7, 4.6, 4.8, 4.7],
      last90Days: [4.3, 4.5, 4.6, 4.7, 4.8],
    },
    commonSuggestions: [
      "Thêm nhiều ví dụ thực tế hơn",
      "Tăng tốc độ giảng một chút",
      "Thêm bài tập thực hành",
      "Cải thiện chất lượng video",
    ],
  };

  return analytics;
};

// ==================== Feedback Moderation ====================
export const moderateFeedback = async (feedbackId, action, reason = "") => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const moderation = {
    feedbackId,
    action, // "approve", "reject", "hide"
    reason,
    moderatedBy: "Moderator Name",
    moderatedAt: new Date().toISOString(),
    success: true,
  };

  return moderation;
};

// ==================== REAL API FUNCTIONS ====================

/**
 * Fetch exercise feedback from real API
 * @param {string} exerciseId - Exercise ID
 * @returns {Promise<Object>} Exercise feedback data
 */
export const fetchExerciseFeedbackReal = async (exerciseId) => {
  try {
    const response = await httpClient.get(
      API_ENDPOINTS.EXERCISE_FEEDBACK(exerciseId)
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch exercise feedback"
    );
  }
};

/**
 * Submit feedback to real API
 * @param {Object} feedbackData - Feedback data
 * @returns {Promise<Object>} Submitted feedback
 */
export const submitFeedbackReal = async (feedbackData) => {
  try {
    const response = await httpClient.post(
      API_ENDPOINTS.FEEDBACK,
      feedbackData
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to submit feedback"
    );
  }
};

/**
 * Submit course feedback to real API
 * @param {string} courseId - Course ID
 * @param {number} rating - Rating (1-5)
 * @param {string} comment - Feedback comment
 * @param {boolean} anonymous - Whether feedback is anonymous
 * @returns {Promise<Object>} Submitted course feedback
 */
export const submitCourseFeedbackReal = async (
  courseId,
  rating,
  comment,
  anonymous = false
) => {
  try {
    const response = await httpClient.post(API_ENDPOINTS.COURSE_FEEDBACK, {
      courseId,
      rating,
      comment,
      anonymous,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to submit course feedback"
    );
  }
};

/**
 * Fetch course feedback from real API
 * @param {string} courseId - Course ID
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @param {string} sortBy - Sort criteria
 * @returns {Promise<Object>} Course feedback data
 */
export const fetchCourseFeedbackReal = async (
  courseId,
  page = 1,
  limit = 10,
  sortBy = "newest"
) => {
  try {
    const response = await httpClient.get(
      API_ENDPOINTS.COURSE_FEEDBACK + `/${courseId}`,
      {
        params: { page, limit, sortBy },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch course feedback"
    );
  }
};

/**
 * Fetch feedback stats from real API
 * @param {string} courseId - Course ID
 * @returns {Promise<Object>} Feedback statistics
 */
export const fetchFeedbackStatsReal = async (courseId) => {
  try {
    const response = await httpClient.get(
      API_ENDPOINTS.FEEDBACK_STATS(courseId)
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch feedback stats"
    );
  }
};

// ==================== API SWITCHER ====================

/**
 * Get the appropriate API function based on configuration
 * @param {string} functionName - Name of the API function
 * @returns {Function} The appropriate API function (mock or real)
 */
const getFeedbackApiFunction = (functionName) => {
  const useMock = API_CONFIG.useMockAPI;

  const mockFunctions = {
    fetchExerciseFeedback,
    submitFeedback,
    submitCourseFeedback,
    fetchCourseFeedback,
    fetchFeedbackStats,
    fetchUserFeedback,
    markFeedbackHelpful,
    reportFeedback,
    submitInstructorResponse,
    fetchFeedbackAnalytics,
    moderateFeedback,
  };

  const realFunctions = {
    fetchExerciseFeedback: fetchExerciseFeedbackReal,
    submitFeedback: submitFeedbackReal,
    submitCourseFeedback: submitCourseFeedbackReal,
    fetchCourseFeedback: fetchCourseFeedbackReal,
    fetchFeedbackStats: fetchFeedbackStatsReal,
    fetchUserFeedback: () => Promise.resolve({ feedback: [], total: 0 }),
    markFeedbackHelpful: () => Promise.resolve({ success: true }),
    reportFeedback: () => Promise.resolve({ success: true }),
    submitInstructorResponse: () => Promise.resolve({ success: true }),
    fetchFeedbackAnalytics: () => Promise.resolve({}),
    moderateFeedback: () => Promise.resolve({ success: true }),
  };

  return useMock ? mockFunctions[functionName] : realFunctions[functionName];
};

// Export functions that automatically switch between mock and real APIs
export const feedbackApi = {
  fetchExerciseFeedback: (...args) =>
    getFeedbackApiFunction("fetchExerciseFeedback")(...args),
  submitFeedback: (...args) =>
    getFeedbackApiFunction("submitFeedback")(...args),
  submitCourseFeedback: (...args) =>
    getFeedbackApiFunction("submitCourseFeedback")(...args),
  fetchCourseFeedback: (...args) =>
    getFeedbackApiFunction("fetchCourseFeedback")(...args),
  fetchFeedbackStats: (...args) =>
    getFeedbackApiFunction("fetchFeedbackStats")(...args),
  fetchUserFeedback: (...args) =>
    getFeedbackApiFunction("fetchUserFeedback")(...args),
  markFeedbackHelpful: (...args) =>
    getFeedbackApiFunction("markFeedbackHelpful")(...args),
  reportFeedback: (...args) =>
    getFeedbackApiFunction("reportFeedback")(...args),
  submitInstructorResponse: (...args) =>
    getFeedbackApiFunction("submitInstructorResponse")(...args),
  fetchFeedbackAnalytics: (...args) =>
    getFeedbackApiFunction("fetchFeedbackAnalytics")(...args),
  moderateFeedback: (...args) =>
    getFeedbackApiFunction("moderateFeedback")(...args),
};
