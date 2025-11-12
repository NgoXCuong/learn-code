import React from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";
import { Button } from "@/components/ui/button";

export default function CourseList({
  courses,
  currentPage,
  totalPages,
  onPageChange,
  clearFilters, // ✅ thêm prop clearFilters
}) {
  const navigate = useNavigate();

  const handleEnroll = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  // Nếu không có khóa học nào
  if (!courses || courses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Không tìm thấy khóa học
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
            key={`${currentPage}-${course.id}-${idx}`} // ✅ duy nhất
            course={course}
            language={course.language}
            onEnroll={handleEnroll}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
          {/* Nút Trước */}
          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="flex items-center gap-1 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
          >
            <span className="hidden sm:inline">← Trước</span>
          </Button>

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

          {/* Nút Sau */}
          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="flex items-center gap-1 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
          >
            <span className="hidden sm:inline">Sau →</span>
          </Button>
        </div>
      )}
    </>
  );
}
