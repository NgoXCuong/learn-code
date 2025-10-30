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
      className={`p-6 rounded-2xl ${
        isDark
          ? "bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-800/50"
          : "bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100"
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Tiến độ học tập
        </h3>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-base font-medium text-gray-700 dark:text-gray-300">
            Hoàn thành
          </span>
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {progressPercent}%
          </span>
        </div>
        <div className="w-full h-3 bg-white/50 dark:bg-gray-800/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-indigo-200/30 dark:border-indigo-700/30">
        <span className="text-base text-gray-600 dark:text-gray-400">
          Bài tập đã làm
        </span>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <span className="font-bold text-gray-900 dark:text-white">
            {completedExercises}/{totalExercises}
          </span>
        </div>
      </div>
    </div>
  );
}
