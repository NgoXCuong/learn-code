import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TIMEFRAMES, LANGUAGES } from "@/utils/utilsRanking";

export default function HeaderSection({
  search,
  setSearch,
  timeframe,
  setTimeframe,
  language,
  setLanguage,
  setPage,
}) {
  return (
    <div className="mb-10 rounded-lg p-6 dark:text-gray-200">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Bảng Xếp Hạng</h1>
        <p className="text-muted-foreground text-base dark:text-gray-400">
          Cạnh tranh và chinh phục đỉnh cao cùng cộng đồng
        </p>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Timeframe Tabs */}
        <Tabs
          value={timeframe}
          onValueChange={(v) => {
            setTimeframe(v);
            setPage(1);
          }}
          className="w-full lg:w-auto"
        >
          <TabsList
            className="
    grid grid-cols-3 lg:flex 
    bg-gray-100 dark:bg-gray-800/60
    rounded-lg p-2
    shadow-inner border border-gray-200 dark:border-gray-700
  "
          >
            {TIMEFRAMES.map((t) => {
              const Icon = t.icon;
              return (
                <TabsTrigger
                  key={t.id}
                  value={t.id}
                  className="
          flex items-center gap-2 justify-center
          px-4 py-3 md:px-5 md:py-4 rounded-lg font-medium
          transition-all duration-200
          text-gray-600 dark:text-gray-300
          hover:bg-blue-100 dark:hover:bg-blue-800/40
          data-[state=active]:bg-linear-to-r
          data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500
          data-[state=active]:text-white
          data-[state=active]:shadow-md
          data-[state=active]:scale-[1.03]
          data-[state=active]:border-transparent
        "
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Search + Course Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Tìm người học..."
              className="pl-10 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
            />
          </div>

          {/* Language Select */}
          <Select
            value={language}
            onValueChange={(value) => {
              setLanguage(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[150px] border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <SelectValue placeholder="Chọn ngôn ngữ" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.id} value={lang.id}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
