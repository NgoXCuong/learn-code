import React, { useState, useEffect, useMemo, useContext } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import CourseList from "@/components/courses/CourseList";
import CourseFilters from "@/components/courses/CourseFilters";
import { Loading } from "@/components/layout/Loading";
import { fetchCourses, fetchLanguages } from "@/api/coursesApi";
import { ThemeContext } from "@/context/ThemeContext";
import { toast } from "sonner";

export default function CoursesPage() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [courses, setCourses] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLang, setSelectedLang] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Khóa học" },
  ];

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [coursesData, languagesData] = await Promise.all([
          fetchCourses(),
          fetchLanguages(),
        ]);

        setCourses(coursesData);
        setLanguages(languagesData);
      } catch (err) {
        console.error("Error loading courses:", err);
        setError("Không thể tải danh sách khóa học. Vui lòng thử lại.");
        toast.error("Không thể tải danh sách khóa học");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const levelMap = {
    Beginner: "Cơ bản",
    Intermediate: "Trung cấp",
    Advanced: "Nâng cao",
  };

  const filteredCourses = useMemo(() => {
    if (!courses.length) return [];

    return courses
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
        language: languages.find((l) => l.id === course.lang_id),
      }));
  }, [courses, languages, searchTerm, filterLevel, sortBy, selectedLang]);

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

      <main className="grow w-full px-6 sm:px-14 lg:px-20 py-2 sm:py-4">
        <Breadcrumb items={breadcrumbItems} />

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loading />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Thử lại
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </main>

      <Footer className="mt-auto" />
    </div>
  );
}
