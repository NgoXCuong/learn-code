import React from "react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ChevronLeft, ChevronRight, Target, Clock } from "lucide-react";

export default function TopBar({
  breadcrumbItems,
  currentExercise,
  exercises,
  currentExIndex,
  navigate,
  courseId,
  lessonId,
  isDark,
}) {
  const prevExercise = exercises[currentExIndex - 1];
  const nextExercise = exercises[currentExIndex + 1];

  return (
    <div
      className={`border-b ${
        isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      }`}
    >
      <div className="py-3 sm:py-6">
        <div className="grow w-full px-4 sm:px-6 md:px-14 lg:px-20">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {currentExercise && (
          <div className="flex flex-col font-exo sm:flex-row sm:items-start sm:justify-between gap-3 px-4 sm:px-6 md:px-14 lg:px-20">
            <div className="flex-1">
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {currentExercise.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-base">
                <span
                  className={`flex items-center gap-1 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="font-medium">
                    {currentExercise.difficulty || "Trung bình"}
                  </span>
                </span>
                <span
                  className={`flex items-center gap-1 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="font-medium">30 phút</span>
                </span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => prevExercise && navigate(prevExercise)}
                disabled={!prevExercise}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-base font-medium transition-all ${
                  !prevExercise
                    ? isDark
                      ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : isDark
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Bài trước</span>
              </button>

              <div
                className={`px-3 py-2 text-xs sm:text-base font-medium ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {currentExIndex + 1} / {exercises.length}
              </div>

              <button
                onClick={() =>
                  nextExercise
                    ? navigate(nextExercise)
                    : alert("🎉 Bạn đã hoàn thành tất cả bài tập!")
                }
                disabled={!nextExercise}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-base font-medium transition-all ${
                  !nextExercise
                    ? isDark
                      ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : isDark
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <span className="hidden sm:inline hover:text-gray-900">
                  Bài tiếp
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
