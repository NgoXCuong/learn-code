import React from "react";
import { ChallengeCard } from "./ChallengeCard";

const ChallengesGrid = ({
  paginatedChallenges,
  challengeData,
  onChallengeClick,
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
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

  if (paginatedChallenges.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Không tìm thấy thử thách
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Thử điều chỉnh bộ lọc hoặc tìm kiếm của bạn
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          Xóa bộ lọc
        </button>
      </div>
    );
  }

  return (
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
              onClick={onChallengeClick}
              userProgress={challengeData}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 disabled:opacity-50 transition-all"
          >
            ← Trước
          </button>

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
                    ? "bg-linear-to-r from-blue-500 to-indigo-500 text-white shadow-md scale-105"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            )
          )}

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
  );
};

export default ChallengesGrid;
