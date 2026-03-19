import React from "react";
import { Trophy, Medal, Flame, Crown } from "lucide-react";
import { classNames, numberWithCommas } from "@/utils/utilsRanking";

export default function PodiumTop3({ users }) {
  if (!users || users.length === 0) return null;

  // Reorder for 2-1-3 layout: [Second, First, Third]
  const podiumOrder = [
    users[1] || null,
    users[0] || null,
    users[2] || null
  ].filter(u => u !== null);

  const getRankTheme = (rank) => {
    switch (rank) {
      case 1:
        return {
          border: "border-amber-400 dark:border-amber-500/50",
          bg: "bg-amber-50/50 dark:bg-amber-900/10",
          shadow: "shadow-[0_0_50px_rgba(251,191,36,0.15)]",
          text: "text-amber-600 dark:text-amber-400",
          medal: "bg-linear-to-br from-amber-300 to-amber-500",
          crown: true
        };
      case 2:
        return {
          border: "border-slate-300 dark:border-slate-500/50",
          bg: "bg-slate-50/50 dark:bg-slate-800/20",
          shadow: "shadow-[0_0_40px_rgba(148,163,184,0.1)]",
          text: "text-slate-600 dark:text-slate-400",
          medal: "bg-linear-to-br from-slate-200 to-slate-400",
          crown: false
        };
      case 3:
        return {
          border: "border-orange-300 dark:border-orange-500/50",
          bg: "bg-orange-50/50 dark:bg-orange-900/10",
          shadow: "shadow-[0_0_30px_rgba(249,115,22,0.1)]",
          text: "text-orange-600 dark:text-orange-400",
          medal: "bg-linear-to-br from-orange-300 to-orange-500",
          crown: false
        };
      default:
        return {};
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8 mb-16 px-4">
      {podiumOrder.map((u) => {
        const theme = getRankTheme(u.rank);
        const isFirst = u.rank === 1;

        return (
          <div
            key={u.id}
            className={classNames(
              "relative flex flex-col items-center w-full md:w-72 transition-all duration-500 hover:scale-[1.02]",
              isFirst ? "order-2 z-20" : u.rank === 2 ? "order-1" : "order-3"
            )}
          >
            {/* Crown for 1st */}
            {theme.crown && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 animate-bounce">
                <Crown size={40} className="text-amber-400 drop-shadow-lg" />
              </div>
            )}

            {/* Avatar Section */}
            <div className="relative mb-6">
              <div className={classNames(
                "relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full p-1 border-4 overflow-hidden shadow-2xl transition-transform duration-700 hover:rotate-6",
                theme.border
              )}>
                <img
                  src={u.avatarUrl}
                  alt={u.name}
                  className="w-full h-full rounded-full object-cover bg-white"
                />
              </div>

              {/* Rank Medal */}
              <div className={classNames(
                "absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-xl",
                theme.medal
              )}>
                {u.rank}
              </div>
            </div>

            {/* User Card */}
            <div className={classNames(
              "w-full text-center p-6 rounded-3xl border backdrop-blur-xl transition-all duration-500",
              theme.border,
              theme.bg,
              theme.shadow,
              isFirst ? "md:min-h-[220px] pt-10 mt-[-40px]" : "md:min-h-[180px]"
            )}>
              <div className="mb-4">
                <h3 className={classNames("text-xl font-semibold truncate px-2", theme.text)}>
                  {u.name}
                </h3>
              </div>

              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 dark:bg-black/20 border border-white/50 dark:border-white/10 shadow-sm transition-all duration-300 hover:bg-white/60">
                  <Flame size={16} className="text-orange-500" />
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    {u.streak} ngày
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-center gap-1.5">
                    <Trophy size={16} className="text-amber-500" />
                    <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {numberWithCommas(u.xp)}
                    </span>
                    <span className="text-sm font-medium text-gray-400">XP</span>
                  </div>
                  <p className="text-xs font-medium text-gray-400 dark:text-gray-500">
                    {u.completed} bài tập
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
