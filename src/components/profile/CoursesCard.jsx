import React from "react";

export default function CoursesCard({ courses }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        🎓 Khóa học
      </h3>
      <ul className="space-y-4">
        {courses.map((c) => (
          <li key={c.id} className="flex flex-col">
            {/* 🔹 Tên khóa học nổi bật hơn */}
            <span className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-1">
              {c.name}
            </span>

            {/* 🔹 Thanh tiến trình có hiển thị phần trăm bên trong */}
            <div className="relative w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${c.progress}%` }}
              />
              <span className="absolute right-2 top-0 text-[11px] text-white font-medium leading-3 h-full flex items-center">
                {c.progress}%
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
