import React from "react";
import { Card, CardContent } from "../ui/card";
import { Users, Target, Flame } from "lucide-react";
import { Button } from "../ui/button";

export default function ChallengeCard({ challenge, onClick }) {
  const { title, difficulty, description, participants, successRate, points } =
    challenge;

  return (
    <Card
      className="border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 
                 transition-all duration-300 rounded-2xl bg-white dark:bg-gray-800 group"
    >
      <CardContent className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              difficulty === "Dễ"
                ? "bg-green-100 text-green-700"
                : difficulty === "Trung bình"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {difficulty}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
          {description}
        </p>

        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-blue-500" />
            <span>{participants} người tham gia</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="w-4 h-4 text-green-500" />
            <span>{successRate}% thành công</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Flame className="w-4 h-4 mr-1 text-orange-500" />+{points} XP
          </div>

          <Button
            onClick={() => onClick(challenge)}
            className="text-sm font-semibold px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-sm"
          >
            Thử sức
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
