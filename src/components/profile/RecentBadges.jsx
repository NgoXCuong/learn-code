import React from "react";
import { Award, Calendar } from "lucide-react";

const getRarityColor = (rarity) => {
  const colors = {
    common: "from-gray-400 to-gray-500",
    rare: "from-blue-400 to-blue-600",
    epic: "from-purple-400 to-purple-600",
    legendary: "from-yellow-400 to-orange-500",
  };
  return colors[rarity] || colors.common;
};

export default function RecentBadges({ badges = [] }) {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 h-full shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
          <Award className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          Huy hiệu gần đây
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {badges.slice(0, 4).map((badge) => (
          <div
            key={badge.id}
            className={`relative group h-full ${!badge.date ? "opacity-40" : ""}`}
          >
            <div
              className={`h-full bg-linear-to-br ${getRarityColor(
                badge.rarity
              )} rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-lg shadow-sm border border-white/20`}
            >
              <div className="text-4xl mb-3 drop-shadow-md group-hover:rotate-12 transition-transform">
                {badge.icon}
              </div>
              <div className="text-white font-bold text-sm sm:text-base leading-tight">
                {badge.name}
              </div>
              {badge.date && (
                <div className="mt-2 text-[10px] text-white/70 font-medium px-2 py-0.5 rounded-full bg-black/10">
                  {badge.date}
                </div>
              )}
            </div>

            {/* Tooltip - Modernized */}
            <div className="absolute opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-48 z-20">
              <div className="bg-gray-900/95 dark:bg-gray-800/95 backdrop-blur-md text-white text-xs rounded-xl p-3 shadow-2xl border border-white/10">
                <p className="font-bold text-sm mb-1 text-amber-400">
                  {badge.name}
                </p>
                <p className="text-gray-300 leading-relaxed">{badge.desc}</p>
                {!badge.date && (
                  <p className="text-yellow-400 mt-2 font-semibold">
                    🔒 Chưa mở khóa
                  </p>
                )}
              </div>
              {/* Arrow */}
              <div className="w-3 h-3 bg-gray-900/95 dark:bg-gray-800/95 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
