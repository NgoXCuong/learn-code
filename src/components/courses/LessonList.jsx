// src/components/courses/LessonList.jsx
import React from "react";
import { Check, Play, FileText, HelpCircle, Clock } from "lucide-react";

export default function LessonList({ lessons, progressMap, onLessonClick }) {
  return (
    <div className="space-y-4">
      {lessons.map((lesson, index) => {
        const progress = progressMap[lesson.id] || "not_started";
        const percent =
          progress === "completed" ? 100 : progress === "in_progress" ? 50 : 0;

        // 🎯 Trạng thái vòng tròn
        const circleStyle = {
          completed:
            "bg-green-500 text-white border-green-500 shadow-md shadow-green-200",
          in_progress:
            "bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-200 animate-pulse-slow",
          not_started:
            "bg-gray-200 text-gray-600 border-gray-300 dark:bg-gray-700 dark:text-gray-400",
        }[progress];

        const cardHighlight =
          progress === "in_progress"
            ? "border-blue-500/60 bg-blue-50/70 dark:bg-blue-900/10"
            : "border-transparent";

        return (
          <div
            key={lesson.id}
            onClick={() => onLessonClick(lesson.id)}
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 
                        p-5 rounded-2xl border cursor-pointer
                        bg-white/70 dark:bg-gray-800/60 backdrop-blur-md
                        hover:shadow-lg hover:-translate-y-1 transition-all duration-300
                        ${cardHighlight}`}
          >
            {/* 🔘 Vòng tròn trạng thái */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-bold text-lg transition-all duration-300 ${circleStyle}`}
              >
                {progress === "completed" ? (
                  <Check className="w-6 h-6" />
                ) : (
                  index + 1
                )}
              </div>

              {/* 🧠 Nội dung bài học */}
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {lesson.content
                    ? lesson.content.split(" ").slice(0, 15).join(" ")
                    : "Không có mô tả"}
                  {lesson.content?.split(" ").length > 15 && (
                    <button
                      onClick={() => onLessonClick(lesson.id)}
                      className="text-blue-600 font-medium hover:underline ml-1 focus:outline-none"
                    >
                      ... Xem thêm
                    </button>
                  )}
                </p>

                {/* 📊 Metadata */}
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />{" "}
                    {lesson.readTime || "10 phút đọc"}
                  </span>
                  <span className="flex items-center gap-1">
                    <HelpCircle className="w-4 h-4" />{" "}
                    {lesson.questionCount || "5 câu hỏi"}
                  </span>
                </div>
              </div>
            </div>

            {/* 📈 Trạng thái tiến độ */}
            <div className="flex flex-col items-end sm:items-center sm:flex-row gap-3 w-full sm:w-64">
              {/* 🎯 ĐÃ HOÀN THÀNH */}
              {progress === "completed" && (
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-green-600 font-medium text-sm">
                      Đã hoàn thành
                    </span>
                    <span className="text-xs text-gray-500">100%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              )}

              {/* 🟡 ĐANG HỌC */}
              {progress === "in_progress" && (
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-yellow-600 font-medium text-sm">
                      Đang học
                    </span>
                    <span className="text-xs text-gray-500">{percent}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full transition-all duration-500 animate-pulse"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* ⚪ CHƯA HỌC */}
              {progress === "not_started" && (
                <button
                  onClick={() => onLessonClick(lesson.id)}
                  className="px-5 py-2.5 text-sm font-semibold text-white 
    bg-gradient-to-r from-blue-500 to-indigo-500 
    hover:from-blue-400 hover:to-indigo-400 
    dark:from-blue-600 dark:to-indigo-600
    dark:hover:from-blue-500 dark:hover:to-indigo-500
    rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  🚀 Bắt đầu
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
