import React, { useMemo, useState } from "react";
import HeaderSection from "@/components/rankings/HeaderSection";
import PodiumTop3 from "@/components/rankings/PodiumTop3";
import LeaderboardList from "@/components/rankings/LeaderboardList";
import Pagination from "@/components/rankings/Pagination";
import { MOCK_USERS, CURRENT_USER_ID } from "@/mock/usersRank"; // nếu bạn tách mock
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function Rankings() {
  const [timeframe, setTimeframe] = useState("weekly");
  const [course, setCourse] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("xp-desc");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  // ----- SCORE CALC -----
  const scoredUsers = useMemo(() => {
    return MOCK_USERS.map((u) => {
      const tfFactor =
        timeframe === "weekly" ? 0.35 : timeframe === "monthly" ? 0.7 : 1;

      return {
        ...u,
        tfXp: Math.round(u.xp * tfFactor),
        tfCompleted: Math.round(u.completed * tfFactor),
      };
    });
  }, [timeframe]);

  // ----- FILTER -----
  const filtered = useMemo(() => {
    return scoredUsers
      .filter((u) => (course === "all" ? true : u.course === course))
      .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));
  }, [scoredUsers, course, search]);

  // ----- SORT -----
  const sorted = useMemo(() => {
    const clone = [...filtered];
    switch (sortBy) {
      case "xp-asc":
        clone.sort((a, b) => a.tfXp - b.tfXp);
        break;
      case "completed-desc":
        clone.sort((a, b) => b.tfCompleted - a.tfCompleted);
        break;
      case "completed-asc":
        clone.sort((a, b) => a.tfCompleted - b.tfCompleted);
        break;
      case "accuracy-desc":
        clone.sort((a, b) => b.accuracy - a.accuracy);
        break;
      case "accuracy-asc":
        clone.sort((a, b) => a.accuracy - b.accuracy);
        break;
      case "xp-desc":
      default:
        clone.sort((a, b) => b.tfXp - a.tfXp);
        break;
    }
    return clone;
  }, [filtered, sortBy]);

  // ----- ASSIGN RANKS -----
  const withRanks = useMemo(() => {
    return sorted.map((u, idx) => ({ ...u, rank: idx + 1 }));
  }, [sorted]);

  // ----- PAGINATION -----
  const totalPages = Math.max(1, Math.ceil(withRanks.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paged = withRanks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const currentUser = withRanks.find((u) => u.id === CURRENT_USER_ID);

  // ---------- RETURN UI ----------
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-8 flex-1">
          {/* ✅ Header (Search + Filters + Tabs) */}
          <HeaderSection
            search={search}
            setSearch={setSearch}
            timeframe={timeframe}
            setTimeframe={setTimeframe}
            course={course}
            setCourse={setCourse}
            sortBy={sortBy}
            setSortBy={setSortBy}
            setPage={setPage}
          />

          {/* ✅ Current User Card */}
          {/* <CurrentUserCard currentUser={currentUser} /> */}

          {/* ✅ Top 3 podium */}
          <PodiumTop3 users={withRanks.slice(0, 3)} />

          {/* ✅ List users */}
          <LeaderboardList paged={paged} currentUser={currentUser} />

          {/* ✅ Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalUsers={withRanks.length}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
