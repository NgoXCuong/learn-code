import React from "react";
import { Crown, Flame, Search } from "lucide-react";
import { classNames, numberWithCommas } from "@/utils/utilsRanking";

export default function LeaderboardList({ paged, currentUser }) {
  return (
    <div className="relative group/list">
      {/* List Header - Desktop Only */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-5 text-sm font-semibold text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 backdrop-blur-md rounded-t-3xl border-x border-t">
        <div className="col-span-1">Hạng</div>
        <div className="col-span-5">Thành viên</div>
        <div className="col-span-2 text-center">Kinh nghiệm</div>
        <div className="col-span-2 text-center">Tiến độ</div>
        <div className="col-span-2 text-right">Thành tích</div>
      </div>

      <div className="bg-white/40 dark:bg-slate-900/20 backdrop-blur-xl border-x border-b rounded-b-3xl overflow-hidden">
        {paged.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400 dark:text-slate-600">
            <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
              <Search size={32} />
            </div>
            <p className="text-xl font-bold mb-1">Không thấy ai cả!</p>
            <p className="text-sm font-medium">Thử tìm kiếm với tên khác xem sao.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {paged.map((u) => {
              const isCurrentUser = currentUser?.id === u.id;
              const isTop3 = u.rank <= 3;

              return (
                <div
                  key={u.id}
                  className={classNames(
                    "group/row relative transition-all duration-300",
                    isCurrentUser 
                      ? "bg-indigo-50/50 dark:bg-indigo-900/20" 
                      : "hover:bg-slate-50 dark:hover:bg-white/5"
                  )}
                >
                  {/* Current User Indicator */}
                  {isCurrentUser && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
                  )}

                  {/* Desktop Row */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center px-8 py-5">
                    <div className="col-span-1 flex items-center gap-3">
                      <span className={classNames(
                        "text-lg font-bold tracking-tighter",
                        isTop3 ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-600"
                      )}>
                        {u.rank < 10 ? `0${u.rank}` : u.rank}
                      </span>
                    </div>

                    <div className="col-span-5 flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={u.avatarUrl}
                          alt={u.name}
                          className={classNames(
                            "w-12 h-12 rounded-full border-2 p-0.5 object-cover transition-transform duration-500 group-hover/row:scale-110",
                            isCurrentUser ? "border-indigo-500" : "border-slate-200 dark:border-slate-700"
                          )}
                        />
                        {u.streak > 0 && (
                          <div className="absolute -bottom-1 -right-1 bg-orange-500 text-white rounded-full p-1 border-2 border-white dark:border-slate-900 shadow-sm">
                            <Flame size={10} fill="currentColor" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <p className={classNames(
                          "font-bold text-base tracking-tight",
                          isCurrentUser ? "text-indigo-600 dark:text-indigo-400" : "text-slate-800 dark:text-slate-100"
                        )}>
                          {u.name}
                        </p>
                        <div className="flex items-center gap-2">
                          {isCurrentUser && (
                            <span className="text-[10px] font-bold text-indigo-500 bg-indigo-100 dark:bg-indigo-900/50 px-2 py-0.5 rounded-md">
                              Bạn
                            </span>
                          )}
                          <span className="text-[10px] font-medium text-slate-400">
                            {u.streak} ngày rực cháy
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold text-slate-900 dark:text-white">
                          {numberWithCommas(u.xp)}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">XP</span>
                      </div>
                    </div>

                    <div className="col-span-2 text-center">
                       <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                          {u.completed} bài học
                       </span>
                    </div>

                    <div className="col-span-2 text-right">
                       <div className="inline-flex items-center justify-center p-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 transition-colors group-hover/row:bg-indigo-500 group-hover/row:text-white">
                          <Crown size={16} />
                       </div>
                    </div>
                  </div>

                  {/* Mobile Row */}
                  <div className="md:hidden flex items-center gap-4 px-6 py-4">
                    <span className="w-8 font-bold text-slate-400">{u.rank}</span>
                    <img
                      src={u.avatarUrl}
                      alt={u.name}
                      className="w-10 h-10 rounded-full border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{u.name}</p>
                      <p className="text-xs font-medium text-slate-400">{numberWithCommas(u.xp)} XP</p>
                    </div>
                    <Flame size={14} className="text-orange-500" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
