import React from "react";
import {
  Trophy,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  Clock,
} from "lucide-react";

export const ChallengeCard = ({ challenge, onClick, userProgress }) => {
  const isCompleted = userProgress.completedChallenges.includes(challenge.id);
  const isAttempted = userProgress.attemptedChallenges.includes(challenge.id);

  const difficultyColors = {
    Dễ: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    "Trung bình":
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    Khó: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <div
      onClick={() => onClick(challenge)}
      className="btn-shimmer bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all cursor-pointer relative"
    >
      {/* Trạng thái */}
      {isCompleted && (
        <div className="absolute top-3 right-3 text-green-500">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      )}
      {isAttempted && !isCompleted && (
        <div className="absolute top-3 right-3 text-yellow-500">
          <Clock className="w-5 h-5" />
        </div>
      )}

      {/* Tiêu đề */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors pr-8">
        {challenge.title}
      </h3>

      {/* Mô tả */}
      <p className="text-base text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
        {challenge.description}
      </p>

      {/* Tag */}
      <div className="flex flex-wrap gap-2 mb-4">
        {challenge.tags.map((tag, i) => (
          <span
            key={i}
            className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full border border-gray-200 dark:border-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Độ khó + Điểm */}
      <div className="flex items-center justify-between text-base mb-2">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            difficultyColors[challenge.difficulty]
          }`}
        >
          {challenge.difficulty}
        </span>
        <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
          <Trophy className="w-4 h-4" />
          {challenge.points} điểm
        </span>
      </div>

      {/* Thông tin dưới */}
      <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {challenge.participants} người tham gia
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare className="w-3 h-3" />
          {challenge.comments} bình luận
        </span>
      </div>
    </div>
  );
};
