import React from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";

export default function CourseList({
  courses,
  currentPage,
  totalPages,
  onPageChange,
  clearFilters,
}) {
  const navigate = useNavigate();

  const handleEnroll = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-12 font-exo">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Không tìm thấy khóa học
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Thử điều chỉnh bộ lọc hoặc tìm kiếm của bạn
        </p>
        <button
          onClick={clearFilters}
          className="btn-shimmer px-6 py-2 border text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          Xóa bộ lọc
        </button>
      </div>
    );
  }

  // --- Pagination rút gọn ---
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

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.map((course, idx) => (
          <CourseCard
            key={`${currentPage}-${course.id}-${idx}`}
            course={course}
            language={course.language}
            onEnroll={handleEnroll}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
          {/* Nút Trước */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-500 border border-transparent"
                  : "hover:bg-blue-50 dark:hover:bg-blue-900/40 text-gray-800 dark:text-gray-200 border border-transparent"
              }`}
          >
            ← Trước
          </button>

          {/* Danh sách số trang */}
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
                onClick={() => onPageChange(page)}
                className={`w-9 h-9 rounded-xl font-medium border transition-all duration-200 
                  ${
                    currentPage === page
                      ? "bg-linear-to-r from-blue-500 to-indigo-500 text-white shadow-md border-transparent scale-105"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
              >
                {page}
              </button>
            )
          )}

          {/* Nút Sau */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-500 border border-transparent"
                  : "hover:bg-blue-50 dark:hover:bg-blue-900/40 text-gray-800 dark:text-gray-200 border border-transparent"
              }`}
          >
            Sau →
          </button>
        </div>
      )}
    </>
  );
}
