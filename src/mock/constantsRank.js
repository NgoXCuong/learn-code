import { Zap, TrendingUp, Award } from "lucide-react";

export const COURSES = [
  { id: "all", label: "Tất cả khóa học" },
  { id: "html-css", label: "HTML/CSS" },
  { id: "javascript", label: "JavaScript" },
  { id: "python", label: "Python" },
  { id: "java", label: "Java" },
  { id: "cpp", label: "C++" },
];

export const LEVEL_COLORS = {
  Bronze: "from-amber-600 to-amber-800",
  Silver: "from-gray-400 to-gray-600",
  Gold: "from-yellow-400 to-yellow-600",
  Platinum: "from-cyan-400 to-cyan-600",
  Diamond: "from-indigo-400 to-indigo-600",
};

export const LEVEL_BORDERS = {
  Bronze: "border-amber-600",
  Silver: "border-gray-400",
  Gold: "border-yellow-400",
  Platinum: "border-cyan-400",
  Diamond: "border-indigo-400",
};

export const TIMEFRAMES = [
  { id: "weekly", label: "Top Tuần", icon: Zap },
  { id: "monthly", label: "Top Tháng", icon: TrendingUp },
  { id: "all", label: "Toàn Thời Gian", icon: Award },
];
