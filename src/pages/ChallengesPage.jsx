import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Trophy, Flame, Users, Target, Star } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumb from "../components/layout/Breadcrumb";
import { Button } from "../components/ui/button";

const challenges = [
  {
    id: 1,
    title: "Reverse a String",
    difficulty: "Dễ",
    points: 100,
    description: "Viết hàm đảo ngược một chuỗi đầu vào.",
    participants: 340,
    successRate: 92,
  },
  {
    id: 2,
    title: "Find the Missing Number",
    difficulty: "Trung bình",
    points: 200,
    description: "Tìm số còn thiếu trong dãy 1..n.",
    participants: 210,
    successRate: 67,
  },
  {
    id: 3,
    title: "Two Sum Problem",
    difficulty: "Khó",
    points: 300,
    description: "Tìm hai số trong mảng có tổng bằng target.",
    participants: 125,
    successRate: 40,
  },
];

const leaderboard = [
  { rank: 1, name: "Lê Văn A", score: 1250 },
  { rank: 2, name: "Nguyễn Thị B", score: 980 },
  { rank: 3, name: "Trần C", score: 850 },
  { rank: 4, name: "johndoe", score: 700 },
];

export default function ChallengesPage() {
  const navigate = useNavigate();
  const currentUser = "johndoe"; // 🔹 Giả sử user hiện tại là johndoe

  const handleChallengeClick = (challenge) => {
    navigate("/compiler", { state: { challenge } });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <main className="flex flex-col w-full px-6 sm:px-14 lg:px-20 py-10 flex-1">
        {/* 🔹 Breadcrumb được đưa vào trong main */}
        <Breadcrumb
          items={[{ label: "Trang chủ", href: "/" }, { label: "Thử thách" }]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-2 flex-1">
          {/* ======================= Thử thách ======================= */}
          <section className="flex-1">
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-2">
              🧠 Thử thách Code hàng tuần
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
              Rèn luyện kỹ năng lập trình qua các thử thách đa dạng – tích lũy
              XP và cạnh tranh cùng cộng đồng.
            </p>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {challenges.map((ch) => (
                <Card
                  key={ch.id}
                  className="border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500 
                           transition-all duration-300 rounded-2xl bg-white dark:bg-gray-800 group"
                >
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {ch.title}
                      </h3>
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
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

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
                      {ch.description}
                    </p>

                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span>{ch.participants} người tham gia</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4 text-green-500" />
                        <span>{ch.successRate}% thành công</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Flame className="w-4 h-4 mr-1 text-orange-500" />+
                        {ch.points} XP
                      </div>

                      <Button
                        onClick={() => handleChallengeClick(ch)}
                        className="text-sm font-semibold px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-sm"
                      >
                        Thử sức
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* ======================= Bảng xếp hạng ======================= */}
          <aside className="w-full lg:w-80">
            <Card className="sticky top-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
              <CardContent className="p-5">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-5 flex items-center">
                  <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
                  Bảng xếp hạng
                </h3>

                <ul className="space-y-3">
                  {leaderboard.map((user) => (
                    <li
                      key={user.rank}
                      className={`flex items-center justify-between p-3 rounded-lg transition-all 
                        ${
                          user.name === currentUser
                            ? "bg-blue-100 dark:bg-blue-900/40 border border-blue-300 dark:border-blue-700"
                            : "bg-gray-100 dark:bg-gray-700/60 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                    >
                      <div className="flex items-center space-x-3">
                        {user.rank <= 3 ? (
                          <Star
                            className={`w-4 h-4 ${
                              user.rank === 1
                                ? "text-yellow-500"
                                : user.rank === 2
                                ? "text-gray-400"
                                : "text-amber-600"
                            }`}
                          />
                        ) : (
                          <span className="w-4" />
                        )}
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          #{user.rank}
                        </span>
                        <span className="font-medium text-gray-800 dark:text-gray-100 flex items-center gap-1">
                          {user.name}
                          {user.name === currentUser && (
                            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                              (Bạn)
                            </span>
                          )}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-700 dark:text-gray-200">
                        {user.score} XP
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
