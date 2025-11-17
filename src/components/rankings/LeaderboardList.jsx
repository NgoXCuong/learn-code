import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Flame } from "lucide-react";
import {
  LEVEL_BORDERS,
  LEVEL_COLORS,
  classNames,
  numberWithCommas,
} from "@/utils/utilsRanking";

export default function LeaderboardList({ paged, currentUser }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="
        overflow-hidden rounded-lg border font-exo
        bg-white border-gray-300 shadow-xl
        dark:bg-gray-900 dark:border-gray-700
      "
    >
      {/* Header (Desktop) */}
      <div
        className="
          hidden md:grid grid-cols-12 o gap-4 px-6 py-4 text-sm font-bold 
          text-gray-600 border-b border-gray-200 bg-gray-50
          dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800
        "
      >
        <div className="col-span-1">Hạng</div>
        <div className="col-span-5">Người học</div>
        <div className="col-span-2">XP</div>
        <div className="col-span-2">Hoàn thành</div>
        <div className="col-span-2">Chính xác</div>
      </div>

      {/* Không có kết quả */}
      {paged.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-16 
                     text-gray-700 dark:text-gray-400"
        >
          <div className="text-9xl mb-4">🔍</div>
          <p className="text-xl font-medium">Không tìm thấy người học nào</p>
          <p className="text-base text-gray-400 dark:text-gray-500 mt-1">
            Thử thay đổi từ khóa tìm kiếm
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          {paged.map((u, idx) => (
            <motion.div
              key={u.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: idx * 0.05 }}
              className={classNames(
                "border-b border-gray-200 hover:bg-gray-50 transition-all duration-300",
                "dark:border-gray-700 dark:hover:bg-gray-800",
                currentUser?.id === u.id && "bg-indigo-50 dark:bg-indigo-900/30"
              )}
            >
              {/* Desktop */}
              <div className="hidden md:grid grid-cols-12 gap-4 items-center px-6 py-4">
                <div className="col-span-1 flex items-center gap-2">
                  <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                    #{u.rank}
                  </span>

                  {u.rank <= 3 && (
                    <Crown
                      className={classNames(
                        "w-5 h-5",
                        u.rank === 1 && "text-yellow-500",
                        u.rank === 2 && "text-gray-400",
                        u.rank === 3 && "text-amber-500"
                      )}
                    />
                  )}
                </div>

                <div className="col-span-5 flex items-center gap-4">
                  <img
                    src={u.avatarUrl}
                    alt={u.name}
                    className={classNames(
                      "w-12 h-12 rounded-full border-2",
                      LEVEL_BORDERS[u.level]
                    )}
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {u.name}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={classNames(
                          "text-xs px-2 py-0.5 rounded-full font-medium text-white bg-linear-to-r",
                          LEVEL_COLORS[u.level]
                        )}
                      >
                        {u.level}
                      </span>

                      {u.streak > 0 && (
                        <span className="flex items-center gap-1 text-xs text-orange-500">
                          <Flame className="w-3 h-3" /> {u.streak}d
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-span-2 font-bold text-gray-900 dark:text-gray-200">
                  {numberWithCommas(u.tfXp)}
                </div>

                <div className="col-span-2 text-gray-700 dark:text-gray-300">
                  {u.tfCompleted} bài
                </div>

                <div className="col-span-2 text-gray-700 dark:text-gray-300">
                  {u.accuracy}%
                </div>
              </div>

              {/* Mobile */}
              <div className="md:hidden flex items-center gap-4 px-4 py-4">
                <span className="font-bold text-gray-900 dark:text-gray-100 w-8">
                  #{u.rank}
                </span>

                <img
                  src={u.avatarUrl}
                  alt={u.name}
                  className={classNames(
                    "w-12 h-12 rounded-full border-2",
                    LEVEL_BORDERS[u.level]
                  )}
                />

                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {u.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {numberWithCommas(u.tfXp)} XP · {u.accuracy}%
                  </p>
                </div>

                {u.rank <= 3 && (
                  <Crown
                    className={classNames(
                      "w-5 h-5",
                      u.rank === 1 && "text-yellow-500",
                      u.rank === 2 && "text-gray-400",
                      u.rank === 3 && "text-amber-500"
                    )}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </motion.div>
  );
}
