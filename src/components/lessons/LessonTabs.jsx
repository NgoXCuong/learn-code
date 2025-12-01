import React from "react";
import LessonContent from "./LessonContent";
import LessonExercise from "./LessonExercise";

export default function LessonTabs({
  activeTab,
  setActiveTab,
  lesson,
  exercises,
  courseId,
  lessonId,
  isDark,
}) {
  return (
    <div
      className={`rounded-sm shadow-lg mb-2 border   ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      {/* Tab Buttons */}
      <div
        className={`flex border-b overflow-x-auto scrollbar-hide ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <button
          onClick={() => setActiveTab("content")}
          className={`flex-1 min-w-0 px-3 sm:px-4 lg:px-6 py-3 sm:py-2 font-bold text-sm sm:text-base transition-colors relative whitespace-nowrap ${
            activeTab === "content"
              ? isDark
                ? "text-indigo-400"
                : "text-indigo-600"
              : isDark
              ? "text-gray-400 hover:text-gray-200"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          📖 Nội dung bài học
          {activeTab === "content" && (
            <div
              className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                isDark ? "bg-indigo-400" : "bg-indigo-600"
              }`}
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("exercises")}
          className={`flex-1 min-w-0 px-3 sm:px-4 lg:px-6 py-3 sm:py-2 font-bold text-sm sm:text-base transition-colors relative whitespace-nowrap ${
            activeTab === "exercises"
              ? isDark
                ? "text-indigo-400"
                : "text-indigo-600"
              : isDark
              ? "text-gray-400 hover:text-gray-200"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          ✏️ Bài tập ({exercises.length})
          {activeTab === "exercises" && (
            <div
              className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                isDark ? "bg-indigo-400" : "bg-indigo-600"
              }`}
            />
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "content" && (
          <LessonContent lesson={lesson} isDark={isDark} />
        )}
        {activeTab === "exercises" && (
          <LessonExercise
            exercises={exercises}
            courseId={courseId}
            lessonId={lessonId}
          />
        )}
      </div>
    </div>
  );
}
