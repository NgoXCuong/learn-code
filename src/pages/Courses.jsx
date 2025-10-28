// import React, { useState, useEffect, useMemo, useContext } from "react";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import Breadcrumb from "@/components/layout/Breadcrumb";
// import CourseList from "@/components/courses/CourseList";
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
// import { mockLanguages, mockCourses } from "@/mock/courses";
// import { ThemeContext } from "@/context/ThemeContext"; // Import ThemeContext

// export default function Courses() {
//   // Dùng ThemeContext thay vì local state
//   const { theme } = useContext(ThemeContext);
//   const isDark = theme === "dark";

//   const [languages, setLanguages] = useState([]);
//   const [selectedLang, setSelectedLang] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterLevel, setFilterLevel] = useState("all");
//   const [sortBy, setSortBy] = useState("popular");
//   // ✅ Thêm state cho pagination
//   const [currentPage, setCurrentPage] = useState(1);

//   const breadcrumbItems = [
//     { label: "Trang chủ", href: "/" },
//     { label: "Khóa học" },
//   ];

//   useEffect(() => {
//     setLanguages(mockLanguages);
//   }, []);

//   // Map English filter to Vietnamese levels
//   const levelMap = {
//     Beginner: "Cơ bản",
//     Intermediate: "Trung cấp",
//     Advanced: "Nâng cao",
//   };

//   const filteredCourses = useMemo(() => {
//     return mockCourses
//       .filter((course) => {
//         const matchesSearch =
//           course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           course.description.toLowerCase().includes(searchTerm.toLowerCase());

//         const matchesLevel =
//           filterLevel === "all" ||
//           course.level === (levelMap[filterLevel] || filterLevel);

//         const matchesLang = !selectedLang || course.lang_id === selectedLang;

//         return matchesSearch && matchesLevel && matchesLang;
//       })
//       .sort((a, b) => {
//         switch (sortBy) {
//           case "popular":
//             return b.students - a.students;
//           case "rating":
//             return b.rating - a.rating;
//           case "newest":
//             return b.id - a.id;
//           default:
//             return 0;
//         }
//       })
//       .map((course) => ({
//         ...course,
//         language: mockLanguages.find((l) => l.id === course.lang_id),
//       }));
//   }, [searchTerm, filterLevel, sortBy, selectedLang]);

//   // Phân trang
//   const coursesPerPage = 6; // số khóa học mỗi trang
//   const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
//   const indexOfLastCourse = currentPage * coursesPerPage;
//   const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
//   const currentCourses = filteredCourses.slice(
//     indexOfFirstCourse,
//     indexOfLastCourse
//   );
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, filterLevel, selectedLang, sortBy]);

//   const handleClearFilters = () => {
//     setSearchTerm("");
//     setFilterLevel("all");
//     setSelectedLang(null);
//     setSortBy("popular");
//   };

//   return (
//     <div
//       className={`flex flex-col min-h-screen transition-colors duration-500 ${
//         isDark ? "bg-gray-900" : "bg-gradient-to-br from-slate-50 to-blue-50"
//       }`}
//     >
//       <Header />

//       <main className="flex-grow w-full px-6 sm:px-14 lg:px-20 py-6">
//         <Breadcrumb items={breadcrumbItems} />

//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-5">
//           <h1
//             className={`text-3xl font-bold ${
//               isDark ? "text-gray-100" : "text-gray-900"
//             }`}
//           >
//             Danh sách khóa học
//           </h1>

//           <div className="flex flex-wrap gap-3 justify-end">
//             <div className="flex items-center w-full sm:w-[300px] relative">
//               <Input
//                 type="text"
//                 placeholder="Tìm kiếm khóa học..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className={`py-3 text-base transition-colors ${
//                   isDark
//                     ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
//                     : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
//                 }`}
//               />
//               <Button
//                 size="icon"
//                 variant="ghost"
//                 onClick={() => console.log("Search:", searchTerm)}
//                 className="absolute right-1 top-1/2 -translate-y-1/2"
//               >
//                 <Search
//                   className={`w-5 h-5 ${
//                     isDark ? "text-gray-400" : "text-gray-500"
//                   }`}
//                 />
//               </Button>
//             </div>

