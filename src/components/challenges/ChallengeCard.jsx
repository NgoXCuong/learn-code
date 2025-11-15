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
      className="
        btn-shimmer relative cursor-pointer
        bg-white dark:bg-gray-900 
        border border-gray-200 dark:border-gray-700 
        hover:border-blue-500 dark:hover:border-blue-400
        hover:shadow-lg transition-all
        rounded-xl p-5
      "
    >
      {/* Status + Difficulty */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <span
          className={`
            font-exo text-xs font-semibold px-2 py-1 rounded-full 
            ${difficultyColors[challenge.difficulty]}
          `}
        >
          {challenge.difficulty}
        </span>

        {isCompleted && (
          <div className="text-green-500">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        )}

        {!isCompleted && isAttempted && (
          <div className="text-yellow-500">
            <Clock className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Title */}
      <h3
        className="
          font-exo text-xl font-semibold 
          text-gray-900 dark:text-gray-100 
          mb-2 pr-10 transition-colors
          hover:text-blue-600 dark:hover:text-blue-400
        "
      >
        {challenge.title}
      </h3>

      {/* Description */}
      <p
        className="
          font-exo text-base 
          text-gray-600 dark:text-gray-400 
          mb-3 line-clamp-2
        "
      >
        {challenge.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {challenge.tags.map((tag, i) => (
          <span
            key={i}
            className="
              font-exo text-sm 
              bg-gray-100 dark:bg-gray-800 
              text-gray-700 dark:text-gray-300 
              px-2 py-1 rounded-full 
              border border-gray-200 dark:border-gray-700
            "
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer Info */}
      <div
        className="
          font-exo pt-3 border-t border-gray-200 dark:border-gray-700 
          flex items-center justify-between 
          text-sm text-gray-500 dark:text-gray-400
        "
      >
        <span className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {challenge.participants} người tham gia
        </span>

        <span
          className="
            flex items-center gap-1 font-semibold
            text-blue-600 dark:text-blue-400
          "
        >
          <Trophy className="w-4 h-4" />
          {challenge.points} điểm
        </span>
      </div>
    </div>
  );
};
