import React from "react";
import { Award, Calendar } from "lucide-react";
import { badges } from "@/mock/profile";

const getRarityColor = (rarity) => {
  const colors = {
    common: "from-gray-400 to-gray-500",
    rare: "from-blue-400 to-blue-600",
    epic: "from-purple-400 to-purple-600",
    legendary: "from-yellow-400 to-orange-500",
  };
  return colors[rarity] || colors.common;
};

export default function RecentBadges() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <Award className="mr-2 text-yellow-500" size={24} />
        Huy hiệu gần đây
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {badges.slice(0, 4).map((badge) => (
          <div
            key={badge.id}
            className={`relative group ${!badge.date && "opacity-40"}`}
          >
            <div
              className={`bg-gradient-to-br ${getRarityColor(
                badge.rarity
              )} rounded-xl p-4 text-center transition-all hover:scale-105 cursor-pointer`}
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <div className="text-white font-bold text-base">{badge.name}</div>
            </div>
            {/* Tooltip */}
            <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 z-10">
              <div className="bg-gray-900 text-white text-sm rounded-lg p-3 shadow-xl">
                <p className="font-semibold mb-1">{badge.desc}</p>
                {badge.date ? (
                  <p className="text-gray-300">{badge.date}</p>
                ) : (
                  <p className="text-yellow-400">🔒 Chưa mở khóa</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
