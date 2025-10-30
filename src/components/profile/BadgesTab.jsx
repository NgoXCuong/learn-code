import React from "react";
import { Calendar } from "lucide-react";
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

export default function BadgesTab() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Bộ sưu tập huy hiệu
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`relative group ${!badge.date && "opacity-50"}`}
          >
            <div
              className={`bg-gradient-to-br ${getRarityColor(
                badge.rarity
              )} rounded-2xl p-6 text-center transition-all hover:scale-105 cursor-pointer shadow-lg`}
            >
              <div className="text-6xl mb-3">{badge.icon}</div>
              <div className="text-white font-bold text-xl mb-1">
                {badge.name}
              </div>
              <div className="text-white/80 text-sm uppercase tracking-wider">
                {badge.rarity}
              </div>
            </div>
            <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 z-10">
              <div className="bg-gray-900 text-white text-base rounded-lg p-4 shadow-2xl">
                <p className="font-semibold mb-2">{badge.desc}</p>
                {badge.date ? (
                  <p className="text-gray-300 text-sm flex items-center">
                    <Calendar size={12} className="mr-1" />
                    Đạt được: {badge.date}
                  </p>
                ) : (
                  <p className="text-yellow-400 text-sm">
                    🔒 Tiếp tục cố gắng để mở khóa!
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
