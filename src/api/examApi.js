import { quizData } from "@/mock/exam";

// Mock API delay để simulate real API
const MOCK_DELAY = 500;

// ==================== Exam/Quiz Data ====================
export const fetchExamData = async (courseId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  // In a real app, this would fetch based on courseId
  // For now, return the mock quiz data
  return quizData;
};

export const fetchBasicQuiz = async (courseId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  return quizData.basicQuiz;
};

export const fetchAdvancedTasks = async (courseId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  return quizData.advancedTasks;
};

// ==================== Quiz Submission ====================
export const submitQuizAnswers = async (courseId, answers) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const quiz = quizData.basicQuiz;
  let correctAnswers = 0;
  const results = [];

  quiz.questions.forEach((question, index) => {
    const userAnswer = answers[index];
    const isCorrect = userAnswer === question.correctAnswer;
    if (isCorrect) correctAnswers++;

    results.push({
      questionId: question.id,
      userAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect,
      explanation: question.explanation,
    });
  });

  const score = Math.round((correctAnswers / quiz.questions.length) * 100);
  const passed = score >= quizData.passingScore;

  const submissionResult = {
    courseId,
    totalQuestions: quiz.questions.length,
    correctAnswers,
    score,
    passed,
    passingScore: quizData.passingScore,
    results,
    submittedAt: new Date().toISOString(),
    timeSpent: answers.timeSpent || 0,
  };

  return submissionResult;
};

// ==================== Task Submission ====================
export const submitTaskCode = async (courseId, taskId, code, language) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const task = quizData.advancedTasks.find((t) => t.id === taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  // Mock code execution and testing
  const passed = Math.random() > 0.4; // 60% pass rate for tasks
  const testResults = task.testCases.map((testCase) => ({
    input: testCase.input,
    expected: testCase.expected,
    actual: passed ? testCase.expected : "Wrong output",
    passed,
  }));

  const submissionResult = {
    courseId,
    taskId,
    passed,
    testResults,
    allTestsPassed: passed,
    executionTime: Math.floor(Math.random() * 100) + 50, // 50-150ms
    memoryUsed: Math.floor(Math.random() * 10) + 5, // 5-15MB
    submittedAt: new Date().toISOString(),
    code,
    language,
  };

  return submissionResult;
};

// ==================== User Progress ====================
export const fetchUserExamProgress = async (userId, courseId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  // Mock progress data
  const progress = {
    userId,
    courseId,
    basicQuizCompleted: Math.random() > 0.5,
    basicQuizScore: Math.floor(Math.random() * 40) + 60, // 60-100
    advancedTasksCompleted: Math.floor(
      Math.random() * quizData.advancedTasks.length
    ),
    totalTasks: quizData.advancedTasks.length,
    lastAttempted: new Date().toISOString(),
    timeSpent: Math.floor(Math.random() * 3600), // 0-3600 seconds
  };

  return progress;
};

export const updateExamProgress = async (userId, courseId, progressData) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const updatedProgress = {
    userId,
    courseId,
    ...progressData,
    updatedAt: new Date().toISOString(),
  };

  return updatedProgress;
};

// ==================== Course Selection ====================
export const fetchAvailableCoursesForExam = async () => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  // Mock available courses for exam
  const courses = [
    {
      id: "JSB001",
      title: "JavaScript Cơ bản",
      description: "Khóa học JavaScript nền tảng",
      difficulty: "Cơ bản",
      estimatedTime: "10 giờ",
      totalLessons: 12,
      hasExam: true,
      examStatus: "available",
    },
    {
      id: "PYB001",
      title: "Python Cơ bản",
      description: "Lập trình Python từ đầu",
      difficulty: "Cơ bản",
      estimatedTime: "12 giờ",
      totalLessons: 15,
      hasExam: true,
      examStatus: "locked", // Need to complete course first
    },
    {
      id: "CPP001",
      title: "C++ Nâng cao",
      description: "Lập trình C++ chuyên sâu",
      difficulty: "Nâng cao",
      estimatedTime: "20 giờ",
      totalLessons: 25,
      hasExam: true,
      examStatus: "completed",
    },
  ];

  return courses;
};

// ==================== Exam Results ====================
export const fetchExamResults = async (userId, courseId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const results = {
    userId,
    courseId,
    overallScore: Math.floor(Math.random() * 30) + 70, // 70-100
    basicQuizScore: Math.floor(Math.random() * 20) + 80, // 80-100
    advancedTasksScore: Math.floor(Math.random() * 40) + 60, // 60-100
    totalTasksCompleted:
      Math.floor(Math.random() * quizData.advancedTasks.length) + 1,
    badgesEarned: quizData.badges.slice(0, Math.floor(Math.random() * 3)),
    completedAt: new Date().toISOString(),
    certificateEligible: Math.random() > 0.3,
    recommendations: [
      "Hãy luyện tập thêm về algorithms",
      "Thử sức với các challenge nâng cao",
      "Xem lại các khái niệm về data structures",
    ],
  };

  return results;
};

// ==================== Exam Statistics ====================
export const fetchExamStats = async (courseId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const stats = {
    courseId,
    totalAttempts: Math.floor(Math.random() * 500) + 100,
    averageScore: Math.floor(Math.random() * 20) + 75, // 75-95
    passRate: Math.floor(Math.random() * 20) + 70, // 70-90
    averageTime: Math.floor(Math.random() * 10) + 25, // 25-35 minutes
    difficultyDistribution: {
      easy: Math.floor(Math.random() * 30) + 20,
      medium: Math.floor(Math.random() * 40) + 30,
      hard: Math.floor(Math.random() * 20) + 10,
    },
    commonMistakes: [
      "Không hiểu rõ về scope và closure",
      "Nhầm lẫn giữa == và ===",
      "Quên xử lý edge cases",
    ],
  };

  return stats;
};

// ==================== Reset/Retry ====================
export const resetExamProgress = async (userId, courseId) => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));
  const resetResult = {
    userId,
    courseId,
    resetAt: new Date().toISOString(),
    message: "Exam progress has been reset. You can start over.",
  };

  return resetResult;
};
