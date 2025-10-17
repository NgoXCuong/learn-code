import React, { useEffect, useState } from "react";
import CourseList from "../components/courses/CourseList";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumb from "../components/layout/Breadcrumb";

// 🟢 Import mock data thay vì fetch API
import { mockLanguages } from "../mock/courses";

export default function Courses() {
  const [languages, setLanguages] = useState([]);
  const [selectedLang, setSelectedLang] = useState(null);

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Khóa học" },
  ];

  // 🟦 Load danh sách ngôn ngữ từ mock
  useEffect(() => {
    setLanguages(mockLanguages);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <Header />

      <main className=" flex-grow w-full px-6 sm:px-14 lg:px-20 py-6">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-5">
          {/* 🔹 Tiêu đề */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Danh sách khóa học
          </h1>

          {/* 🔹 Bộ lọc ngôn ngữ */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="language-select"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Lọc theo ngôn ngữ:
            </label>

            <div className="relative">
              <select
                id="language-select"
                value={selectedLang || ""}
                onChange={(e) =>
                  setSelectedLang(
                    e.target.value ? Number(e.target.value) : null
                  )
                }
                className="
                  appearance-none
                  px-4 py-2 pr-10
                  rounded-lg
                  border border-gray-300 dark:border-gray-700
                  bg-white dark:bg-gray-800
                  text-gray-900 dark:text-gray-100
                  text-sm
                  shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  hover:border-blue-400 dark:hover:border-blue-500
                  transition-all duration-200 ease-in-out
                  cursor-pointer
                "
              >
                <option value="">🌐 Tất cả</option>
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.name}
                  </option>
                ))}
              </select>

              {/* 🔹 Icon mũi tên */}
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* 🔸 Hiển thị danh sách khóa học */}
        <CourseList selectedLang={selectedLang} />
      </main>

      <Footer className="mt-auto" />
    </div>
  );
}
