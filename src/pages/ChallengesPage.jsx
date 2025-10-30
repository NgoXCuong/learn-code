import React, { useState, useMemo } from "react";
import {
  userData,
  challenges,
  leaderboard,
  dailyQuests,
} from "@/mock/mockDataChallenge";
import { ChallengeCard } from "@/components/challenges/ChallengeCard";
import { ProgressCard } from "@/components/challenges/ProgressCard";
import { BadgesSection } from "@/components/challenges/BadgesSection";
import { DailyQuestsPanel } from "@/components/challenges/DailyQuestsPanel";
import { LeaderboardPanel } from "@/components/challenges/LeaderboardPanel";
import { ChallengeDetailModal } from "@/components/challenges/ChallengeDetailModal";
import { ChallengesFilter } from "@/components/challenges/ChallengesFilter";
import { ChallengesTabs } from "@/components/challenges/ChallengesTabs";
import { StatsCards } from "@/components/challenges/StatsCards";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/Breadcrumb";

export default function ChallengesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("points");
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // số thử thách mỗi trang

  const handleChallengeClick = (challenge) => {
    setSelectedChallenge(challenge);
  };

  // -----------------------------
  // Lọc và sắp xếp thử thách
  // -----------------------------
  const filteredAndSortedChallenges = useMemo(() => {
    let result = [...challenges];

    if (activeTab === "completed") {
      result = result.filter((ch) =>
        userData.completedChallenges.includes(ch.id)
      );
    } else if (activeTab === "attempted") {
      result = result.filter((ch) =>
        userData.attemptedChallenges.includes(ch.id)
      );
    }

    if (searchQuery) {
      result = result.filter(
        (ch) =>
          ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ch.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (difficultyFilter !== "all") {
      result = result.filter((ch) => ch.difficulty === difficultyFilter);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "points":
          return b.points - a.points;
        case "difficulty":
          const diffOrder = { Dễ: 1, "Trung bình": 2, Khó: 3 };
          return diffOrder[a.difficulty] - diffOrder[b.difficulty];
        case "participants":
          return b.participants - a.participants;
        case "successRate":
          return b.successRate - a.successRate;
        default:
          return 0;
      }
    });

    setCurrentPage(1); // reset về trang đầu khi lọc
    return result;
  }, [searchQuery, difficultyFilter, sortBy, activeTab]);

  // -----------------------------
  // Phân trang
  // -----------------------------
  const totalPages = Math.ceil(
    filteredAndSortedChallenges.length / itemsPerPage
  );
  const paginatedChallenges = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedChallenges.slice(start, start + itemsPerPage);
  }, [filteredAndSortedChallenges, currentPage]);

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  // -----------------------------
  // Bộ lọc và thống kê
  // -----------------------------
  const clearFilters = () => {
    setSearchQuery("");
    setDifficultyFilter("all");
    setSortBy("points");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery || difficultyFilter !== "all" || sortBy !== "points";

  const totalParticipants = challenges.reduce(
    (sum, c) => sum + c.participants,
    0
  );
  const avgSuccess = Math.round(
    challenges.reduce((sum, c) => sum + c.successRate, 0) / challenges.length
  );

  // -----------------------------
  // Render giao diện
  // -----------------------------
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors min-h-screen">
      <Header />
      <main className="px-6 sm:px-14 lg:px-20 py-8">
        <Breadcrumb
          items={[{ label: "Trang chủ", href: "/" }, { label: "Thử thách" }]}
        />

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🧠</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Thử thách lập trình
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400 mt-1">
                Rèn luyện kỹ năng và leo bảng xếp hạng cùng mọi người
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <section className="lg:col-span-8 space-y-6">
            <ProgressCard userData={userData} />

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
              <ChallengesTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                challenges={challenges}
                userData={userData}
              />

              <ChallengesFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                difficultyFilter={difficultyFilter}
                setDifficultyFilter={setDifficultyFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                clearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />

              {paginatedChallenges.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paginatedChallenges.map((ch, index) => (
                      <div
                        key={ch.id}
                        className="transform transition-all duration-300 hover:scale-[1.02]"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <ChallengeCard
                          challenge={ch}
                          onClick={handleChallengeClick}
                          userProgress={userData}
                        />
                      </div>
                    ))}
                  </div>

                  {/* === PHÂN TRANG === */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
                      {/* Nút Trước */}
                      <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 disabled:opacity-50 transition-all"
                      >
                        ← Trước
                      </button>

                      {/* Số trang */}
                      {getPageNumbers().map((page, idx) =>
                        page === "..." ? (
                          <span
                            key={`dots-${idx}`}
                            className="px-2 text-gray-400 dark:text-gray-500 select-none"
                          >
                            ...
                          </span>
                        ) : (
                          <button
                            key={`page-${page}`}
                            onClick={() => setCurrentPage(page)}
                            className={`w-9 h-9 rounded-xl font-medium transition-all duration-200 ${
                              currentPage === page
                                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md scale-105"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}

                      {/* Nút Sau */}
                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 disabled:opacity-50 transition-all"
                      >
                        Sau →
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    Không tìm thấy thử thách
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Thử điều chỉnh bộ lọc hoặc tìm kiếm của bạn
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              )}
            </div>
          </section>

          <aside className="lg:col-span-4 space-y-6">
            <StatsCards
              totalParticipants={totalParticipants}
              avgSuccess={avgSuccess}
            />
            <DailyQuestsPanel quests={dailyQuests} />
            <BadgesSection badges={userData.badges} />
            <LeaderboardPanel
              leaderboard={leaderboard}
              currentUser={userData.name}
            />
          </aside>
        </div>
      </main>

      {selectedChallenge && (
        <ChallengeDetailModal
          challenge={selectedChallenge}
          onClose={() => setSelectedChallenge(null)}
          userProgress={userData}
        />
      )}
      <Footer />
    </div>
  );
}
