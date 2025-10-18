import React, { useState } from "react";
import {
  Check,
  Play,
  BookOpen,
  ChevronDown,
  Clock,
  Code2,
  ListChecks,
} from "lucide-react";

import { mockExercises } from "../../mock/exercises";

export default function LessonList({ lessons = [], onLessonClick }) {
  const difficulties = [...new Set(lessons.map((l) => l.difficulty))];
  const [expandedDifficulty, setExpandedDifficulty] = useState(
    difficulties[0] || null
  );

  // Xác định trạng thái học
  const getStatus = (progress) => {
    if (progress >= 100)
      return { label: "Hoàn thành", color: "green", icon: <Check /> };
    if (progress > 0)
      return { label: "Đang học", color: "blue", icon: <Play /> };
    return { label: "Chưa học", color: "gray", icon: <BookOpen /> };
  };

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Danh sách bài học
      </h1>

      {difficulties.map((difficulty) => {
        const lessonsByDifficulty = lessons.filter(
          (l) => l.difficulty === difficulty
        );

        return (
          <div
            key={difficulty}
            className="bg-white dark:bg-slate-800 rounded-xl shadow border border-gray-200 dark:border-slate-700 overflow-hidden transition-all duration-300"
          >
            {/* Header nhóm */}
            <button
              onClick={() =>
                setExpandedDifficulty(
                  expandedDifficulty === difficulty ? null : difficulty
                )
              }
              className="w-full px-5 py-4 flex justify-between items-center bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 border-b border-gray-200 dark:border-slate-600 transition-all"
            >
              <div className="flex items-center gap-3 text-left">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-900 dark:text-white font-semibold text-lg">
                  {difficulty}
                  <span className="text-gray-600 dark:text-gray-300 text-sm ml-1">
                    ({lessonsByDifficulty.length} bài học)
                  </span>
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform ${
                  expandedDifficulty === difficulty ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Danh sách bài học */}
            {expandedDifficulty === difficulty && (
              <div className="px-5 py-4 space-y-4">
                {lessonsByDifficulty.map((lesson, idx) => {
                  const { label, color, icon } = getStatus(lesson.progress);
                  const shortContent =
                    lesson.content
                      .replace(/\s+/g, " ")
                      .trim()
                      .split(" ")
                      .slice(0, 20)
                      .join(" ") +
                    (lesson.content.split(" ").length > 20 ? "…" : "");

                  // ✅ Đếm số bài tập thuộc bài học này
                  const exerciseCount = mockExercises.filter(
                    (ex) => ex.lesson_id === lesson.id
                  ).length;

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => onLessonClick?.(lesson.id)}
                      className={`flex flex-col gap-3 p-4 sm:p-5 rounded-lg border transition-all duration-300 cursor-pointer
                      bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-400`}
                    >
                      {/* Header bài học */}
                      <div className="flex items-start gap-4 flex-wrap">
                        <div
                          className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center
                          ${
                            color === "green"
                              ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300"
                              : color === "blue"
                              ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                              : "bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-gray-900 dark:text-white font-semibold text-base sm:text-lg truncate">
                            {idx + 1}. {lesson.title}
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-1">
                            {shortContent}
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full font-medium text-xs sm:text-sm shadow-sm self-start
                          ${
                            color === "green"
                              ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                              : color === "blue"
                              ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                              : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {label}
                        </span>
                      </div>

                      {/* Meta + Tiến độ */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-5 flex-wrap">
                        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 flex-wrap">
                          <Clock className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                          <span>{lesson.readTime}</span>

                          <span className="mx-2">•</span>
                          <Code2 className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                          <span>{lesson.language}</span>

                          {/* 🟢 Hiển thị số bài tập */}
                          <span className="mx-2">•</span>
                          <ListChecks className="w-4 h-4 text-green-500 dark:text-green-400" />
                          <span>{exerciseCount} bài tập</span>
                        </div>

                        {/* Thanh tiến độ */}
                        <div className="flex items-center gap-3 w-full sm:w-48">
                          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                            {lesson.progress}%
                          </span>
                          <div className="relative flex-1 h-2.5 bg-gray-300 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
                                lesson.progress >= 100
                                  ? "bg-green-500"
                                  : "bg-blue-500"
                              }`}
                              style={{ width: `${lesson.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
