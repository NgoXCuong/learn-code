// ============================================
// FILE: src/components/challenges/ProgressCard.jsx
// ============================================
import React from "react";
import { Flame, Trophy } from "lucide-react";

export const ProgressCard = ({ userData }) => {
  const xpPercentage = (userData.xp / userData.xpToNextLevel) * 100;

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold">{userData.name}</h3>
          <p className="text-indigo-200">Level {userData.level}</p>
        </div>
        <div className="text-4xl">😎</div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span>XP Progress</span>
          <span className="font-semibold">
            {userData.xp} / {userData.xpToNextLevel}
          </span>
        </div>
        <div className="w-full bg-indigo-800 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${xpPercentage}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="text-sm">Streak</span>
          </div>
          <p className="text-2xl font-bold">{userData.streak} ngày</p>
          <p className="text-xs text-indigo-200">
            Dài nhất: {userData.longestStreak}
          </p>
        </div>
        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-sm">Điểm</span>
          </div>
          <p className="text-2xl font-bold">{userData.totalPoints}</p>
          <p className="text-xs text-indigo-200">Tổng tích lũy</p>
        </div>
      </div>
    </div>
  );
};
