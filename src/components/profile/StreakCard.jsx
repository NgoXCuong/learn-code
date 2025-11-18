import React, { useState } from "react";
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
      "bg-gray-200 dark:bg-gray-700",
      "bg-emerald-200 dark:bg-emerald-900",
      "bg-emerald-400 dark:bg-emerald-700",
      "bg-emerald-600 dark:bg-emerald-500",
      "bg-emerald-800 dark:bg-emerald-400",
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
    <div className="bg-white font-exo dark:bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          Chuỗi này học tập
        </h3>
      </div>

      <div className="flex gap-4">
        <div
          className="flex-1 overflow-x-auto overflow-y-hidden touch-pan-x scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="relative h-6 ml-10 mb-2 text-sm font-medium text-gray-500 dark:text-gray-400 min-w-[900px]">
            {monthPositions.map((m) => (
              <span
                key={m.month}
                className="absolute text-center"
                style={{ left: `${m.weekIdx * 16 + 40}px`, minWidth: "30px" }}
              >
                T{m.month}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-1 min-w-[900px]">
            {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map(
              (dayName, dayIdx) => (
                <div key={dayIdx} className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">
                    {dayName}
                  </span>

                  {weeks.map((week, weekIdx) => {
                    const dayData = week[dayIdx];
                    if (!dayData)
                      return <div key={weekIdx} className="w-3.5 h-3.5" />;

                    const d = dayData.date;
                    const isMonthStart = d.getDate() === 1;

                    return (
                      <div
                        key={`${weekIdx}-${dayIdx}`}
                        className={`relative w-3.5 h-3.5 rounded ${getColor(
                          dayData.level
                        )} hover:scale-125 hover:ring-2 hover:ring-emerald-400 transition-all duration-150 cursor-pointer ${
                          isMonthStart
                            ? "border-l-2 border-gray-400 dark:border-gray-500"
                            : ""
                        }`}
                        title={`${d.getDate()}/${
                          d.getMonth() + 1
                        }/${selectedYear} - Cấp ${dayData.level}`}
                      />
                    );
                  })}
                </div>
              )
            )}
          </div>
        </div>

        {/* Year Selection Dropdown */}
        <div className="shrink-0">
          <Select
            value={selectedYear.toString()}
            onValueChange={(val) => setSelectedYear(parseInt(val))}
          >
            <SelectTrigger className="w-24 bg-white dark:bg-gray-700 dark:text-gray-50 border-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="min-w-20 ">
              {[2025, 2024, 2023, 2022, 2021].map((year) => (
                <SelectItem
                  key={year}
                  value={year.toString()}
                  className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 focus:bg-gray-600 dark:focus:bg-gray-600"
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-base text-gray-600 dark:text-gray-400">
          <span className="font-medium">Ít</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((lvl) => (
              <div
                key={lvl}
                className={`w-5 h-5 rounded ${getColor(
                  lvl
                )} border border-gray-300 dark:border-gray-600`}
              />
            ))}
          </div>
          <span className="font-medium">Nhiều</span>
        </div>
        <div className="text-base text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {days.filter((d) => d.level > 0).length}
          </span>{" "}
          ngày đã học
        </div>
      </div>
    </div>
  );
}
