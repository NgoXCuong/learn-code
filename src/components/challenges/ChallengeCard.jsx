import React from "react";
import { Card, CardContent } from "../ui/card";
import { Users, Target, Flame, ArrowRight, Zap } from "lucide-react";
import { Button } from "../ui/button";

const DIFFICULTY_CONFIG = {
  Dễ: {
    color: "bg-emerald-100 text-emerald-700 border-emerald-300",
    icon: "✨",
    level: 1,
  },
  "Trung bình": {
    color: "bg-amber-100 text-amber-700 border-amber-300",
    icon: "⚡",
    level: 2,
  },
  Khó: {
    color: "bg-rose-100 text-rose-700 border-rose-300",
    icon: "🔥",
    level: 3,
  },
};

function DifficultyBadge({ difficulty }) {
  const config = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.Dễ;
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs border ${config.color}`}
    >
      <span>{config.icon}</span>
      {difficulty}
    </div>
  );
}

function StatItem({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className={`w-4 h-4 ${color}`} />
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {label}
        </span>
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {value}
        </span>
      </div>
    </div>
  );
}

export default function ChallengeCard({ challenge, onClick }) {
  const { title, difficulty, description, participants, successRate, points } =
    challenge;

  const handleClick = () => {
    onClick?.(challenge);
  };

  return (
    <Card
      className="relative border border-gray-200 dark:border-gray-700 
                 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400 dark:hover:border-blue-500
                 transition-all duration-300 rounded-xl bg-white dark:bg-gray-800 group cursor-pointer overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:to-purple-50/50 dark:group-hover:from-blue-950/30 dark:group-hover:to-purple-950/30 transition-all duration-300 pointer-events-none" />

      <CardContent className="p-6 space-y-4 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {title}
            </h3>
          </div>
          <DifficultyBadge difficulty={difficulty} />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 py-3 px-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <StatItem
            icon={Users}
            label="Tham gia"
            value={`${participants}`}
            color="text-blue-500"
          />
          <StatItem
            icon={Target}
            label="Thành công"
            value={`${successRate}%`}
            color="text-emerald-500"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-orange-700 dark:text-orange-400">
              +{points}
            </span>
          </div>

          <Button
            onClick={handleClick}
            className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 
                      bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                      text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200
                      group/btn"
          >
            Thử sức
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
