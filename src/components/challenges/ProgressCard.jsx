import React from "react";
import { Flame, Trophy } from "lucide-react";

export const ProgressCard = ({ userData }) => {
  const xpPercentage = Math.min(
    (userData.xp / userData.xpToNextLevel) * 100,
    100
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-md transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            {userData.name}
          </h3>
          <p className="text-base text-gray-500 dark:text-gray-400">
            Level {userData.level}
          </p>
        </div>
        <div className="text-4xl">😎</div>
      </div>

      <div className="mb-5">
        <div className="flex justify-between text-base mb-2 text-gray-600 dark:text-gray-300">
          <span>Tiến trình XP</span>
          <span className="font-semibold">
            {userData.xp} / {userData.xpToNextLevel}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              xpPercentage >= 100 ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{ width: `${xpPercentage}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700/40 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-base text-gray-800 dark:text-gray-200">
              Chuỗi ngày học
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {userData.streak} ngày
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Dài nhất: {userData.longestStreak}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/40 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-base text-gray-800 dark:text-gray-200">
              Điểm tích lũy
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {userData.totalPoints}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tổng tích lũy
          </p>
        </div>
      </div>
    </div>
  );
};
