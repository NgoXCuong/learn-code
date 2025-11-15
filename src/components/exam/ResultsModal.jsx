import React from "react";
import { FileText, X, Trophy, Home } from "lucide-react";

const ResultsModal = ({
  show,
  close,
  questions,
  answers,
  timeSpent,
  onReview,
  onGoHome,
}) => {
  if (!show) return null;

  const { correct, total, percent } = (() => {
    const correctCount = questions.reduce(
      (acc, question) =>
        answers[question.id] === question.correctAnswer ? acc + 1 : acc,
      0
    );
    const totalCount = questions.length;
    return {
      correct: correctCount,
      total: totalCount,
      percent:
        totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0,
    };
  })();

  const wrong = total - correct;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const getPerformanceLevel = () => {
    if (percent >= 90)
      return { label: "Xuất sắc", color: "emerald", emoji: "🏆" };
    if (percent >= 80) return { label: "Rất tốt", color: "green", emoji: "🌟" };
    if (percent >= 70) return { label: "Tốt", color: "blue", emoji: "👍" };
    if (percent >= 60) return { label: "Khá", color: "yellow", emoji: "💪" };
    if (percent >= 50)
      return { label: "Trung bình", color: "orange", emoji: "📚" };
    return { label: "Cần cố gắng", color: "red", emoji: "💪" };
  };

  const performance = getPerformanceLevel();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Kết quả bài thi {performance.emoji}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-lg text-gray-600 dark:text-gray-400">
                  {performance.label}
                </span>
              </div>
            </div>
            <button
              onClick={close}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Score Circle */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  stroke="url(#scoreGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(percent / 100) * 376} 376`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient
                    id="scoreGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  {percent}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {performance.label}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {correct}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                Câu đúng
              </div>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {wrong}
              </div>
              <div className="text-sm text-red-700 dark:text-red-300">
                Câu sai
              </div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {total}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                Tổng số
              </div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatTime(timeSpent)}
              </div>
              <div className="text-sm text-purple-700 dark:text-purple-300">
                Thời gian
              </div>
            </div>
          </div>

          {/* Performance Message */}
          <div className="text-center mb-6 p-4 bg-linear-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
            <p className="text-gray-700 dark:text-gray-300">
              {percent >= 80
                ? "Xuất sắc! Bạn đã làm rất tốt bài thi này."
                : percent >= 60
                ? "Tốt lắm! Tiếp tục phát huy nhé."
                : "Đừng bỏ cuộc! Hãy học thêm và thử lại."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onReview}
              className="flex-1 py-3 px-6 btn-shimmer cursor-pointer bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Xem chi tiết
            </button>
            <button
              onClick={onGoHome}
              className="flex-1 py-3 px-6 btn-shimmer cursor-pointer bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Về trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;
