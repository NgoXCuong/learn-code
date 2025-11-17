import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterButton = ({ isDark, isActive, onClick, children }) => {
  const activeClass =
    "bg-purple-600 text-white shadow-md hover:bg-purple-700 border-transparent";

  const inactiveClass = isDark
    ? "bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white"
    : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200";

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 h-auto text-sm font-medium transition-all duration-200 cursor-pointer ${
        isActive ? activeClass : inactiveClass
      }`}
    >
      {children}
    </Button>
  );
};

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
    { value: "all", label: "Tất cả" },
    { value: "Beginner", label: "Cơ bản" },
    { value: "Intermediate", label: "Trung cấp" },
    { value: "Advanced", label: "Nâng cao" },
  ];

  return (
    <div className="flex flex-col gap-6 mb-10 font-exo">
      {/* Tiêu đề & mô tả */}
      <div className="text-center sm:text-left space-y-2">
        <h1
          className={`text-3xl sm:text-4xl font-bold ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Khám phá các khóa học
        </h1>
        <p
          className={`text-base sm:text-lg ${
            isDark ? "text-gray-400" : "text-gray-700"
          }`}
        >
          Tìm kiếm và chọn khóa học phù hợp để nâng cao kỹ năng lập trình của
          bạn.
        </p>
      </div>

      {/* Thanh tìm kiếm + dropdown chủ đề */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Ô tìm kiếm */}
        <div className="relative grow">
          <Search
            className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <Input
            type="text"
            placeholder="Tìm kiếm theo tên khóa học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-11 pr-4 py-3 text-base rounded-lg transition-colors duration-200 ${
              isDark
                ? "bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-purple-500"
            }`}
          />
        </div>

        {/* Dropdown chọn chủ đề */}
        <Select
          value={selectedLang !== null ? String(selectedLang) : "all"}
          onValueChange={(val) =>
            setSelectedLang(val === "all" ? null : Number(val))
          }
        >
          <SelectTrigger
            className={`cursor-pointer w-full sm:w-[220px] h-12 py-3 px-4 text-base rounded-lg border transition-colors duration-200 ${
              isDark
                ? "bg-gray-900 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <span className="mr-2 text-gray-400">Ngôn ngữ:</span>
            <SelectValue placeholder="Chọn chủ đề" />
          </SelectTrigger>

          <SelectContent
            className={
              isDark
                ? "bg-gray-900 border-gray-700 text-white"
                : "bg-white border-gray-200 text-gray-900"
            }
          >
            <SelectItem value="all" className="cursor-pointer">
              Tất cả
            </SelectItem>
            {languages.map((lang) => (
              <SelectItem
                key={lang.id}
                value={String(lang.id)}
                className="cursor-pointer"
              >
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bộ lọc cấp độ & dãy nút chủ đề */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Cấp độ */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span
            className={`text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Cấp độ:
          </span>
          <div className="flex flex-wrap gap-2 ">
            {levels.map((level) => (
              <FilterButton
                key={level.value}
                isDark={isDark}
                isActive={filterLevel === level.value}
                onClick={() => setFilterLevel(level.value)}
              >
                {level.label}
              </FilterButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
