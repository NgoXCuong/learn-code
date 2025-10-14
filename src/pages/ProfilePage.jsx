import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProfileHero from "../components/profile/ProfileHero";
import CoursesCard from "../components/profile/CoursesCard";
import BadgesCard from "../components/profile/BadgesCard";
import StatsCard from "../components/profile/StatsCard";
import StreakCard from "../components/profile/StreakCard";

export default function ProfilePage() {
  const user = {
    name: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/150?img=32",
    cover:
      "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1350&q=80",
    bio: "Lập trình viên đam mê học hỏi mỗi ngày 🚀",
  };

  const courses = [
    { id: 1, name: "Java Cơ bản", progress: 80 },
    { id: 2, name: "C++ Nâng cao", progress: 50 },
    { id: 3, name: "JavaScript Cơ bản", progress: 100 },
  ];

  const badges = [
    { id: 1, name: "Chăm chỉ", icon: "💪", date: "2024-08-20" },
    { id: 2, name: "Tốc độ", icon: "⚡", date: "2024-10-10" },
  ];

  const stats = {
    lessonsDone: 24,
    exercisesSolved: 120,
    challengesCompleted: 5,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <ProfileHero user={user} />

      {/* Nội dung chính */}
      <main className="flex-grow w-full px-6 sm:px-14 lg:px-20 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CoursesCard courses={courses} />
          <BadgesCard badges={badges} />
          <StatsCard stats={stats} />
        </div>

        {/* StreakCard full width */}
        <div className="mt-10">
          <StreakCard />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
