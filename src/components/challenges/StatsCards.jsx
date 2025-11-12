import React from "react";

export const StatsCards = ({ totalParticipants, avgSuccess }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-1">
              Tổng người tham gia
            </p>
            <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {totalParticipants.toLocaleString()}
            </p>
          </div>
          <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-2xl">👥</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-1">
              Tỷ lệ thành công TB
            </p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {avgSuccess}%
            </p>
          </div>
          <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-2xl">🎯</span>
          </div>
        </div>
      </div>
    </div>
  );
};
