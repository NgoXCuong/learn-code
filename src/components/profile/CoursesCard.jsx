import React from "react";
import { Tooltip } from "react-tooltip";

export default function CoursesCard({ courses }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
        🎓 <span>Khóa học</span>
      </h3>

      <ul className="space-y-1">
        {courses.map((c) => (
          <li
            key={c.id}
            className="flex flex-col group p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
          >
            {/* 🔹 Tên khóa học + % cùng dòng */}
            <div className="flex items-center justify-between mb-1">
              <span
                data-tooltip-id={`tooltip-${c.id}`}
                className="text-base font-semibold text-gray-800 dark:text-gray-200 line-clamp-2"
              >
                {c.name}
              </span>
              <Tooltip id={`tooltip-${c.id}`} content={c.name} place="top" />

              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 ml-2 shrink-0">
                {c.progress}%
              </span>
            </div>

            {/* 🔹 Thanh tiến độ bên dưới */}
            <div className="relative w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-3 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${c.progress}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
