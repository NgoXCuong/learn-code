import React from "react";
import { Trophy, ChevronUp, ChevronDown } from "lucide-react";

export const LeaderboardPanel = ({ leaderboard, currentUser }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-500" />
        Bảng xếp hạng
      </h3>

      <div className="space-y-2">
        {leaderboard.map((user) => {
          const isCurrentUser = user.name === currentUser;
          const rankColors = {
            1: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white",
            2: "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900",
            3: "bg-gradient-to-r from-orange-400 to-orange-600 text-white",
          };

          return (
            <div
              key={user.rank}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                isCurrentUser
                  ? "bg-indigo-50 dark:bg-indigo-900/30 border-2 border-indigo-400 dark:border-indigo-600"
                  : "bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-base ${
                  rankColors[user.rank] ||
                  "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                }`}
              >
                {user.rank}
              </div>

              <div className="text-2xl">{user.avatar}</div>

              <div className="flex-1 min-w-0">
                <p
                  className={`font-semibold truncate ${
                    isCurrentUser
                      ? "text-indigo-700 dark:text-indigo-300"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {user.name}
                  {isCurrentUser && <span className="ml-2 text-sm">(Bạn)</span>}
                </p>
                <p className="text-base text-gray-600 dark:text-gray-400">
                  {user.score.toLocaleString()} điểm
                </p>
              </div>

              {user.change !== 0 && (
                <div
                  className={`flex items-center gap-1 text-base font-medium ${
                    user.change > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {user.change > 0 ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  {Math.abs(user.change)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
