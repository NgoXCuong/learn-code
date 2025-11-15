import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Pagination({
  currentPage,
  totalPages,
  totalUsers,
  onPrev,
  onNext,
}) {
  return (
    <div
      className="
        flex items-center justify-between px-6 py-4
        bg-gray-50 border-t border-gray-200
        dark:bg-gray-900 dark:border-gray-700
      "
    >
      <p className="text-sm text-gray-700 dark:text-gray-300">
        Trang <span className="font-bold">{currentPage}</span> /
        <span className="font-bold">{totalPages}</span> ·
        <span className="font-bold ml-1">{totalUsers}</span> người học
      </p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={onPrev}
          className="
            flex items-center gap-2 rounded-xl px-4 py-2
            text-gray-700 dark:text-gray-200
            border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-800
            hover:bg-gray-100 dark:hover:bg-gray-700
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <ChevronLeft className="w-4 h-4" />
          Trước
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={onNext}
          className="
            flex items-center gap-2 rounded-xl px-4 py-2
            text-gray-700 dark:text-gray-200
            border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-800
            hover:bg-gray-100 dark:hover:bg-gray-700
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          Sau
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
