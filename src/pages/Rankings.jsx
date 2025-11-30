import React, { useMemo, useState, useEffect } from "react";
import HeaderSection from "@/components/rankings/HeaderSection";
import PodiumTop3 from "@/components/rankings/PodiumTop3";
import LeaderboardList from "@/components/rankings/LeaderboardList";
import Pagination from "@/components/rankings/Pagination";
import {
  fetchLeaderboard,
  fetchTopRankings,
  fetchCurrentUserRanking,
} from "@/api/rankingsApi";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Loading } from "@/components/layout/Loading";
import { toast } from "sonner";

export default function Rankings() {
  const [timeframe, setTimeframe] = useState("weekly");
  const [language, setLanguage] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("xp-desc");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [top3Users, setTop3Users] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageSize = 10;

  useEffect(() => {
    const loadRankingsData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load top 3 and current user ranking in parallel
        const [top3Data, currentUserData] = await Promise.all([
          fetchTopRankings(3),
          fetchCurrentUserRanking(),
        ]);

        setTop3Users(top3Data);
        setCurrentUser(currentUserData);

        // Load full leaderboard with filters
        await loadLeaderboard();
      } catch (err) {
        console.error("Error loading rankings:", err);
        setError("Không thể tải bảng xếp hạng");
        toast.error("Không thể tải bảng xếp hạng");
      } finally {
        setLoading(false);
      }
    };

    loadRankingsData();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const filters = {
        course: language === "all" ? undefined : language,
        timeframe,
        sortBy,
      };

      const leaderboardData = await fetchLeaderboard(filters);
      setUsers(leaderboardData);
    } catch (err) {
      console.error("Error loading leaderboard:", err);
      throw err;
    }
  };

  // Reload data when filters change
  useEffect(() => {
    if (!loading) {
      loadLeaderboard();
    }
  }, [language, timeframe, sortBy]);

  // Filter and search client-side for now
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const pagedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // ---------- RETURN UI ----------
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-2 flex-1">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loading />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Thử lại
              </button>
            </div>
          ) : (
            <>
              {/* ✅ Header (Search + Filters + Tabs) */}
              <HeaderSection
                search={search}
                setSearch={setSearch}
                timeframe={timeframe}
                setTimeframe={setTimeframe}
                language={language}
                setLanguage={setLanguage}
                sortBy={sortBy}
                setSortBy={setSortBy}
                setPage={setPage}
              />

              {/* ✅ Top 3 podium */}
              <PodiumTop3 users={top3Users} />

              {/* ✅ List users */}
              <LeaderboardList paged={pagedUsers} currentUser={currentUser} />

              {/* ✅ Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalUsers={filteredUsers.length}
                onPrev={() => setPage((p) => Math.max(1, p - 1))}
                onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
              />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
