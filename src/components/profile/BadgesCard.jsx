import React from "react";

export default function BadgesCard({ badges }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        🏅 Huy hiệu
      </h3>
      <div className="flex flex-wrap gap-4">
        {badges.map((b) => (
          <div
            key={b.id}
            className="relative flex items-center space-x-3 bg-gradient-to-br from-yellow-100 via-white to-yellow-50 
                       dark:from-indigo-950 dark:via-indigo-900 dark:to-indigo-800 
                       text-gray-800 dark:text-white px-4 py-3 rounded-2xl shadow-md border border-yellow-200 dark:border-indigo-700
                       hover:scale-[1.03] transition-transform duration-300"
          >
            {/* 🔹 Icon Huy hiệu - hình tròn nổi bật */}
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-indigo-600 dark:to-indigo-400 text-white text-2xl shadow-inner">
              {b.icon}
            </div>

            {/* 🔹 Thông tin Huy hiệu */}
            <div>
              <p className="text-sm font-semibold">{b.name}</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                {b.date}
              </p>
            </div>

            {/* 🌟 Hiệu ứng ánh sáng nhỏ */}
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-yellow-300 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
