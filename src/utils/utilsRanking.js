import { Zap, TrendingUp, Award } from "lucide-react";
import { mockLanguages } from "@/mock/courses";

export function classNames(...arr) {
  return arr.filter(Boolean).join(" ");
}

export function numberWithCommas(x) {
  if (!x && x !== 0) return "";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ---------- Filter Data ----------
// Create languages array from mockLanguages
export const LANGUAGES = [
  { id: "all", label: "Tất cả ngôn ngữ" },
  ...mockLanguages.map((lang) => ({
    id: lang.id.toString(),
    label: lang.name,
  })),
];

// Keep COURSES for backward compatibility if needed elsewhere

export const TIMEFRAMES = [
  { id: "weekly", label: "Top Tuần", icon: Zap },
  { id: "monthly", label: "Top Tháng", icon: TrendingUp },
  { id: "all", label: "Tất cả", icon: Award },
];
