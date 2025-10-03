// src/components/courses/LessonList.jsx
import React from "react";

export default function LessonList({ lessons, progressMap, onLessonClick }) {
  return (
    <ul className="space-y-4">
      {lessons.map((lesson, index) => {
        const progress = progressMap[lesson.id] || "not_started";

        // % tiến độ
        const percent =
          progress === "completed" ? 100 : progress === "in_progress" ? 50 : 0;

        return (
          <li
            key={lesson.id}
            onClick={() => onLessonClick(lesson.id)}
            className="p-5 rounded-xl cursor-pointer 
                       bg-white dark:bg-gray-800 shadow-sm hover:shadow-md 
                       transition border border-gray-100 dark:border-gray-700
                       flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            {/* Cột trái: số thứ tự */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <div
                className="w-10 h-10 flex items-center justify-center 
                              rounded-full bg-blue-600 text-white font-bold text-lg"
              >
                {index + 1}
              </div>
            </div>

            {/* Cột giữa: title + mô tả */}
            <div className="flex-1 flex flex-col justify-center">
              <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                {lesson.title}
              </span>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 line-clamp-2">
                Đây là nội dung mô tả ngắn gọn của bài học.{" "}
                <span className="text-blue-600 hover:underline">Xem thêm</span>
              </p>
            </div>

            {/* Cột phải: trạng thái + progress */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:w-80 w-full">
              <span
                className={`text-sm px-3 py-1 rounded-full text-center ${
                  progress === "completed"
                    ? "bg-green-100 text-green-700"
                    : progress === "in_progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {progress === "completed"
                  ? "Hoàn thành"
                  : progress === "in_progress"
                  ? "Đang học"
                  : "Chưa học"}
              </span>

              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    percent === 100
                      ? "bg-green-500"
                      : percent === 50
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:w-10 text-right">
                {percent}%
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
