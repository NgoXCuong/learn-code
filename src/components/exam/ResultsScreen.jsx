import React, { useState, useMemo } from "react";
import {
  Award,
  Home,
  FileText,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  Target,
  TrendingUp,
} from "lucide-react";

const ResultsScreen = ({
  questions,
  answers,
  timeSpent,
  onReview,
  onGoHome,
}) => {
  const [darkMode, setDarkMode] = useState(true);

  const { correct, total, percent } = useMemo(() => {
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
  }, [questions, answers]);

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

  const StatCard = ({ icon: Icon, label, value, color }) => {
    const colorClasses = {
      emerald: "from-emerald-500 to-teal-600",
      green: "from-green-500 to-emerald-600",
      red: "from-red-500 to-pink-600",
      blue: "from-blue-500 to-indigo-600",
      purple: "from-purple-500 to-indigo-600",
    };

    return (
      <div
        className={`${
          darkMode
            ? "bg-slate-800/60 border-slate-700/50"
            : "bg-white/80 border-gray-200"
        } backdrop-blur-sm border rounded-2xl p-5 transition-all hover:scale-105 hover:shadow-lg`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-12 h-12 bg-linear-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center shadow-lg`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {label}
            </p>
            <p
              className={`text-2xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {value}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode
          ? "bg-linear-to-br from-gray-900 via-gray-800 to-black"
          : "bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100"
      } transition-all duration-500 relative overflow-hidden`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-72 h-72 ${
            darkMode ? "bg-indigo-600/10" : "bg-indigo-300/20"
          } rounded-full blur-3xl animate-pulse`}
        ></div>
        <div
          className={`absolute bottom-20 right-10 w-96 h-96 ${
            darkMode ? "bg-purple-600/10" : "bg-purple-300/20"
          } rounded-full blur-3xl animate-pulse delay-1000`}
        ></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="max-w-4xl w-full">
          {/* Success Header */}
          <div className="text-center mb-8 animate-fadeIn">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-indigo-500 to-purple-600 rounded-3xl mb-6 shadow-2xl animate-bounce-slow">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h1
              className={`text-4xl md:text-5xl font-bold mb-3 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Hoàn thành! {performance.emoji}
            </h1>
            <p
              className={`text-xl ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Kết quả bài thi của bạn
            </p>
          </div>

          {/* Main Results Card */}
          <div
            className={`${
              darkMode
                ? "bg-slate-800/60 border-slate-700/50"
                : "bg-white/80 border-gray-200"
            } backdrop-blur-xl border rounded-3xl p-8 shadow-2xl mb-6 animate-scaleIn`}
          >
            {/* Score Circle */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className={darkMode ? "text-slate-700" : "text-gray-200"}
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="url(#scoreGradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(percent / 100) * 552} 552`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 animate-drawCircle"
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
                  <div
                    className={`text-5xl font-bold bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent`}
                  >
                    {percent}%
                  </div>
                  <div
                    className={`text-sm mt-1 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {performance.label}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon={Target}
                label="Tổng số câu"
                value={total}
                color="purple"
              />
              <StatCard
                icon={CheckCircle}
                label="Câu đúng"
                value={correct}
                color="green"
              />
              <StatCard
                icon={XCircle}
                label="Câu sai"
                value={wrong}
                color="red"
              />
              <StatCard
                icon={Clock}
                label="Thời gian"
                value={formatTime(timeSpent)}
                color="blue"
              />
            </div>

            {/* Performance Badge */}
            <div
              className={`${
                darkMode
                  ? "bg-linear-to-r from-indigo-600/20 to-purple-600/20 border-indigo-500/30"
                  : "bg-linear-to-r from-indigo-100 to-purple-100 border-indigo-300"
              } border-2 rounded-2xl p-6 text-center`}
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <TrendingUp
                  className={`w-6 h-6 ${
                    darkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}
                />
                <h3
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Đánh giá: {performance.label}
                </h3>
              </div>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                {percent >= 80
                  ? "Xuất sắc! Bạn đã làm rất tốt bài thi này."
                  : percent >= 60
                  ? "Tốt lắm! Tiếp tục phát huy nhé."
                  : "Đừng bỏ cuộc! Hãy xem lại đáp án và học thêm."}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn">
            <button
              onClick={onReview}
              className={`flex-1 py-4 px-6 ${
                darkMode
                  ? "bg-slate-800/80 border-slate-700 hover:bg-slate-700"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              } backdrop-blur-sm border-2 rounded-2xl font-semibold transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-3 group`}
            >
              <FileText className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className={darkMode ? "text-white" : "text-gray-900"}>
                Xem chi tiết đáp án
              </span>
            </button>

            <button
              onClick={onGoHome}
              className="flex-1 py-4 px-6 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-semibold transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-3 group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Quay về trang chủ
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
export default ResultsScreen;
