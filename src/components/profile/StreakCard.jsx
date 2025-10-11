import React from "react";

export default function StreakCard() {
  const startDate = new Date("2025-01-01");
  const endDate = new Date("2025-12-31");
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
      "bg-green-100 dark:bg-green-800",
      "bg-green-300 dark:bg-green-600",
      "bg-green-500 dark:bg-green-500",
      "bg-green-700 dark:bg-green-400",
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        🔥 Chuỗi ngày học trong năm 2025
      </h3>

      {/* Container scroll ngang */}
      <div
        className="overflow-x-auto overflow-y-hidden touch-pan-x"
        style={{
          WebkitOverflowScrolling: "touch", // giúp cuộn mượt trên iOS
        }}
      >
        {/* Nhãn tháng */}
        <div className="relative h-6 ml-10 mb-1 text-xs text-gray-500 dark:text-gray-400 min-w-[900px]">
          {monthPositions.map((m) => (
            <span
              key={m.month}
              className="absolute text-center"
              style={{
                left: `${m.weekIdx * 16 + 40}px`,
                minWidth: "30px",
              }}
            >
              T{m.month}
            </span>
          ))}
        </div>

        {/* Heatmap */}
        <div className="flex flex-col gap-[3px] min-w-[900px]">
          {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((dayName, dayIdx) => (
            <div key={dayIdx} className="flex items-center gap-[3px]">
              <span className="text-xs text-gray-500 dark:text-gray-400 w-5">
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
                    className={`relative w-3.5 h-3.5 rounded-sm ${getColor(
                      dayData.level
                    )} hover:scale-110 transition-transform duration-150 ${
                      isMonthStart
                        ? "border-l-2 border-gray-300 dark:border-gray-600"
                        : ""
                    }`}
                    title={`${d.getDate()}/${d.getMonth() + 1}/2025 - cấp ${
                      dayData.level
                    }`}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Chú thích */}
      <div className="flex flex-wrap justify-end items-center mt-4 text-sm text-gray-500 dark:text-gray-400">
        <span>Ít</span>
        <div className="flex gap-[3px] mx-2">
          {[0, 1, 2, 3, 4].map((lvl) => (
            <div key={lvl} className={`w-4 h-4 rounded-sm ${getColor(lvl)}`} />
          ))}
        </div>
        <span>Nhiều</span>
      </div>
    </div>
  );
}
