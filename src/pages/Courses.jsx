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
        isDark
          ? "bg-linear-to-br from-gray-900 via-gray-800 to-black"
          : "bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100"
      }`}
    >
      <Header />

      <main className="grow w-full px-6 sm:px-14 lg:px-20 py-6">
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
