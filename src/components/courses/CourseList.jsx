import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";
import { mockCourses, mockLanguages } from "../../mock/courses";

export default function CourseList({ selectedLang }) {
  const [courses, setCourses] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLanguages(mockLanguages);
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      const data = selectedLang
        ? mockCourses.filter((c) => c.lang_id === Number(selectedLang))
        : mockCourses;
      setCourses(data);
    } catch (err) {
      console.error("Lỗi load courses:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedLang]);

  const handleEnroll = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

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
            key={course.id} // ✅ đảm bảo key duy nhất
            course={course}
            language={lang}
            onEnroll={handleEnroll} // click card hoặc nút đều dẫn đúng
          />
        );
      })}
    </div>
  );
}
