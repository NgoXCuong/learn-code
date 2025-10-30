import React from "react";
import { Card, CardContent } from "../ui/card";
import { Trophy, Flame, Crown, Medal } from "lucide-react";

const RANK_CONFIG = {
  1: {
    medal: "🥇",
    icon: Crown,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
  },
  2: {
    medal: "🥈",
    icon: Medal,
    color: "text-gray-400",
    bgColor: "bg-gray-50 dark:bg-gray-950/30",
  },
  3: {
    medal: "🥉",
    icon: Medal,
    color: "text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
  },
};

function RankBadge({ rank }) {
  const config = RANK_CONFIG[rank] || null;

  if (!config) {
    return (
      <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <span className="text-base font-bold text-gray-600 dark:text-gray-300">
          #{rank}
        </span>
      </div>
    );
  }

  const Icon = config.icon;
  return (
    <div
      className={`w-10 h-10 rounded-lg ${config.bgColor} flex items-center justify-center`}
    >
      <Icon className={`w-5 h-5 ${config.color}`} />
    </div>
  );
}

function LeaderboardRow({ user, currentUser, rank }) {
  const isCurrentUser = user.name === currentUser;
  const isTop3 = rank <= 3;
  const medal = RANK_CONFIG[rank]?.medal || "#";

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300
        ${
          isCurrentUser
            ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border-2 border-blue-400 dark:border-blue-600 shadow-md"
            : "bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md"
        }`}
    >
      {/* Rank & User Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <RankBadge rank={rank} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </span>
            {isCurrentUser && (
              <span className="inline-block px-2 py-1 text-sm font-semibold bg-blue-600 text-white rounded-full">
                Bạn
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <span>Xếp hạng</span>
            <span className="font-semibold">#{rank}</span>
          </div>
        </div>
      </div>

      {/* Score */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            {user.score}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">points</div>
        </div>

        {isTop3 && (
          <div className="flex items-center gap-1 px-3 py-1.5 bg-orange-100 dark:bg-orange-950/40 rounded-lg">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-orange-700 dark:text-orange-400">
              {rank === 1 ? "Top" : "Hot"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Leaderboard({ leaderboard, currentUser }) {
  const sortedLeaderboard = [...leaderboard].sort((a, b) => a.rank - b.rank);
  const topThree = sortedLeaderboard.slice(0, 3);
  const others = sortedLeaderboard.slice(3);

  return (
    <Card className="sticky top-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-7 h-7 text-yellow-500" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Bảng xếp hạng
            </h3>
          </div>
          <span className="text-base font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full">
            👑 Tuần này
          </span>
        </div>

        {/* Top 3 Section */}
        <div className="space-y-2">
          <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            🏆 Hạng nhất
          </div>
          <div className="space-y-2">
            {topThree.map((user) => (
              <LeaderboardRow
                key={user.rank}
                user={user}
                currentUser={currentUser}
                rank={user.rank}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

        {/* Others Section */}
        {others.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              📊 Xếp hạng của bạn
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {others.map((user) => (
                <LeaderboardRow
                  key={user.rank}
                  user={user}
                  currentUser={currentUser}
                  rank={user.rank}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
