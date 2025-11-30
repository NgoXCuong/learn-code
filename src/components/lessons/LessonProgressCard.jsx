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
      className={`p-4 rounded-sm shadow-md transition-colors duration-300   ${
        isDark
          ? "bg-linear-to-br from-indigo-600/20 to-purple-800 border border-indigo-500/50"
          : "bg-linear-to-br from-indigo-300 to-purple-100 border border-indigo-200"
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
              // Thay đổi màu text số % sáng hơn 1 chút
              isDark ? "text-cyan-300 drop-shadow-sm" : "text-indigo-600"
            }`}
          >
            {progressPercent}%
          </span>
        </div>

        {/* Thanh Background (xám mờ) */}
        <div
          className={`w-full h-2 rounded-full overflow-hidden ${
            isDark ? "bg-gray-400" : "bg-gray-200"
          }`}
        >
          {/* --- PHẦN CHỈNH SỬA CHÍNH Ở ĐÂY --- */}
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
              isDark
                ? "text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]"
                : "text-green-600" // Thêm glow nhẹ cho icon
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
