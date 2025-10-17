import React, { useState } from "react";
import { Award } from "lucide-react";

export default function BadgesCard({ badges }) {
  const [hoveredBadge, setHoveredBadge] = useState(null);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          Huy hiệu
        </h3>
        <span className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
          {badges.length} huy hiệu
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {badges.map((b) => (
          <div
            key={b.id}
            onMouseEnter={() => setHoveredBadge(b.id)}
            onMouseLeave={() => setHoveredBadge(null)}
            className="relative group"
          >
            <div className="relative p-4 rounded-2xl bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-yellow-800/20 border-2 border-yellow-200 dark:border-yellow-800 hover:border-yellow-400 dark:hover:border-yellow-600 transition-all duration-300 cursor-pointer overflow-hidden">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              {/* Badge icon */}
              <div className="relative flex flex-col items-center">
                <div className="w-16 h-16 mb-2 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{b.icon}</span>
                </div>
                <p className="text-sm font-bold text-gray-800 dark:text-white text-center">
                  {b.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {b.date}
                </p>
              </div>

              {/* Glow effect */}
              {hoveredBadge === b.id && (
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl opacity-30 blur-xl animate-pulse" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
