import React, { useMemo, useState, useEffect } from "react";
import HeaderSection from "@/components/rankings/HeaderSection";
import PodiumTop3 from "@/components/rankings/PodiumTop3";
import LeaderboardList from "@/components/rankings/LeaderboardList";
import Pagination from "@/components/rankings/Pagination";
import {
  fetchLeaderboard,
  fetchTopRankings,
  fetchCurrentUserRanking,
} from "@/services/rankingsApi";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Loading } from "@/components/layout/Loading";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TIMEFRAMES, LANGUAGES } from "@/utils/utilsRanking";

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
              {/* ✅ Header */}
              <HeaderSection />

              {/* ✅ Top 3 podium */}
              <PodiumTop3 users={top3Users} />

              {/* ✅ Filters */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch">
                  {/* Search Input - Left side */}
                  <div className="relative flex-1 sm:flex-none sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <Input
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                      }}
                      placeholder="Tìm người học..."
                      className="pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors h-full"
                    />
                  </div>

                  {/* Spacer to push selects to the right */}
                  <div className="flex-1 hidden sm:block"></div>

                  {/* Select Filters - Far right side */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto sm:ml-auto">
                    {/* Timeframe Select */}
                    <div className="flex-1 sm:flex-none sm:min-w-[140px] lg:w-[150px]">
                      <Select
                        value={timeframe}
                        onValueChange={(value) => {
                          setTimeframe(value);
                          setPage(1);
                        }}
                      >
                        <SelectTrigger className="w-full h-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-2 sm:py-3 focus:ring-0 transition-colors">
                          <SelectValue placeholder="Chọn thời gian" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                          {TIMEFRAMES.map((t) => {
                            const Icon = t.icon;
                            return (
                              <SelectItem key={t.id} value={t.id}>
                                <div className="flex items-center gap-2">
                                  <Icon className="w-4 h-4" />
                                  {t.label}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Language Select */}
                    <div className="flex-1 sm:flex-none sm:min-w-[140px] lg:w-[150px]">
                      <Select
                        value={language}
                        onValueChange={(value) => {
                          setLanguage(value);
                          setPage(1);
                        }}
                      >
                        <SelectTrigger className="w-full h-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-2 sm:py-3 focus:ring-0 transition-colors">
                          <SelectValue placeholder="Chọn ngôn ngữ" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                          {LANGUAGES.map((lang) => (
                            <SelectItem key={lang.id} value={lang.id}>
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

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
