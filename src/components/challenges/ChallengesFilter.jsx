// ============================================
// FILE: src/components/challenges/ChallengesFilter.jsx
// ============================================
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
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Tìm kiếm thử thách..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Tất cả độ khó" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả độ khó</SelectItem>
            <SelectItem value="Dễ">Dễ</SelectItem>
            <SelectItem value="Trung bình">Trung bình</SelectItem>
            <SelectItem value="Khó">Khó</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="points">Điểm (cao → thấp)</SelectItem>
            <SelectItem value="difficulty">Độ khó (dễ → khó)</SelectItem>
            <SelectItem value="participants">Người tham gia</SelectItem>
            <SelectItem value="successRate">Tỷ lệ thành công</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters} className="p-2">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 text-sm">
          {searchQuery && (
            <Badge
              variant="secondary"
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
            >
              Tìm kiếm: "{searchQuery}"
            </Badge>
          )}
          {difficultyFilter !== "all" && (
            <Badge
              variant="secondary"
              className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
            >
              Độ khó: {difficultyFilter}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
