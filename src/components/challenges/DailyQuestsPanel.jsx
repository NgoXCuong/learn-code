// ============================================
// FILE: src/components/challenges/DailyQuestsPanel.jsx
// ============================================
import React from "react";
import { Calendar, CheckCircle2 } from "lucide-react";

export const DailyQuestsPanel = ({ quests }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Calendar className="w-6 h-6 text-blue-500" />
        Nhiệm vụ hàng ngày
      </h3>

      <div className="space-y-3">
        {quests.map((quest) => (
          <div
            key={quest.id}
            className={`p-4 rounded-lg border-2 transition-all ${
              quest.completed
                ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700"
                : "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white text-sm">
                  {quest.title}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Phần thưởng:{" "}
                  <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
                    +{quest.reward} XP
                  </span>
                </p>
              </div>
              {quest.completed && (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              )}
            </div>

            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600 dark:text-gray-400">
                  Tiến độ: {quest.progress}/{quest.target}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {Math.round((quest.progress / quest.target) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className={`h-full rounded-full transition-all ${
                    quest.completed ? "bg-green-500" : "bg-blue-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      (quest.progress / quest.target) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
