// import React from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Search } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function CourseFilters({
//   isDark,
//   searchTerm,
//   setSearchTerm,
//   filterLevel,
//   setFilterLevel,
//   languages,
//   selectedLang,
//   setSelectedLang,
// }) {
//   return (
//     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-5">
//       <h1
//         className={`text-3xl font-bold ${
//           isDark ? "text-gray-100" : "text-gray-900"
//         }`}
//       >
//         Danh sách khóa học
//       </h1>

//       <div className="flex flex-wrap gap-3 justify-end">
//         {/* Ô tìm kiếm */}
//         <div className="flex items-center w-full sm:w-[300px] relative">
//           <Search
//             className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
//               isDark ? "text-gray-400" : "text-gray-400"
//             }`}
//           />
//           <Input
//             type="text"
//             placeholder="Tìm kiếm khóa học..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className={`pl-10 py-3 text-base transition-colors ${
//               isDark
//                 ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
//                 : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
//             }`}
//           />
//         </div>

//         {/* Lọc cấp độ */}
//         <Select value={filterLevel} onValueChange={setFilterLevel}>
//           <SelectTrigger
//             className={`w-[160px] py-2.5 rounded-lg border transition-colors ${
//               isDark
//                 ? "bg-gray-800 border-gray-700 text-white"
//                 : "bg-white border-gray-300 text-gray-900"
//             }`}
//           >
//             <SelectValue placeholder="Chọn cấp độ" />
//           </SelectTrigger>
//           <SelectContent
//             className={isDark ? "bg-gray-800 border-gray-700" : ""}
//           >
//             <SelectItem value="all">Mọi cấp độ</SelectItem>
//             <SelectItem value="Beginner">Cơ bản</SelectItem>
//             <SelectItem value="Intermediate">Trung cấp</SelectItem>
//             <SelectItem value="Advanced">Nâng cao</SelectItem>
//           </SelectContent>
//         </Select>

//         {/* Lọc ngôn ngữ */}
//         <Select
//           value={selectedLang ? String(selectedLang) : "all"}
//           onValueChange={(value) =>
//             setSelectedLang(value === "all" ? null : Number(value))
//           }
//         >
//           <SelectTrigger
//             className={`w-[180px] py-2.5 rounded-lg border transition-colors ${
//               isDark
//                 ? "bg-gray-800 border-gray-700 text-white"
//                 : "bg-white border-gray-300 text-gray-900"
//             }`}
//           >
//             <SelectValue placeholder="Ngôn ngữ" />
//           </SelectTrigger>
//           <SelectContent
//             className={isDark ? "bg-gray-800 border-gray-700" : ""}
//           >
//             <SelectItem value="all">Tất cả ngôn ngữ</SelectItem>
//             {languages.map((lang) => (
//               <SelectItem key={lang.id} value={String(lang.id)}>
//                 {lang.name}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   );
// }
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

/**
 * Helper component để render các nút filter (Cấp độ, Chủ đề)
 * Giúp tránh lặp lại logic styling
 */
const FilterButton = ({ isDark, isActive, onClick, children }) => {
  // Style cho nút khi được chọn (active)
  const activeClass = "bg-purple-600 text-white hover:bg-purple-700";

  // Style cho nút khi không được chọn (inactive)
  const inactiveClass = isDark
    ? "bg-gray-700 text-gray-300 hover:bg-gray-600" // Dark mode
    : "bg-gray-100 text-gray-800 hover:bg-gray-200"; // Light mode

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 h-auto text-sm font-medium transition-colors ${
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
  filterLevel, // 'all', 'Beginner', 'Intermediate', 'Advanced'
  setFilterLevel,
  languages = [], // SỬA LỖI: Thêm giá trị mặc định là mảng rỗng
  selectedLang, // ID của chủ đề đang chọn (number) hoặc null
  setSelectedLang,
  sortOrder, // PROP MỚI: Giá trị của bộ lọc sắp xếp (ví dụ: 'newest')
  setSortOrder, // PROP MỚI: Hàm để cập nhật bộ lọc sắp xếp
}) {
  // Định nghĩa các cấp độ
  const levels = [
    { value: "all", label: "Tất cả" },
    { value: "Beginner", label: "Cơ bản" },
    { value: "Intermediate", label: "Trung cấp" },
    { value: "Advanced", label: "Nâng cao" },
  ];

  // Component này giả định 'languages' prop bây giờ là mảng các 'Chủ đề'
  // và 'selectedLang' là 'selectedTopic' (ID của chủ đề)

  return (
    <div className="flex flex-col gap-6 mb-8">
      {/* PHẦN MỚI: Tiêu đề và Mô tả */}
      <div className="mb-2">
        <h1
          className={`text-3xl sm:text-4xl font-bold ${
            isDark ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Khám phá các khóa học
        </h1>
        <p
          className={`mt-2 text-md ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Khám phá thư viện khóa học và bắt đầu hành trình lập trình của bạn
          ngay hôm nay.
        </p>
      </div>

      {/* Hàng 1: Tìm kiếm và Sắp xếp */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Ô tìm kiếm */}
        <div className="flex-grow flex items-center relative">
          <Search
            className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 ${
              isDark ? "text-gray-400" : "text-gray-400"
            }`}
          />
          <Input
            type="text"
            placeholder="Tìm kiếm theo tên khóa học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-11 pr-4 py-3 h-12 text-base w-full transition-colors rounded-lg ${
              isDark
                ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-purple-500"
                : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-purple-500"
            }`}
          />
        </div>

        {/* Sắp xếp (Control MỚI) */}
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger
            className={`w-full sm:w-[220px] h-12 py-3 px-4 text-base rounded-lg border transition-colors ${
              isDark
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <span className="text-gray-400 mr-2">Sắp xếp:</span>
            <SelectValue placeholder="Chọn thứ tự" />
          </SelectTrigger>
          <SelectContent
            className={
              isDark
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-900"
            }
          >
            <SelectItem value="newest">Mới nhất</SelectItem>
            <SelectItem value="popular">Phổ biến nhất</SelectItem>
            <SelectItem value="rating">Đánh giá cao</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Hàng 2: Các bộ lọc Cấp độ và Chủ đề */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        {/* Lọc cấp độ (Chuyển từ Select sang Button) */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-sm font-medium shrink-0 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Cấp độ:
          </span>
          <div className="flex items-center gap-2 flex-wrap">
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

        {/* Lọc Chủ đề (Chuyển từ Select sang Button, dùng prop 'languages') */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-sm font-medium shrink-0 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Chủ đề:
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Nút "Tất cả" */}
            <FilterButton
              isDark={isDark}
              isActive={selectedLang === null}
              onClick={() => setSelectedLang(null)}
            >
              Tất cả
            </FilterButton>

            {/* * Map qua mảng 'languages' (mà ta giả định là chủ đề)
             * Phải kiểm tra languages tồn tại (hoặc có giá trị mặc định)
             * vì nó là một prop có thể chưa sẵn sàng khi render
             */}
            {languages.map((lang) => (
              <FilterButton
                key={lang.id}
                isDark={isDark}
                isActive={selectedLang === lang.id}
                onClick={() => setSelectedLang(lang.id)}
              >
                {lang.name}
              </FilterButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
