import { useState, useMemo } from "react";
import {
  ChevronLeft,
  Code,
  Zap,
  Clock,
  ArrowRight,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ExercisesScreen({ codingExercises, goHome }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExercises = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return codingExercises.filter(
      (ex) =>
        q === "" ||
        ex.title.toLowerCase().includes(q) ||
        ex.description.toLowerCase().includes(q)
    );
  }, [codingExercises, searchQuery]);

  const diffStyles = {
    Dễ: {
      badge:
        "bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300 dark:border-green-700",
      gradient: "from-green-500 to-emerald-600",
      shadow: "hover:shadow-green-200 dark:hover:shadow-green-900",
    },
    "Trung bình": {
      badge:
        "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700",
      gradient: "from-yellow-500 to-orange-600",
      shadow: "hover:shadow-yellow-200 dark:hover:shadow-yellow-900",
    },
    Khó: {
      badge:
        "bg-red-100 text-red-700 border-red-300 dark:bg-red-900 dark:text-red-300 dark:border-red-700",
      gradient: "from-red-500 to-pink-600",
      shadow: "hover:shadow-red-200 dark:hover:shadow-red-900",
    },
  };

  const openExercise = (exercise) => {
    navigate(`/exam/${exercise.id}/compiler`, {
      state: { exercise, exercises: codingExercises },
    });
  };

  return (
    <div
      className="min-h-screen px-4 sm:px-6 md:px-14 lg:px-20 py-6 bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100
        dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black"
    >
      {/* HEADER */}
      <div className="rounded-xl shadow-md p-6 mb-6 border bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
              Bài Tập
            </h2>
            <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
              {filteredExercises.length}/{codingExercises.length} bài tập
            </p>
          </div>

          <button
            onClick={goHome}
            className="
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition
              bg-gray-100 hover:bg-gray-200 text-gray-700
              dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200
            "
          >
            <ChevronLeft className="w-4 h-4" />
            Thoát
          </button>
        </div>

        {/* SEARCH */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm bài tập theo tiêu đề hoặc mô tả..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-full pl-10 pr-4 py-2 rounded-lg transition
              border border-gray-300 bg-white
              focus:ring-2 focus:ring-indigo-500
              dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200
            "
          />
        </div>
      </div>

      {/* GRID */}
      {filteredExercises.length === 0 ? (
        <div
          className="
            text-center p-12 rounded-xl shadow
            bg-white dark:bg-gray-800
          "
        >
          <Code className="w-14 h-14 text-gray-300 dark:text-gray-500 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            Không tìm thấy bài tập phù hợp
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
            Hãy thử nhập từ khóa khác
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-10">
          {filteredExercises.map((ex) => {
            const style = diffStyles[ex.difficulty] || diffStyles["Dễ"];
            return (
              <div
                key={ex.id}
                onClick={() => openExercise(ex)}
                className={`
                  cursor-pointer p-5 rounded-xl border shadow-md transform transition
                  bg-white border-gray-100
                  dark:bg-gray-800 dark:border-gray-700
                  hover:-translate-y-1 hover:shadow-xl
                  ${style.shadow}
                `}
              >
                <div className="flex justify-between items-center mb-3">
                  <div
                    className={`
                      w-12 h-12 rounded-lg text-white flex items-center justify-center font-bold
                      bg-linear-to-br ${style.gradient}
                    `}
                  >
                    #{ex.id}
                  </div>

                  <span
                    className={`px-2 py-0.5 text-sm rounded-full border ${style.badge}`}
                  >
                    {ex.difficulty}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 mb-2">
                  {ex.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-base line-clamp-2 mb-3">
                  {ex.description}
                </p>

                <div
                  className="
    flex justify-between items-center text-sm border-t pt-3
    border-gray-200 dark:border-gray-700
  "
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                      <Zap className="w-3 h-3" /> +{ex.exp}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3" /> {ex.timeEstimate}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-indigo-500 dark:text-indigo-400 font-medium">
                    <span>Bắt đầu</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
