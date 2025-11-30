import React from "react";
import { BookOpen, Code, Target, TrendingUp } from "lucide-react";
import StatsGrid from "@/components/ui/stats-grid";

export default function StatsCards({ stats }) {
  // Default stats if not provided
  const defaultStats = {
    lessonsDone: 0,
    exercisesSolved: 0,
    challengesCompleted: 0,
    rank: 0,
  };

  const currentStats = stats || defaultStats;

  const statsData = [
    {
      icon: BookOpen,
      color: "text-blue-500",
      value: currentStats.lessonsDone,
      label: "Bài học",
    },
    {
      icon: Code,
      color: "text-green-500",
      value: currentStats.exercisesSolved,
      label: "Bài tập",
    },
    {
      icon: Target,
      color: "text-purple-500",
      value: currentStats.challengesCompleted,
      label: "Thử thách",
    },
    {
      icon: TrendingUp,
      color: "text-orange-500",
      value: `#${currentStats.rank}`,
      label: "Xếp hạng",
    },
  ];

  return <StatsGrid items={statsData} />;
}
