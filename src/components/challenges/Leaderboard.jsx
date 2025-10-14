import React from "react";
import { Card, CardContent } from "../ui/card";
import { Trophy, Star, Flame } from "lucide-react";

export default function Leaderboard({ leaderboard, currentUser }) {
  return (
    <Card className="sticky top-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
      <CardContent className="p-5">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-5 flex items-center">
          <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
          Bảng xếp hạng
        </h3>

        <ul className="space-y-3">
          {leaderboard.map((user) => (
            <li
              key={user.rank}
              className={`flex items-center justify-between p-3 rounded-lg transition-all 
                ${
                  user.name === currentUser
                    ? "bg-blue-100 dark:bg-blue-900/40 border border-blue-300 dark:border-blue-700"
                    : "bg-gray-100 dark:bg-gray-700/60 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
            >
              <div className="flex items-center space-x-3">
                {user.rank <= 3 ? (
                  <Star
                    className={`w-4 h-4 ${
                      user.rank === 1
                        ? "text-yellow-400"
                        : user.rank === 2
                        ? "text-gray-400"
                        : "text-yellow-900"
                    }`}
                  />
                ) : (
                  <span className="w-4" />
                )}
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  #{user.rank}
                </span>
                <span className="font-medium text-gray-800 dark:text-gray-100 flex items-center gap-1">
                  {user.name}
                  {user.name === currentUser && (
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                      (Bạn)
                    </span>
                  )}
                </span>
              </div>
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                {user.score} XP
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
