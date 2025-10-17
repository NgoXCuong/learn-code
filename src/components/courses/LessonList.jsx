// src/components/lessons/LessonList.jsx
import React from "react";
import { Check, Play, HelpCircle, Clock, Star, Lock } from "lucide-react";

export default function LessonList({ lessons = [], onLessonClick }) {
  const getDifficultyColor = (difficulty) => {
    const colors = {
      "Cơ bản":
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
      "Trung bình":
        "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
      "Nâng cao":
        "bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300",
    };
    return colors[difficulty] || colors["Cơ bản"];
  };

  const getStatusStyle = (progress) => {
    if (progress >= 100)
      return {
        circle: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25",
        bar: "bg-emerald-500",
        btn: "bg-emerald-500 hover:bg-emerald-600 text-white",
        label: "Hoàn thành",
        bg: "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/30",
      };
    if (progress > 0)
      return {
        circle:
          "bg-blue-500 text-white shadow-lg shadow-blue-500/25 animate-pulse",
        bar: "bg-blue-500",
        btn: "bg-blue-500 hover:bg-blue-600 text-white",
        label: "Tiếp tục",
        bg: "bg-blue-50/40 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/30",
      };
    return {
      circle: "bg-gray-400 text-white shadow-lg shadow-gray-400/25",
      bar: "bg-gray-300",
      btn: "bg-indigo-500 hover:bg-indigo-600 text-white",
      label: "Bắt đầu",
      bg: "bg-gray-50/40 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700/30",
    };
  };

  const getStatusIcon = (progress) => {
    if (progress >= 100) return <Check className="w-5 h-5" strokeWidth={3} />;
    if (progress > 0) return <Play className="w-5 h-5" strokeWidth={2} />;
    return <Lock className="w-5 h-5" strokeWidth={2} />;
  };

  return (
    <div className="space-y-2.5">
      {lessons.map((lesson) => {
        const progress = lesson.progress ?? 0;
        const status = getStatusStyle(progress);

        return (
          <div
            key={lesson.id}
            onClick={() => onLessonClick?.(lesson.id)}
            className={`group p-4 rounded-lg border-2 cursor-pointer ${status.bg} backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700/50`}
          >
            <div className="flex gap-3 items-start">
              {/* Status Circle */}
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-bold ${status.circle}`}
              >
                {getStatusIcon(progress)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Title + Difficulty */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition line-clamp-1">
                    {lesson.title}
                  </h3>
                  <span
                    className={`flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-md whitespace-nowrap ${getDifficultyColor(
                      lesson.difficulty
                    )}`}
                  >
                    {lesson.difficulty}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1 mb-2">
                  {lesson.content}
                </p>

                {/* Info Row */}
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-md">
                      <Clock className="w-3 h-3" />
                      {lesson.readTime}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-md">
                      <HelpCircle className="w-3 h-3" />
                      {lesson.questionCount} câu
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-md">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {lesson.students.toLocaleString()}
                    </span>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLessonClick?.(lesson.id);
                    }}
                    className={`flex-shrink-0 px-4 py-2 text-sm font-bold rounded-lg transition ${status.btn}`}
                  >
                    {status.label}
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${status.bar}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 w-10 text-right">
                    {progress}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
