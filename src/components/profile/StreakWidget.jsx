import React from "react";
import { Flame } from "lucide-react";
import { user } from "@/mock/profile";

export default function StreakWidget() {
  return (
    <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold flex items-center">
          <Flame className="mr-2" size={24} />
          Chuỗi học tập
        </h3>
        <span className="text-3xl font-bold">{user.streak}</span>
      </div>
      <p className="text-white/90 text-base mb-4">
        Bạn đã học liên tiếp {user.streak} ngày! Tiếp tục phát huy! 🔥
      </p>
      <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
        <div className="flex justify-between text-base mb-2">
          <span>Mục tiêu tuần này</span>
          <span className="font-bold">5/7 ngày</span>
        </div>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <div
              key={day}
              className={`flex-1 h-2 rounded ${
                day <= 5 ? "bg-white" : "bg-white/30"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
