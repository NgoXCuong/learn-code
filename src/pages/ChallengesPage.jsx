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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />

      <main className="pt-20 md:pt-24 flex flex-col w-full px-6 sm:px-14 lg:px-20 py-10 flex-1">
        <Breadcrumb
          items={[{ label: "Trang chủ", href: "/" }, { label: "Thử thách" }]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-2 flex-1">
          <section className="flex-1">
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-2">
              🧠 Thử thách Code hàng tuần
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-base">
              Rèn luyện kỹ năng lập trình qua các thử thách đa dạng – tích lũy
              XP và cạnh tranh cùng cộng đồng.
            </p>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {challenges.map((ch) => (
                <ChallengeCard
                  key={ch.id}
                  challenge={ch}
                  onClick={handleChallengeClick}
                />
              ))}
            </div>
          </section>

          <aside className="w-full lg:w-80">
            <Leaderboard leaderboard={leaderboard} currentUser={currentUser} />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
