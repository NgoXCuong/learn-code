import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";

// 🔹 Import mock data
import { mockCourses, mockLanguages } from "../../mock/courses";

export default function CourseList({ selectedLang }) {
  const [courses, setCourses] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🟦 Load danh sách ngôn ngữ
  useEffect(() => {
    // Giả lập fetch API
    const loadLanguages = async () => {
      setLanguages(mockLanguages);
    };
    loadLanguages();
  }, []);

  // 🟨 Load danh sách khóa học
  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        let data;
        if (selectedLang)
          data = mockCourses.filter(
            (course) => course.lang_id === Number(selectedLang)
          );
        else data = mockCourses;
        setCourses(data);
      } catch (err) {
        console.error("Lỗi load courses:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, [selectedLang]);

  // 🟩 Khi nhấn vào 1 khóa học
  const handleEnroll = (courseId) => navigate(`/courses/${courseId}`);

  if (loading)
    return (
      <p className="text-center text-gray-500 dark:text-gray-300 mt-6">
        Đang tải khóa học...
      </p>
    );

  if (courses.length === 0)
    return (
      <p className="text-center text-gray-500 dark:text-gray-300 mt-6">
        Không có khóa học nào.
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => {
        const lang = languages.find((l) => l.id === course.lang_id);
        if (!lang) return null;
        return (
          <CourseCard
            key={course.id}
            course={course}
            language={lang}
            onEnroll={handleEnroll}
          />
        );
      })}
    </div>
  );
}
