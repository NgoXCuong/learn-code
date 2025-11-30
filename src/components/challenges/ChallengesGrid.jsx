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
  // Tạo danh sách số trang (có dấu ...)
  const getPageNumbers = () => {
    const delta = 2;
    let pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      }
    }

    const result = [];
    let prev = null;

    for (let number of pages) {
      if (prev !== null) {
        if (number - prev === 2) {
          result.push(prev + 1); // số bị skip đúng 1
        } else if (number - prev > 2) {
          result.push("...");
        }
      }
      result.push(number);
      prev = number;
    }

    return result;
  };

  // Trạng thái không có dữ liệu
  if (paginatedChallenges.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Không tìm thấy thử thách
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-5 px-6 py-2 border border-gray-300 dark:border-gray-600
  rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors"
        >
          Xóa bộ lọc
        </button>
      </div>
    );
  }

  // Hiển thị grid + phân trang
  return (
    <>
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedChallenges.map((ch, index) => (
          <div
            key={ch.id}
            className="transform transition-all duration-300 hover:scale-[1.02]"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <ChallengeCard
              challenge={ch}
              userProgress={challengeData}
              onClick={onChallengeClick}
            />
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-2 flex-wrap">
          {/* Prev */}
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 
              dark:border-gray-700 text-gray-700 dark:text-gray-300
              hover:bg-blue-100 dark:hover:bg-blue-900/30
              disabled:opacity-50 transition-all"
          >
            ← Trước
          </button>

          {/* Page numbers */}
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
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === page
                    ? "bg-linear-to-r from-blue-500 to-indigo-500 text-white shadow-md scale-105"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            )
          )}

          {/* Next */}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 
              dark:border-gray-700 text-gray-700 dark:text-gray-300
              hover:bg-blue-100 dark:hover:bg-blue-900/30
              disabled:opacity-50 transition-all"
          >
            Sau →
          </button>
        </div>
      )}
    </>
  );
};

export default ChallengesGrid;
