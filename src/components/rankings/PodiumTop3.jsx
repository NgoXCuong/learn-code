import React from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Flame } from "lucide-react";
import {
  LEVEL_BORDERS,
  LEVEL_COLORS,
  classNames,
  numberWithCommas,
} from "@/utils/utilsRanking";

export default function PodiumTop3({ users }) {
  if (!users || users.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {users.map((u, idx) => (
        <motion.div
          key={u.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + idx * 0.1 }}
          className="
            relative overflow-hidden rounded-3xl border 
            border-gray-300 dark:border-gray-700 
            bg-white dark:bg-gray-900 
            shadow-xl hover:scale-105 
            transition-all duration-300
          "
        >
          {/* Background icon */}
          <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
            {idx === 0 && <Trophy className="w-full h-full text-yellow-500" />}
            {idx === 1 && <Medal className="w-full h-full text-gray-400" />}
            {idx === 2 && <Medal className="w-full h-full text-amber-600" />}
          </div>

          <div className="relative p-6">
            {/* Avatar + Rank */}
            <div className="flex flex-col items-center mb-4">
              <img
                src={u.avatarUrl}
                alt={u.name}
                className={classNames(
                  "w-20 h-20 rounded-full border-4 shadow-lg",
                  LEVEL_BORDERS[u.level]
                )}
              />

              <div
                className={classNames(
                  "text-4xl font-bold mt-4",
                  idx === 0 && "text-yellow-500",
                  idx === 1 && "text-gray-500",
                  idx === 2 && "text-amber-600"
                )}
              >
                #{u.rank}
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                {u.name}
              </h3>

              <span
                className={classNames(
                  "text-xs px-3 py-1 rounded-full font-semibold text-white mt-2 bg-linear-to-r",
                  LEVEL_COLORS[u.level]
                )}
              >
                {u.level}
              </span>
            </div>

            {/* Stats */}
            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-900 dark:text-gray-100">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="font-bold text-lg">
                  {numberWithCommas(u.tfXp)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  XP
                </span>
              </div>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>{u.tfCompleted} bài</span>
                <span>•</span>
                <span>{u.accuracy}% đúng</span>
              </div>

              {u.streak > 0 && (
                <div className="flex items-center justify-center gap-1 text-orange-500 dark:text-orange-400">
                  <Flame className="w-4 h-4" />
                  <span className="text-sm font-semibold">{u.streak} ngày</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
