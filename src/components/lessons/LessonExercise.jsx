// src/components/lessons/LessonExercise.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Code2 } from "lucide-react";

export default function LessonExercise({ exercises, courseId, lessonId }) {
  const [expandedExerciseId, setExpandedExerciseId] = useState(
    exercises.length > 0 ? exercises[0].id : null
  );

  const navigate = useNavigate();

  // Hàm chuyển sang trang Compiler
  const handleStartExercise = (exerciseId) => {
    navigate(`/courses/${courseId}/lessons/${lessonId}/exercise/${exerciseId}`);
  };

  if (!exercises || exercises.length === 0) {
    return (
      <div className="p-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Chưa có bài tập cho bài học này.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {exercises.map((ex, index) => (
        <div
          key={ex.id}
          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
        >
          {/* Header bài tập */}
          <button
            onClick={() =>
              setExpandedExerciseId(expandedExerciseId === ex.id ? null : ex.id)
            }
            className="w-full p-5 flex items-start justify-between gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start gap-3 flex-1 text-left">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {ex.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                  {ex.description}
                </p>
              </div>
            </div>
            <div
              className={`flex-shrink-0 w-5 h-5 text-gray-400 transition-transform duration-300 ${
                expandedExerciseId === ex.id ? "rotate-180" : ""
              }`}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </button>

          {/* Nội dung bài tập khi expand */}
          {expandedExerciseId === ex.id && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-5 bg-gray-50/50 dark:bg-gray-900/30">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Đề bài:
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {ex.description}
                  </p>
                </div>

                {ex.example_code && (
                  <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                    <p className="text-sm text-blue-900 dark:text-blue-200">
                      <span className="font-semibold">💡 Gợi ý:</span>{" "}
                      {ex.example_code}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => handleStartExercise(ex.id)}
                  className="w-full mt-4 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
                >
                  Bắt đầu làm bài tập
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
