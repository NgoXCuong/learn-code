import React from "react";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";

const FilterPill = ({ active, onClick, children, isDark }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer
      ${active 
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-500/20" 
        : isDark 
          ? "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white" 
          : "bg-white text-slate-600 hover:bg-slate-50 shadow-sm border border-slate-200"}`}
  >
    {children}
  </button>
);

export default function CourseFilters({
  isDark,
  searchTerm,
  setSearchTerm,
  filterLevel,
  setFilterLevel,
  languages = [],
  selectedLang,
  setSelectedLang,
}) {
  const levels = [
    { value: "all", label: "Tất cả cấp độ" },
    { value: "Beginner", label: "Cơ bản" },
    { value: "Intermediate", label: "Trung cấp" },
    { value: "Advanced", label: "Nâng cao" },
  ];

  return (
    <div className="flex flex-col gap-6 mb-8 w-full">
      {/* Top Bar: Search & Compact Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Modern Search Input */}
        <div className="relative flex-1 group w-full">
          <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 ${searchTerm ? "text-indigo-500" : "text-gray-400"}`}>
            <Search className="h-5 w-5" />
          </div>
          <Input
            type="text"
            placeholder="Tìm kiếm khóa học, ngôn ngữ hoặc kỹ năng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full h-12 pl-12 pr-12 text-base rounded-2xl border-2 transition-all duration-300 focus:ring-4
              ${isDark 
                ? "bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-indigo-500/50 focus:ring-indigo-500/10" 
                : "bg-white border-slate-100 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-indigo-500/30 focus:ring-indigo-500/5"}`}
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Level Selector - Compact */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl border bg-slate-50/50 dark:bg-gray-900/50 border-slate-200 dark:border-gray-700 w-full md:w-auto">
            <div className="hidden lg:flex items-center gap-2 px-3 text-gray-400">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap">Độ khó</span>
            </div>
            <div className="flex gap-1 overflow-x-auto no-scrollbar w-full md:w-auto">
                {levels.map((level) => (
                    <button
                        key={level.value}
                        onClick={() => setFilterLevel(level.value)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap
                            ${filterLevel === level.value 
                                ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}
                    >
                        {level.label}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* Language Pills Bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1 overflow-x-auto no-scrollbar py-2">
            <div className="flex items-center gap-3">
                <FilterPill 
                    isDark={isDark} 
                    active={selectedLang === null} 
                    onClick={() => setSelectedLang(null)}
                >
                    Tất cả ngôn ngữ
                </FilterPill>
                {languages.map((lang) => (
                    <FilterPill
                        key={lang.id}
                        isDark={isDark}
                        active={selectedLang === lang.id}
                        onClick={() => setSelectedLang(lang.id)}
                    >
                        {lang.name}
                    </FilterPill>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
