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

export default function CourseFilters({
  isDark,
  searchTerm,
  setSearchTerm,
  filterLevel,
  setFilterLevel,
  languages,
  selectedLang,
  setSelectedLang,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-5">
      <h1
        className={`text-3xl font-bold ${
          isDark ? "text-gray-100" : "text-gray-900"
        }`}
      >
        Danh sách khóa học
      </h1>

      <div className="flex flex-wrap gap-3 justify-end">
        {/* Ô tìm kiếm */}
        <div className="flex items-center w-full sm:w-[300px] relative">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
              isDark ? "text-gray-400" : "text-gray-400"
            }`}
          />
          <Input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 py-3 text-base transition-colors ${
              isDark
                ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
            }`}
          />
        </div>

        {/* Lọc cấp độ */}
        <Select value={filterLevel} onValueChange={setFilterLevel}>
          <SelectTrigger
            className={`w-[160px] py-2.5 rounded-lg border transition-colors ${
              isDark
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <SelectValue placeholder="Chọn cấp độ" />
          </SelectTrigger>
          <SelectContent
            className={isDark ? "bg-gray-800 border-gray-700" : ""}
          >
            <SelectItem value="all">Mọi cấp độ</SelectItem>
            <SelectItem value="Beginner">Cơ bản</SelectItem>
            <SelectItem value="Intermediate">Trung cấp</SelectItem>
            <SelectItem value="Advanced">Nâng cao</SelectItem>
          </SelectContent>
        </Select>

        {/* Lọc ngôn ngữ */}
        <Select
          value={selectedLang ? String(selectedLang) : "all"}
          onValueChange={(value) =>
            setSelectedLang(value === "all" ? null : Number(value))
          }
        >
          <SelectTrigger
            className={`w-[180px] py-2.5 rounded-lg border transition-colors ${
              isDark
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <SelectValue placeholder="Ngôn ngữ" />
          </SelectTrigger>
          <SelectContent
            className={isDark ? "bg-gray-800 border-gray-700" : ""}
          >
            <SelectItem value="all">Tất cả ngôn ngữ</SelectItem>
            {languages.map((lang) => (
              <SelectItem key={lang.id} value={String(lang.id)}>
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
