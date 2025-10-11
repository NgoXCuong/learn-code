// src/pages/ChallengesPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Trophy, Flame } from "lucide-react";

const challenges = [
  {
    id: 1,
    title: "Reverse a String",
    difficulty: "Dễ",
    points: 100,
    description: "Viết hàm đảo ngược một chuỗi đầu vào.",
  },
  {
    id: 2,
    title: "Find the Missing Number",
    difficulty: "Trung bình",
    points: 200,
    description: "Tìm số còn thiếu trong dãy 1..n.",
  },
  {
    id: 3,
    title: "Two Sum Problem",
    difficulty: "Khó",
    points: 300,
    description: "Tìm hai số trong mảng có tổng bằng target.",
  },
];

const leaderboard = [
  { rank: 1, name: "Lê Văn A", score: 1250 },
  { rank: 2, name: "Nguyễn Thị B", score: 980 },
  { rank: 3, name: "Trần C", score: 850 },
  { rank: 4, name: "Phạm D", score: 700 },
];

export default function ChallengesPage() {
  const navigate = useNavigate();

  const handleChallengeClick = (challenge) => {
    // ✅ Chuyển sang trang Compiler hiện có
    // và truyền thông tin challenge qua state (nếu cần)
    navigate("/compiler", { state: { challenge } });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* 🔹 Danh sách thử thách */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          🧠 Thử thách Code hàng tuần
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {challenges.map((ch) => (
            <Card
              key={ch.id}
              className="cursor-pointer hover:shadow-lg transition transform hover:-translate-y-1"
              onClick={() => handleChallengeClick(ch)}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {ch.title}
                  </h3>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      ch.difficulty === "Dễ"
                        ? "bg-green-100 text-green-700"
                        : ch.difficulty === "Trung bình"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {ch.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {ch.description}
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <Flame className="w-4 h-4 mr-1 text-orange-500" />+{ch.points}{" "}
                  XP
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 🔹 Bảng xếp hạng bên phải */}
      <div className="w-full md:w-80">
        <Card className="sticky top-6">
          <CardContent className="p-5">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
              <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
              Bảng xếp hạng
            </h3>
            <ul className="space-y-3">
              {leaderboard.map((user) => (
                <li
                  key={user.rank}
                  className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-gray-700 dark:text-gray-200">
                      #{user.rank}
                    </span>
                    <span className="text-gray-800 dark:text-gray-100">
                      {user.name}
                    </span>
                  </div>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {user.score} XP
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