//             <Select value={filterLevel} onValueChange={setFilterLevel}>
//               <SelectTrigger
//                 className={`w-[160px] py-2.5 rounded-lg border transition-colors ${
//                   isDark
//                     ? "bg-gray-800 border-gray-700 text-white"
//                     : "bg-white border-gray-300 text-gray-900"
//                 }`}
//               >
//                 <SelectValue placeholder="Chọn cấp độ" />
//               </SelectTrigger>
//               <SelectContent
//                 className={isDark ? "bg-gray-800 border-gray-700" : ""}
//               >
//                 <SelectItem value="all">Mọi cấp độ</SelectItem>
//                 <SelectItem value="Beginner">Cơ bản</SelectItem>
//                 <SelectItem value="Intermediate">Trung cấp</SelectItem>
//                 <SelectItem value="Advanced">Nâng cao</SelectItem>
//               </SelectContent>
//             </Select>

//             <Select
//               value={selectedLang ? String(selectedLang) : "all"}
//               onValueChange={(value) =>
//                 setSelectedLang(value === "all" ? null : Number(value))
//               }
//             >
//               <SelectTrigger
//                 className={`w-[180px] py-2.5 rounded-lg border transition-colors ${
//                   isDark
//                     ? "bg-gray-800 border-gray-700 text-white"
//                     : "bg-white border-gray-300 text-gray-900"
//                 }`}
//               >
//                 <SelectValue placeholder="Ngôn ngữ" />
//               </SelectTrigger>
//               <SelectContent
//                 className={isDark ? "bg-gray-800 border-gray-700" : ""}
//               >
//                 <SelectItem value="all">Tất cả ngôn ngữ</SelectItem>
//                 {languages.map((lang) => (
//                   <SelectItem key={lang.id} value={String(lang.id)}>
//                     {lang.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* <CourseList courses={filteredCourses} /> */}
//         <CourseList
//           key={currentPage} // ✅ force CourseList re-mount mỗi khi trang thay đổi
//           courses={currentCourses}
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//           clearFilters={handleClearFilters} // hàm xử lý xóa filter
//         />
//       </main>

//       <Footer className="mt-auto" />
//     </div>
//   );
// }

import React, { useState, useEffect, useMemo, useContext } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import CourseList from "@/components/courses/CourseList";
import CourseFilters from "@/components/courses/CourseFilters";
import { mockLanguages, mockCourses } from "@/mock/courses";
import { ThemeContext } from "@/context/ThemeContext";

export default function CoursesPage() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [languages, setLanguages] = useState([]);
  const [selectedLang, setSelectedLang] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Khóa học" },
  ];

  useEffect(() => setLanguages(mockLanguages), []);

  const levelMap = {
    Beginner: "Cơ bản",
    Intermediate: "Trung cấp",
    Advanced: "Nâng cao",
  };

  const filteredCourses = useMemo(() => {
    return mockCourses
      .filter((course) => {
        const matchesSearch =
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesLevel =
          filterLevel === "all" ||
          course.level === (levelMap[filterLevel] || filterLevel);

        const matchesLang = !selectedLang || course.lang_id === selectedLang;

        return matchesSearch && matchesLevel && matchesLang;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "popular":
            return b.students - a.students;
          case "rating":
            return b.rating - a.rating;
          case "newest":
            return b.id - a.id;
          default:
            return 0;
        }
      })
      .map((course) => ({
        ...course,
        language: mockLanguages.find((l) => l.id === course.lang_id),
      }));
  }, [searchTerm, filterLevel, sortBy, selectedLang]);

  // Pagination
  const coursesPerPage = 6;
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfLastCourse - coursesPerPage,
    indexOfLastCourse
  );

  useEffect(
    () => setCurrentPage(1),
    [searchTerm, filterLevel, selectedLang, sortBy]
  );

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterLevel("all");
    setSelectedLang(null);
    setSortBy("popular");
  };

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-500 ${
        isDark ? "bg-gray-900" : "bg-gradient-to-br from-slate-50 to-blue-50"
      }`}
    >
      <Header />

      <main className="flex-grow w-full px-6 sm:px-14 lg:px-20 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <CourseFilters
          isDark={isDark}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterLevel={filterLevel}
          setFilterLevel={setFilterLevel}
          languages={languages}
          selectedLang={selectedLang}
          setSelectedLang={setSelectedLang}
        />

        <CourseList
          key={currentPage}
          courses={currentCourses}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          clearFilters={handleClearFilters}
        />
      </main>

      <Footer className="mt-auto" />
    </div>
  );
}
