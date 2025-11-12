import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function LessonProgressCard({
  isDark,
  progressPercent,
  completedExercises,
  totalExercises,
}) {
  return (
    <div
      className={`p-4 rounded-xl shadow-md transition-colors duration-300 ${
        isDark
          ? "bg-linear-to-br from-indigo-800/80 to-purple-800/80 border border-indigo-700/60"
          : "bg-linear-to-br from-indigo-100 to-purple-100 border border-indigo-200"
      }`}
    >
      {/* Progress */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span
            className={`text-base font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Tiến độ học tập
          </span>
          <span
            className={`text-xl font-bold ${
              isDark ? "text-indigo-300" : "text-indigo-600"
            }`}
          >
            {progressPercent}%
          </span>
        </div>
        <div
          className={`w-full h-3 rounded-full overflow-hidden ${
            isDark ? "bg-gray-700/50" : "bg-gray-200"
          }`}
        >
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              isDark
                ? "bg-linear-to-r from-indigo-500 to-purple-500"
                : "bg-indigo-500"
            }`}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`flex items-center justify-between pt-3 border-t transition-colors duration-300 ${
          isDark ? "border-indigo-600/40" : "border-indigo-300/40"
        }`}
      >
        <span
          className={`text-base font-medium ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Bài tập đã làm
        </span>
        <div className="flex items-center gap-2">
          <CheckCircle2
            className={`w-4 h-4 ${
              isDark ? "text-green-400" : "text-green-600"
            }`}
          />
          <span
            className={`font-semibold text-base ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {completedExercises}/{totalExercises}
          </span>
        </div>
      </div>
    </div>
  );
}
