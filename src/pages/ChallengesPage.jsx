import React, { useState, useMemo } from "react";
import {
  userData,
  challenges,
  leaderboard,
  dailyQuests,
} from "@/mock/mockDataChallenge";
import { DailyQuestsPanel } from "@/components/challenges/DailyQuestsPanel";
import { ChallengeDetailModal } from "@/components/challenges/ChallengeDetailModal";
import { ChallengesFilter } from "@/components/challenges/ChallengesFilter";
import { ChallengesTabs } from "@/components/challenges/ChallengesTabs";
import { StatsCards } from "@/components/challenges/StatsCards";
import ChallengesHeader from "@/components/challenges/ChallengesHeader";
import ChallengesGrid from "@/components/challenges/ChallengesGrid";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useNavigate } from "react-router-dom";

export default function ChallengesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("points");
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // số thử thách mỗi trang

  const navigate = useNavigate();

  const handleChallengeClick = (challenge) => {
    setSelectedChallenge(challenge);
  };

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

    setCurrentPage(1);
    return result;
  }, [searchQuery, difficultyFilter, sortBy, activeTab]);

  const totalPages = Math.ceil(
    filteredAndSortedChallenges.length / itemsPerPage
  );
  const paginatedChallenges = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedChallenges.slice(start, start + itemsPerPage);
  }, [filteredAndSortedChallenges, currentPage]);

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

  return (
    <div className="bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors min-h-screen">
      <Header />
      <main className="px-6 sm:px-14 lg:px-20 py-6">
        <ChallengesHeader />

        <div className="grid lg:grid-cols-12 gap-8">
          <section className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-100 dark:border-gray-700">
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

              <ChallengesGrid
                paginatedChallenges={paginatedChallenges}
                challengeData={userData}
                onChallengeClick={handleChallengeClick}
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </section>

          <aside className="lg:col-span-4 space-y-6">
            <StatsCards
              totalParticipants={totalParticipants}
              avgSuccess={avgSuccess}
            />
            <DailyQuestsPanel quests={dailyQuests} />
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
