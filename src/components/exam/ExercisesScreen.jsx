import React, { useState, useMemo } from "react";
import { ChevronLeft, Code, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "@/context/ProgressContext";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ExerciseCard from "./ExerciseCard";
import { usePagination } from "@/hooks/usePagination";

export default function ExercisesScreen({
  codingExercises,
  goHome,
  goToCourseSelection,
}) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination
  const itemsPerPage = 9; // 3x3 grid

  // Import progress context
  const { isExerciseCompleted } = useProgress();

  // Filter states
  const [difficultyFilters, setDifficultyFilters] = useState([]);
  const [statusFilters, setStatusFilters] = useState([]);
  const [sortBy, setSortBy] = useState("oldest");

  // Create filters array for pagination hook
  const filters = [searchQuery, difficultyFilters, statusFilters, sortBy];

  // Available options
  const difficulties = ["Dễ", "Trung bình", "Khó"];
  const statuses = ["Chưa làm", "Đã hoàn thành"]; // No "Đang thử" since no tracking

  const filteredAndSortedExercises = useMemo(() => {
    let filtered = codingExercises;

    // Search filter
    const q = searchQuery.toLowerCase();
    if (q) {
      filtered = filtered.filter(
        (ex) =>
          ex.title.toLowerCase().includes(q) ||
          ex.description.toLowerCase().includes(q) ||
          ex.tags?.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Difficulty filter
    if (difficultyFilters.length > 0) {
      filtered = filtered.filter((ex) =>
        difficultyFilters.includes(ex.difficulty)
      );
    }

    // Status filter
    if (statusFilters.length > 0) {
      filtered = filtered.filter((ex) => {
        const completed = isExerciseCompleted(ex.id);
        const status = completed ? "Đã hoàn thành" : "Chưa làm";
        return statusFilters.includes(status);
      });
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.id - a.id;
        case "oldest":
          return a.id - b.id;
        case "difficulty-asc":
          return (
            difficulties.indexOf(a.difficulty) -
            difficulties.indexOf(b.difficulty)
          );
        case "difficulty-desc":
          return (
            difficulties.indexOf(b.difficulty) -
            difficulties.indexOf(a.difficulty)
          );
        case "exp-desc":
          return b.exp - a.exp;
        case "time-asc":
          return a.timeEstimate.localeCompare(b.timeEstimate);
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    codingExercises,
    searchQuery,
    difficultyFilters,
    statusFilters,
    sortBy,
    isExerciseCompleted,
  ]);

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    currentItems: currentExercises,
    handlePageChange,
    getPageNumbers,
  } = usePagination(filteredAndSortedExercises, itemsPerPage, filters);

  const openExercise = (exercise) => {
    navigate(`/exam/${exercise.id}/compiler`, {
      state: { exercise, exercises: codingExercises },
    });
  };

  const handleDifficultyChange = (diff) => {
    setDifficultyFilters((prev) =>
      prev.includes(diff) ? prev.filter((d) => d !== diff) : [...prev, diff]
    );
  };

  const handleStatusChange = (status) => {
    setStatusFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  return (
    <div
      className="h-full overflow-y-auto px-4 sm:px-6 md:px-14 lg:px-20 py-6 bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100
        dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black"
    >
      {/* HEADER */}
      <div className="rounded-sm shadow-md p-6 mb-6 border bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
              Bài Tập
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {filteredAndSortedExercises.length}/{codingExercises.length} bài
              tập
            </p>
          </div>

          <button
            onClick={goHome}
            className="
              flex items-center gap-2 px-4 py-1.5 rounded-sm font-medium transition
              bg-gray-100 hover:bg-gray-200 text-gray-700
              dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200
            "
          >
            <ChevronLeft className="w-4 h-4" />
            Thoát
          </button>
        </div>

        {/* SEARCH */}
        <div className="mt-2 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <Input
              type="text"
              placeholder="Tìm bài tập theo tiêu đề hoặc mô tả..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[250px] border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <span className="mr-2 text-gray-400 text-sm">Sắp xếp:</span>
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <SelectItem value="oldest">Cũ nhất</SelectItem>
              <SelectItem value="newest">Mới nhất</SelectItem>
              <SelectItem value="difficulty-asc">Độ khó tăng dần</SelectItem>
              <SelectItem value="difficulty-desc">Độ khó giảm dần</SelectItem>
              <SelectItem value="exp-desc">Exp cao nhất</SelectItem>
              <SelectItem value="time-asc">Thời gian ít nhất</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* FILTERS */}
        <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-6 sm:gap-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 min-w-fit">
              Độ khó:
            </label>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {difficulties.map((diff) => (
                <label
                  key={diff}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={difficultyFilters.includes(diff)}
                    onChange={() => handleDifficultyChange(diff)}
                    className="rounded w-3 h-3"
                  />
                  <span className="text-sm  text-gray-700 dark:text-gray-300">
                    {diff}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 min-w-fit">
              Trạng thái:
            </label>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {statuses.map((status) => (
                <label
                  key={status}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={statusFilters.includes(status)}
                    onChange={() => handleStatusChange(status)}
                    className="rounded w-3 h-3"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {status}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GRID */}
      {filteredAndSortedExercises.length === 0 ? (
        <div
          className="
            text-center p-12 rounded-xl shadow
            bg-white dark:bg-gray-800
          "
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Không tìm thấy bài tập
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-base">
            Thử điều chỉnh bộ lọc hoặc tìm kiếm của bạn
          </p>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-10">
            {currentExercises.map((ex) => (
              <ExerciseCard
                key={ex.uniqueKey}
                exercise={ex}
                isCompleted={isExerciseCompleted(ex.id)}
                onClick={openExercise}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
              {/* Nút Trước */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-all"
              >
                ← Trước
              </button>

              {/* Danh sách số trang */}
              {getPageNumbers().map((page, i) =>
                page === "..." ? (
                  <span
                    key={`dots-${i}`}
                    className="px-2 text-gray-400 dark:text-gray-500 select-none"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-9 h-9 rounded-xl font-medium transition-all duration-200 ${
                      currentPage === page
                        ? "bg-linear-to-r from-blue-400 to-blue-600 text-white shadow-md scale-105"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-800"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Nút Sau */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-all"
              >
                Sau →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
