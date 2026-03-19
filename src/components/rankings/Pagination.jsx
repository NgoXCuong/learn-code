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
    <div className="mt-12 mb-20 flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        Trang <span className="text-indigo-600 dark:text-indigo-400 font-bold">{currentPage}</span> / {totalPages} 
        <span className="mx-2 text-slate-300 dark:text-slate-700">|</span> 
        Hiển thị <span className="text-slate-900 dark:text-white font-bold">{totalUsers}</span> người học
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className={`group flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 border
                      ${currentPage === 1 
                        ? "opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent" 
                        : "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 shadow-sm active:scale-95"}`}
        >
          <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${currentPage !== 1 && "group-hover:-translate-x-1"}`} />
          Trước
        </button>

        <div className="flex items-center gap-1.5 px-2">
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            // Simple logic to show pages around current
            let pageNum = i + 1;
            if (totalPages > 5) {
                if (currentPage > 3) pageNum = currentPage - 3 + i;
                if (pageNum > totalPages) pageNum = totalPages - 4 + i;
            }
            if (pageNum <= 0) return null;
            if (pageNum > totalPages) return null;

            return (
              <button
                key={pageNum}
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all duration-300
                            ${currentPage === pageNum
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 scale-105"
                  : "text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"}`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className={`group flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 border
                      ${currentPage === totalPages 
                        ? "opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent" 
                        : "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 shadow-sm active:scale-95"}`}
        >
          Sau
          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${currentPage !== totalPages && "group-hover:translate-x-1"}`} />
        </button>
      </div>
    </div>
  );
}
