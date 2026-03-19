import React, { useState } from "react";
import { Flame } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function StreakCard() {
  const [selectedYear, setSelectedYear] = useState(2025);

  const startDate = new Date(`${selectedYear}-01-01`);
  const endDate = new Date(`${selectedYear}-12-31`);
  const days = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    days.push({
      date: new Date(d),
      level: Math.floor(Math.random() * 5),
    });
  }

  const getColor = (lvl) => {
    const colors = [
      "bg-slate-100 dark:bg-slate-800/40",
      "bg-emerald-200/60 dark:bg-emerald-900/30",
      "bg-emerald-400/80 dark:bg-emerald-700/50",
      "bg-emerald-500 dark:bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.2)]",
      "bg-emerald-600 dark:bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]",
    ];
    return colors[lvl];
  };

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const monthPositions = [];
  days.forEach((d, idx) => {
    if (d.date.getDate() === 1) {
      const weekIdx = Math.floor(idx / 7);
      monthPositions.push({
        month: d.date.getMonth() + 1,
        weekIdx,
      });
    }
  });

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
            <Flame className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Chuỗi học tập
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <Select
            value={selectedYear.toString()}
            onValueChange={(val) => setSelectedYear(parseInt(val))}
          >
            <SelectTrigger className="w-28 h-9 bg-gray-50/50 dark:bg-slate-700/50 border-none rounded-xl text-xs font-bold text-gray-700 dark:text-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-200 dark:border-slate-700 shadow-2xl">
              {[2025, 2024, 2023].map((year) => (
                <SelectItem key={year} value={year.toString()} className="text-xs font-medium focus:bg-emerald-50 dark:focus:bg-emerald-900/20">
                  Năm {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative group overflow-hidden">
        <div className="overflow-x-auto overflow-y-hidden pb-4 custom-scrollbar-thin">
          {/* Month Header */}
          <div className="relative h-6 mb-3 px-1 ml-10 min-w-[850px]">
            {monthPositions.map((m) => (
              <span
                key={m.month}
                className="absolute text-[11px] font-black uppercase tracking-tight text-gray-400 dark:text-gray-500"
                style={{ left: `${m.weekIdx * 17}px` }}
              >
                T{m.month}
              </span>
            ))}
          </div>

          {/* Grid Container */}
          <div className="flex flex-col gap-1.5 min-w-[850px] px-1">
            {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((dayName, dayIdx) => (
              <div key={dayIdx} className="flex items-center gap-1.5">
                <span className="text-[10px] font-black text-gray-400 dark:text-gray-600 w-8 uppercase tracking-tighter">
                  {dayName}
                </span>

                {weeks.map((week, weekIdx) => {
                  const dayData = week[dayIdx];
                  if (!dayData) return <div key={weekIdx} className="w-[11px] h-[11px] rounded-[3px]" />;

                  const d = dayData.date;
                  const isToday = new Date().toDateString() === d.toDateString();

                  return (
                    <div
                      key={`${weekIdx}-${dayIdx}`}
                      className={`relative w-[11px] h-[11px] rounded-[3px] ${getColor(dayData.level)} transition-all duration-300 cursor-pointer hover:scale-150 hover:z-10 hover:shadow-lg ${
                        isToday ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900" : ""
                      }`}
                      title={`${d.getDate()}/${d.getMonth() + 1}/${selectedYear}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center mt-6 pt-4 border-t border-gray-100 dark:border-slate-700/50">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ít</span>
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map((lvl) => (
              <div
                key={lvl}
                className={`w-3.5 h-3.5 rounded-[3px] ${getColor(lvl)} border border-white/5 shadow-sm`}
              />
            ))}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nhiều</span>
        </div>
        
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            <span className="text-emerald-600 dark:text-emerald-400 font-black">
              {days.filter((d) => d.level > 0).length}
            </span>
            {" "}ngày mục tiêu đã đạt được
          </p>
        </div>
      </div>
    </div>
  );
}
