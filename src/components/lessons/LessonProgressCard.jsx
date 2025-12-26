import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function LessonProgressCard({
  isDark,
  lesson,
  completedExercises,
  totalExercises,
}) {
  // Calculate progress from lesson data if available
  const progressPercent = lesson ? lesson.progress : 0;

  return (
    <div
      className={`p-4 rounded-sm shadow-md transition-colors duration-300 border ${
        isDark
          ? "bg-slate-900 border-slate-700" // Màu nền đơn sắc cho Dark Mode
          : "bg-white border-gray-200" // Màu nền đơn sắc cho Light Mode
      }`}
    >
      {/* Progress */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span
            className={`text-base font-semibold ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Tiến độ học tập
          </span>
          <span
            className={`text-base font-bold ${
              isDark ? "text-cyan-400" : "text-indigo-600"
            }`}
          >
            {progressPercent}%
          </span>
        </div>

        {/* Thanh Background (xám mờ) */}
        <div
          className={`w-full h-2 rounded-full overflow-hidden ${
            isDark ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          {/* Thanh Tiến trình (Solid Color) */}
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${
              isDark ? "bg-green-500" : "bg-indigo-500"
            }`}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`flex items-center justify-between pt-1 border-t transition-colors duration-300 ${
          isDark ? "border-slate-700" : "border-gray-100"
        }`}
      >
        <span
          className={`text-base font-medium ${
            isDark ? "text-gray-400" : "text-gray-600"
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
            className={`font-medium text-base ${
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
