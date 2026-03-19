import React from "react";
import { Crown, Flame } from "lucide-react";
import { classNames, numberWithCommas } from "@/utils/utilsRanking";

export default function LeaderboardList({ paged, currentUser }) {
  return (
    <div
      className="
        overflow-hidden rounded-xl border
        bg-white border-gray-100 shadow-sm
        dark:bg-gray-800 dark:border-gray-700
      "
    >
      {/* Header (Desktop) */}
      <div
        className="
          hidden md:grid grid-cols-10 gap-4 px-6 py-4 text-sm font-semibold
          text-gray-600 border-b border-gray-200 bg-gray-50
          dark:text-gray-300 dark:border-gray-700 dark:bg-gray-800
        "
      >
        <div className="col-span-1">Hạng</div>
        <div className="col-span-5">Người học</div>
        <div className="col-span-2">Kinh nghiệm</div>
        <div className="col-span-2">Hoàn thành</div>
      </div>

      {/* Không có kết quả */}
      {paged.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16
                     text-gray-700 dark:text-gray-400"
        >
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl font-medium">Không tìm thấy người học nào</p>
          <p className="text-base text-gray-400 dark:text-gray-500 mt-1">
            Thử thay đổi từ khóa tìm kiếm
          </p>
        </div>
      ) : (
        <>
          {paged.map((u, idx) => (
            <div
              key={u.id}
              className={classNames(
                "border-b border-gray-200 hover:bg-gray-50 transition-all duration-300",
                "dark:border-gray-700 dark:hover:bg-gray-800",
                currentUser?.id === u.id && "bg-indigo-50 dark:bg-indigo-900/30"
              )}
            >
              {/* Desktop */}
              <div className="hidden md:grid grid-cols-10 gap-4 items-center px-6 py-4">
                <div className="col-span-1 flex items-center gap-2">
                  <span className="font-bold text-base text-gray-900 dark:text-gray-100">
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
                    className="w-12 h-12 rounded-full border-2 border-gray-300"
                  />
                  <div>
                    <p className="font-semibold text-base text-gray-900 dark:text-gray-100">
                      {u.name}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      {u.streak > 0 && (
                        <span className="flex items-center gap-1 text-xs text-orange-500">
                          <Flame className="w-3 h-3" /> {u.streak} ngày
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-span-2 text-sm text-gray-900 dark:text-gray-200">
                  {numberWithCommas(u.xp)} XP
                </div>

                <div className="col-span-2 text-sm text-gray-700 dark:text-gray-300">
                  {u.completed} bài
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
                  className="w-12 h-12 rounded-full border-2 border-gray-300"
                />

                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                    {u.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {numberWithCommas(u.xp)} XP
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
            </div>
          ))}
        </>
      )}
    </div>
  );
}
