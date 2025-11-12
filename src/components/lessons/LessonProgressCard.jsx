import React from "react";
import { Target, CheckCircle2 } from "lucide-react";

export default function LessonProgressCard({
  isDark,
  progressPercent,
  completedExercises,
  totalExercises,
}) {
  return (
    <div
      className={`p-4 rounded-xl ${
        isDark
          ? "bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-800/50"
          : "bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100"
      }`}
    >
      {/* Header
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Tiến độ học tập
        </h3>
      </div> */}

      {/* Progress */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-base font-medium text-gray-700 dark:text-gray-300">
            Tiến độ học tập
          </span>
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            {progressPercent}%
          </span>
        </div>
        <div className="w-full h-2.5 bg-white/50 dark:bg-gray-800/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-indigo-200/30 dark:border-indigo-700/30">
        <span className="text-base text-gray-600 dark:text-gray-400">
          Bài tập đã làm
        </span>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
          <span className="font-semibold text-gray-900 dark:text-white text-base">
            {completedExercises}/{totalExercises}
          </span>
        </div>
      </div>
    </div>
  );
}
