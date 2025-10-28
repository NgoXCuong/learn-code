// ============================================
// FILE: src/components/challenges/BadgesSection.jsx
// ============================================
import React, { useState } from "react";
import { Award, ChevronDown, ChevronUp } from "lucide-react";

export const BadgesSection = ({ badges }) => {
  const [expanded, setExpanded] = useState(false);
  const displayBadges = expanded ? badges : badges.slice(0, 3);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Award className="w-6 h-6 text-yellow-500" />
        Huy hiệu ({badges.filter((b) => b.unlocked).length}/{badges.length})
      </h3>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {displayBadges.map((badge) => (
          <div
            key={badge.id}
            className={`relative group ${badge.unlocked ? "" : "opacity-40"}`}
          >
            <div
              className={`text-4xl mb-2 transform transition-transform group-hover:scale-110 ${
                badge.unlocked ? "" : "grayscale"
              }`}
            >
              {badge.icon}
            </div>
            <p className="text-xs text-center text-gray-700 dark:text-gray-300 font-medium">
              {badge.name}
            </p>
            {!badge.unlocked && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl">🔒</div>
              </div>
            )}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
              {badge.description}
            </div>
          </div>
        ))}
      </div>

      {badges.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center justify-center gap-1"
        >
          {expanded ? (
            <>
              Ẩn bớt <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Xem thêm <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
};
