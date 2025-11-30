import React from "react";
import { Trophy, Medal, Flame } from "lucide-react";
import { classNames, numberWithCommas } from "@/utils/utilsRanking";

export default function PodiumTop3({ users }) {
  if (!users || users.length === 0) return null;

  return (
    <div className="grid grid-cols-1   md:grid-cols-3 gap-6 mb-8">
      {users.map((u, idx) => (
        <div
          key={u.id}
          className="btn-shimmer relative overflow-hidden rounded-xl border
    border-gray-300 dark:border-gray-700
    bg-white dark:bg-gray-900
    shadow-xl hover:scale-105
    transition-all duration-300"
        >
          {/* Streak top-left */}
          {u.streak > 0 && (
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-orange-500 dark:bg-orange-400 text-white text-sm font-semibold px-2 py-1 rounded-full shadow-md z-10">
              <Flame className="w-3 h-3" />
              <span>{u.streak} ngày</span>
            </div>
          )}

          {/* Background icon */}
          <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
            {idx === 0 && <Trophy className="w-full h-full text-yellow-500" />}
            {idx === 1 && <Medal className="w-full h-full text-gray-400" />}
            {idx === 2 && <Medal className="w-full h-full text-amber-600" />}
          </div>

          <div className="relative p-6">
            {/* Avatar + Rank + Name */}
            <div className="flex flex-col items-center mb-4">
              <img
                src={u.avatarUrl}
                alt={u.name}
                className="w-20 h-20 rounded-full border-4 border-gray-300 shadow-lg"
              />

              <div
                className={classNames(
                  "flex items-center gap-2 font-bold mt-4 text-gray-900 dark:text-gray-100",
                  idx === 0 && "text-yellow-500",
                  idx === 1 && "text-gray-500",
                  idx === 2 && "text-amber-600"
                )}
              >
                <span className="text-xl">#{u.rank}</span>
                <span className="text-xl font-bold">{u.name}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-900 dark:text-gray-100">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="font-bold text-base">
                  {numberWithCommas(u.tfXp)}
                </span>
                <span className="text-base text-gray-500 dark:text-gray-400">
                  XP
                </span>
              </div>

              <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
                <span>{u.tfCompleted} bài tập</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
