// src/components/courses/LessonList.jsx
import React from "react";
import { CheckCircle, PlayCircle, Lock } from "lucide-react";

export default function LessonList({ lessons, progressMap, onLessonClick }) {
  return (
    <ul className="space-y-5 animate-fade-in-left">
      {lessons.map((lesson, index) => {
        const progress = progressMap[lesson.id] || "not_started";
        const percent =
          progress === "completed" ? 100 : progress === "in_progress" ? 50 : 0;

        // icon & màu trạng thái
        const status = {
          completed: {
            label: "Hoàn thành",
            icon: <CheckCircle className="w-5 h-5 text-green-500" />,
            color: "bg-green-100 text-green-700 dark:bg-green-800/30",
          },
          in_progress: {
            label: "Đang học",
            icon: (
              <PlayCircle className="w-5 h-5 text-yellow-500 animate-pulse" />
            ),
            color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-800/30",
          },
          not_started: {
            label: "Chưa học",
            icon: <Lock className="w-5 h-5 text-gray-500" />,
            color: "bg-gray-200 text-gray-600 dark:bg-gray-700/40",
          },
        }[progress];

        return (
          <li
            key={lesson.id}
            onClick={() => onLessonClick(lesson.id)}
            className={`p-5 rounded-2xl cursor-pointer 
                        bg-white/70 dark:bg-gray-800/60 backdrop-blur-md
                        shadow-sm hover:shadow-xl transition-all duration-300
                        hover:-translate-y-1 hover:bg-blue-50/60 dark:hover:bg-gray-700/60
                        border border-gray-200 dark:border-gray-700
                        flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
                        animate-zoomIn`}
          >
            {/* 🔹 Số thứ tự */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <div
                className="w-12 h-12 flex items-center justify-center rounded-xl 
                              bg-gradient-to-br from-blue-500 to-indigo-600 
                              text-white font-bold text-lg shadow-inner"
              >
                {index + 1}
              </div>
            </div>

            {/* 🧠 Nội dung bài học */}
            <div className="flex-1 flex flex-col justify-center">
              <span className="font-bold text-lg text-gray-900 dark:text-white mb-1 hover:text-blue-600 transition-colors">
                {lesson.title}
              </span>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {lesson.content.split(" ").slice(0, 10).join(" ")}...
                <span className="text-blue-600 font-medium hover:underline ml-1">
                  Xem thêm
                </span>
              </p>
            </div>

            {/* 🎯 Trạng thái + Tiến độ */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:w-72 w-full">
              <div
                className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${status.color}`}
              >
                {status.icon}
                {status.label}
              </div>

              {/* Thanh tiến độ */}
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    percent === 100
                      ? "bg-gradient-to-r from-green-400 to-green-600"
                      : percent === 50
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600 animate-gradient-x"
                      : "bg-gradient-to-r from-gray-400 to-gray-500"
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 sm:w-10 text-right">
                {percent}%
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
