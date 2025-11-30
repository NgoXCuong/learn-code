import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Clock,
  Lightbulb,
  ChevronUp,
  ChevronDown,
  Zap,
  Star,
  MessageSquare,
  Send,
  ThumbsUp,
} from "lucide-react";

export const ChallengeDetailModal = ({ challenge, onClose, userProgress }) => {
  const navigate = useNavigate();

  const [showHints, setShowHints] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showAiHelp, setShowAiHelp] = useState(false);

  const handleClick = () => {
    navigate(`/challenges/${challenge.id}/compiler`, {
      state: { challenge },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4  ">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-gray-200 dark:border-gray-700">
        {/* HEADER */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {challenge.title}
              </h2>

              <div className="flex flex-wrap text-sm items-center gap-3">
                <span
                  className={`px-3  rounded-lg  font-medium ${
                    challenge.difficulty === "Dễ"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : challenge.difficulty === "Trung bình"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {challenge.difficulty}
                </span>

                <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                  <Zap className="w-4 h-4" />
                  {challenge.points} điểm
                </span>

                <span className=" text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Trung bình: {challenge.avgTime}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2"
            >
              <X className="w-6 h-6 hover:bg-red-500 hover:text-white rounded-full cursor-pointer" />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Mô tả
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-base">
              {challenge.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {challenge.tags.map((tag, i) => (
              <span
                key={i}
                className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3  rounded-lg border border-gray-200 dark:border-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-gray-800 rounded-lg p-4 border border-blue-100 dark:border-gray-700">
              <p className="text-base text-gray-600 dark:text-gray-400 mb-1">
                Tỷ lệ thành công
              </p>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                {challenge.successRate}%
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-gray-800 rounded-lg p-4 border border-purple-100 dark:border-gray-700">
              <p className="text-base text-gray-600 dark:text-gray-400 mb-1">
                Người tham gia
              </p>
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {challenge.participants}
              </p>
            </div>
          </div>

          {/* Hints */}
          {challenge.hints.length > 0 && (
            <div className="border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20">
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200 text-base font-semibold mb-2"
              >
                <Lightbulb className="w-5 h-5" />
                Gợi ý ({challenge.hints.length})
                {showHints ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {showHints && (
                <ul className="space-y-2 mt-3">
                  {challenge.hints.map((hint, i) => (
                    <li
                      key={i}
                      className="text-base text-yellow-900 dark:text-yellow-100 flex gap-2"
                    >
                      <span className="font-bold">{i + 1}.</span>
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Action Button */}
          <div className="flex gap-3">
            <button
              onClick={handleClick}
              className="flex-1 btn-shimmer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-base
                transition-all shadow-sm hover:shadow-md cursor-pointer
              "
            >
              Bắt đầu thử thách
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
