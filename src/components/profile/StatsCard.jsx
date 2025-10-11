import React from "react";

export default function StatsCard({ stats }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        📊 Thống kê
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {/* 🔹 Bài học */}
        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/40">
          <p className="text-3xl font-extrabold text-indigo-600">
            {stats.lessonsDone}
          </p>
          <p className="text-base font-medium text-gray-700 dark:text-gray-300 mt-1">
            Bài học
          </p>
        </div>

        {/* 🔹 Dòng code */}
        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/40">
          <p className="text-3xl font-extrabold text-indigo-600">
            {stats.codeLines}
          </p>
          <p className="text-base font-medium text-gray-700 dark:text-gray-300 mt-1">
            Dòng code
          </p>
        </div>

        {/* 🔹 Khóa học */}
        <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/40">
          <p className="text-3xl font-extrabold text-indigo-600">
            {stats.coursesJoined}
          </p>
          <p className="text-base font-medium text-gray-700 dark:text-gray-300 mt-1">
            Khóa học
          </p>
        </div>
      </div>
    </div>
  );
}
