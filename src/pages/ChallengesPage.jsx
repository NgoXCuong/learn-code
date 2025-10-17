import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumb from "../components/layout/Breadcrumb";
import ChallengeCard from "../components/challenges/ChallengeCard";
import Leaderboard from "../components/challenges/Leaderboard";

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
  const currentUser = "johndoe";

  const handleChallengeClick = (challenge) => {
    navigate("/compiler", { state: { challenge } });
  };

  const totalParticipants = challenges.reduce(
    (sum, c) => sum + c.participants,
    0
  );
  const totalPoints = challenges.reduce((sum, c) => sum + c.points, 0);
  const avgSuccess = Math.round(
    challenges.reduce((sum, c) => sum + c.successRate, 0) / challenges.length
  );

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 w-full  px-6 sm:px-14 lg:px-20 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[{ label: "Trang chủ", href: "/" }, { label: "Thử thách" }]}
        />

        {/* Page Header */}
        <div className="mt-6 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🧠</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Thử thách lập trình
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Rèn luyện kỹ năng và leo bảng xếp hạng cùng mọi người
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            {
              title: "Tổng người tham gia",
              value: totalParticipants.toLocaleString(),
              color: "from-indigo-500 to-blue-500",
              icon: "👥",
            },
            {
              title: "Tổng điểm",
              value: totalPoints.toLocaleString(),
              color: "from-purple-500 to-pink-500",
              icon: "⭐",
            },
            {
              title: "Tỷ lệ thành công TB",
              value: `${avgSuccess}%`,
              color: "from-green-500 to-emerald-500",
              icon: "🎯",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {item.title}
                  </p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {item.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center`}
                >
                  <span className="text-2xl">{item.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Challenges Section */}
          <section className="lg:col-span-9">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span>🔥</span> Danh sách thử thách
                </h2>
                <span className="text-base text-black dark:text-gray-400">
                  {challenges.length} thử thách đang chờ bạn
                </span>
              </div>

              {/* Challenges Grid (2 columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {challenges.map((ch, index) => (
                  <div
                    key={ch.id}
                    className="transform transition-all duration-300 hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ChallengeCard
                      challenge={ch}
                      onClick={handleChallengeClick}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Leaderboard Section */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Leaderboard */}

            <Leaderboard leaderboard={leaderboard} currentUser={currentUser} />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
