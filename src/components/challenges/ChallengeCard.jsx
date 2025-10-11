// src/components/challenges/ChallengeCard.jsx
import React from "react";
import { Flame, Clock, Award } from "lucide-react";

export default function ChallengeCard({ challenge }) {
  return (
    <div
      className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 
                    bg-white dark:bg-gray-800 hover:shadow-lg hover:-translate-y-1 
                    transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {challenge.title}
        </h3>
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            challenge.difficulty === "Dễ"
              ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
              : challenge.difficulty === "Trung bình"
              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
              : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
          }`}
        >
          {challenge.difficulty}
        </span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {challenge.description}
      </p>

      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-3">
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>{challenge.participants} người tham gia</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4 text-yellow-500" />
            <span>{challenge.rewards} XP</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4 text-blue-500" />
          <span>Còn {challenge.remainingDays} ngày</span>
        </div>
      </div>
    </div>
  );
}
