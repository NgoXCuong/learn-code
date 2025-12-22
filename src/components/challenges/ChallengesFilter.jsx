import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const ChallengesFilter = ({
  searchQuery,
  setSearchQuery,
  difficultyFilter,
  setDifficultyFilter,
  sortBy,
  setSortBy,
  clearFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
      {/* Filter Row */}
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500" />
          <Input
            type="text"
            placeholder="Tìm kiếm thử thách..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-auto pl-9 sm:pl-10 pr-4 py-1.5 text-sm sm:text-base placeholder:text-sm sm:placeholder:text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors"
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:w-auto lg:min-w-[400px]">
          {/* Difficulty Filter */}
          <div className="w-full sm:w-auto sm:min-w-[140px] lg:flex-1">
            <Select
              value={difficultyFilter}
              onValueChange={setDifficultyFilter}
            >
              <SelectTrigger className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm py-1.5 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors">
                <SelectValue placeholder="Tất cả độ khó" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <SelectItem value="all">Tất cả độ khó</SelectItem>
                <SelectItem value="Dễ">Dễ</SelectItem>
                <SelectItem value="Trung bình">Trung bình</SelectItem>
                <SelectItem value="Khó">Khó</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Filter */}
          <div className="w-full sm:w-auto sm:min-w-40 lg:flex-1">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm py-1.5 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors">
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <SelectItem value="points">Điểm (cao → thấp)</SelectItem>
                <SelectItem value="difficulty">Độ khó (dễ → khó)</SelectItem>
                <SelectItem value="participants">Người tham gia</SelectItem>
                <SelectItem value="successRate">Tỷ lệ thành công</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Button */}
          {hasActiveFilters && (
            <div className="w-full sm:w-auto ">
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full sm:w-auto px-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-colors"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Active Filters Badge */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 text-sm">
          {searchQuery && (
            <Badge
              variant="secondary"
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm"
            >
              Tìm kiếm: "{searchQuery}"
            </Badge>
          )}

          {difficultyFilter !== "all" && (
            <Badge
              variant="secondary"
              className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm"
            >
              Độ khó: {difficultyFilter}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
