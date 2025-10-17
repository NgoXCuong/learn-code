import React, { useState } from "react";
import {
  Check,
  Play,
  Lock,
  BookOpen,
  ChevronDown,
  Clock,
  HelpCircle,
  Users,
} from "lucide-react";

export default function LessonList({ lessons = [], onLessonClick }) {
  const difficulties = [...new Set(lessons.map((l) => l.difficulty))];
  const [expandedDifficulty, setExpandedDifficulty] = useState(
    difficulties[0] || null
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return { circle: "bg-green-500 text-white", label: "Hoàn thành" };
      case "in_progress":
        return {
          circle: "bg-blue-500 text-white animate-pulse",
          label: "Tiếp tục",
        };
      case "locked":
        return {
          circle: "bg-gray-400 text-white",
          label: "Bắt đầu",
          disabled: true,
        };
      default:
        return { circle: "bg-gray-300 text-gray-700", label: "Bắt đầu" };
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <Check className="w-5 h-5" />;
      case "in_progress":
        return <Play className="w-5 h-5" />;
      case "locked":
        return <Lock className="w-5 h-5" />;
      default:
        return null;
    }
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
            {/* Header */}
            <button
              onClick={() =>
                setExpandedDifficulty(
                  expandedDifficulty === difficulty ? null : difficulty
                )
              }
              className="w-full px-4 sm:px-6 py-4 flex justify-between items-center bg-gray-50 dark:bg-slate-700 
              hover:bg-gray-100 dark:hover:bg-slate-600 transition-all border-b border-gray-200 dark:border-slate-600"
            >
              <div className="flex items-center gap-3 text-left">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-900 dark:text-white font-semibold">
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

            {expandedDifficulty === difficulty && (
              <div className="px-4 sm:px-6 py-4 space-y-4 bg-white dark:bg-slate-800">
                {lessonsByDifficulty.map((lesson, idx) => {
                  const status = getStatusStyle(lesson.status);
                  const shortContent =
                    lesson.content.split(" ").slice(0, 20).join(" ") +
                    (lesson.content.split(" ").length > 20 ? "…" : "");

                  return (
                    <div
                      key={lesson.id}
                      onClick={() =>
                        !status.disabled && onLessonClick?.(lesson.id)
                      }
                      className={`flex flex-col gap-4 p-4 sm:p-5 rounded-lg cursor-pointer border 
                      transition-all duration-300
                      ${
                        status.disabled
                          ? "opacity-60 cursor-not-allowed bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-slate-600"
                          : "bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-400"
                      }`}
                    >
                      {/* Header */}
                      <div className="flex items-start gap-3 sm:gap-4 flex-wrap">
                        <div
                          className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shadow-sm ${status.circle}`}
                        >
                          {getStatusIcon(lesson.status)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-gray-900 dark:text-white font-semibold text-base sm:text-lg truncate">
                            {idx + 1}.{" "}
                            {lesson.title.length > 50
                              ? lesson.title.slice(0, 50) + "…"
                              : lesson.title}
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-1">
                            {shortContent}
                          </p>
                        </div>

                        <span
                          className={`px-2 sm:px-3 py-1.5 rounded-full font-bold text-xs sm:text-sm shadow-sm whitespace-nowrap ${
                            status.disabled
                              ? "bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-300"
                              : status.circle.includes("green")
                              ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                              : status.circle.includes("blue")
                              ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                              : "bg-gray-100 dark:bg-slate-600 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {status.label}
                        </span>
                      </div>

                      {/* Meta + Progress */}
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-5 flex-wrap">
                        <div className="flex flex-wrap gap-4 items-center text-sm">
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <Clock className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                            <span>{lesson.readTime}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <HelpCircle className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                            <span>{lesson.questionCount} câu hỏi</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span>
                              {lesson.students?.toLocaleString("vi-VN")} học
                              viên
                            </span>
                          </div>
                        </div>

                        {/* Thanh tiến độ */}
                        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-48">
                          <span className="text-sm font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                            {lesson.progress || 0}%
                          </span>
                          <div className="relative flex-1 h-2.5 bg-gray-300 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
                                lesson.progress > 0
                                  ? "bg-blue-500 dark:bg-blue-400"
                                  : "bg-gray-400 dark:bg-slate-600"
                              }`}
                              style={{ width: `${lesson.progress || 0}%` }}
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
