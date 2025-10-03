import React, { useEffect, useState } from "react";
import CourseList from "../components/courses/CourseList";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumb from "../components/layout/Breadcrumb";
import { fetchLanguages } from "../api/coursesApi";

export default function Courses() {
  const [languages, setLanguages] = useState([]);
  const [selectedLang, setSelectedLang] = useState(null);

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Khóa học" },
  ];

  // Load danh sách ngôn ngữ
  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const langs = await fetchLanguages();
        setLanguages(langs);
      } catch (err) {
        console.error(err);
      }
    };
    loadLanguages();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Header />

      <main className="flex-grow w-full px-6 sm:px-14 lg:px-20 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Danh sách khóa học
          </h1>

          <select
            value={selectedLang || ""}
            onChange={(e) =>
              setSelectedLang(e.target.value ? Number(e.target.value) : null)
            }
            className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="">Tất cả</option>
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <CourseList selectedLang={selectedLang} />
      </main>

      <Footer className="mt-auto" />
    </div>
  );
}
