// Mock API delay để simulate real API
const MOCK_DELAY = 500;

// Mock feedback data
const mockFeedbackData = {
  courseId: "JSB001",
  userId: 1,
  rating: 5,
  comment: "Khóa học rất hay và dễ hiểu! Giảng viên giải thích rất rõ ràng.",
  submittedAt: "2024-01-15T10:30:00Z",
  helpful: 12,
  courseTitle: "JavaScript Cơ bản",
  userName: "Nguyễn Văn A",
  userAvatar: "https://i.pravatar.cc/150?img=32",
};

const mockFeedbackStats = {
  courseId: "JSB001",
  totalReviews: 45,
  averageRating: 4.7,
  ratingDistribution: {
    5: 28,
    4: 12,
    3: 3,
    2: 1,
    1: 1,
  },
  recentReviews: [
    {
      id: 1,
      userId: 2,
      userName: "Trần Thị B",
      userAvatar: "https://i.pravatar.cc/150?img=45",
      rating: 5,
      comment: "Nội dung rất chi tiết và thực tế. Rất thích cách giảng!",
      submittedAt: "2024-01-20T14:20:00Z",
      helpful: 8,
    },
    {
      id: 2,
      userId: 3,
      userName: "Lê Văn C",
      userAvatar: "https://i.pravatar.cc/150?img=12",
      rating: 4,
      comment: "Khóa học tốt, nhưng có thể thêm nhiều ví dụ thực tế hơn.",
      submittedAt: "2024-01-18T09:15:00Z",
      helpful: 5,
    },
  ],
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
  let reviews = [...mockFeedbackStats.recentReviews];

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
    averageRating: mockFeedbackStats.averageRating,
    totalReviews: mockFeedbackStats.totalReviews,
  };

  return result;
};

export const fetchFeedbackStats = async (courseId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  return {
    courseId,
    ...mockFeedbackStats,
  };
};

// ==================== User Feedback ====================
export const fetchUserFeedback = async (userId, page = 1, limit = 10) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  // Mock user feedback history
  const userFeedback = [
    {
      id: 1,
      courseId: "JSB001",
      courseTitle: "JavaScript Cơ bản",
      rating: 5,
      comment: "Khóa học tuyệt vời! Rất hữu ích cho người mới bắt đầu.",
      submittedAt: "2024-01-15T10:30:00Z",
      helpful: 12,
      status: "approved",
    },
    {
      id: 2,
      courseId: "PYB001",
      courseTitle: "Python Cơ bản",
      rating: 4,
      comment: "Nội dung tốt, giảng viên nhiệt tình.",
      submittedAt: "2024-01-10T14:20:00Z",
      helpful: 8,
      status: "approved",
    },
  ];

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
