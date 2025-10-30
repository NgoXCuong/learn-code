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

  const getStatus = (progress) => {
    if (progress >= 100)
      return { label: "Hoàn thành", color: "green", icon: <Check /> };
    if (progress > 0)
      return { label: "Đang học", color: "blue", icon: <Play /> };
    return { label: "Chưa học", color: "gray", icon: <BookOpen /> };
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Danh sách bài học
      </h1>

      {difficulties.map((difficulty) => {
        const lessonsByDifficulty = lessons.filter(
          (l) => l.difficulty === difficulty
        );

        return (
          <div
            key={difficulty}
            className="bg-white dark:bg-gradient-to-r dark:from-gray-700 dark:via-indigo-800 dark:to-gray-900 rounded-xl shadow border border-gray-200 dark:border-indigo-600/40 overflow-hidden transition-all duration-300"
          >
            {/* Header nhóm */}
            <button
              onClick={() =>
                setExpandedDifficulty(
                  expandedDifficulty === difficulty ? null : difficulty
                )
              }
              className="w-full px-5 py-4 flex justify-between items-center text-left
              bg-gray-50 hover:bg-gray-100
              dark:bg-gradient-to-r dark:from-gray-700 dark:via-indigo-800 dark:to-gray-900
              dark:hover:from-indigo-700 dark:hover:via-indigo-800 dark:hover:to-indigo-900
              border-b border-gray-200 dark:border-indigo-600/40
              text-gray-800 dark:text-gray-100
              shadow-sm hover:shadow-md transition-all duration-500"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-xl">
                  {difficulty}
                  <span className="text-gray-600 dark:text-gray-300 text-base ml-1">
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
              <div className="px-4 sm:px-5 py-4 space-y-4">
                {lessonsByDifficulty.map((lesson, idx) => {
                  const { label, color, icon } = getStatus(lesson.progress);
                  const shortContent =
                    lesson.content
                      ?.replace(/\s+/g, " ")
                      .trim()
                      .split(" ")
                      .slice(0, 20)
                      .join(" ") +
                    (lesson.content.split(" ").length > 20 ? "…" : "");

                  const exerciseCount = mockExercises.filter(
                    (ex) => ex.lesson_id === lesson.id
                  ).length;

                  return (
                    <div
                      key={lesson.id}
                      onClick={() => onLessonClick?.(lesson.id)}
                      className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-5 rounded-lg border
                      bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-gradient-to-r dark:hover:from-indigo-700 dark:hover:via-indigo-800 dark:hover:to-gray-900
                      border-gray-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-indigo-400
                      transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg hover:scale-[1.01]"
                    >
                      {/* Header bài học */}
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg shrink-0
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
                          <h4 className="font-semibold text-gray-900 dark:text-white text-lg sm:text-xl truncate">
                            {idx + 1}. {lesson.title}
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mt-1">
                            {shortContent}
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full font-medium text-sm sm:text-base shadow-sm self-start sm:self-center
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
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 flex-wrap">
                        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-base text-gray-700 dark:text-gray-300">
                          <Clock className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                          <span>{lesson.readTime}</span>

                          <span className="hidden sm:inline">•</span>
                          <Code2 className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                          <span>{lesson.language}</span>

                          <span className="hidden sm:inline">•</span>
                          <ListChecks className="w-4 h-4 text-green-500 dark:text-green-400" />
                          <span>{exerciseCount} bài tập</span>
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-48">
                          <span className="text-base font-semibold text-blue-600 dark:text-blue-400 whitespace-nowrap">
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
