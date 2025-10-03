/// src/components/courses/CourseList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchCourses,
  fetchLanguages,
  fetchCoursesByLang,
} from "../../api/coursesApi";
import CourseCard from "./CourseCard";

export default function CourseList({ selectedLang }) {
  const [courses, setCourses] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load languages lúc đầu
  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const langs = await fetchLanguages();
        setLanguages(langs);
      } catch (err) {
        console.error("Lỗi load languages:", err);
      }
    };
    loadLanguages();
  }, []);

  // Load courses mỗi khi selectedLang thay đổi
  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        let data;
        if (selectedLang) {
          data = await fetchCoursesByLang(selectedLang);
        } else {
          data = await fetchCourses();
        }
        setCourses(data);
      } catch (err) {
        console.error("Lỗi load courses:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, [selectedLang]);

  const handleEnroll = (courseId) => navigate(`/courses/${courseId}`);

  if (loading) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-300 mt-6">
        Đang tải khóa học...
      </p>
    );
  }

  if (courses.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-300 mt-6">
        Không có khóa học nào.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 ">
      {courses.map((course) => {
        const lang = languages.find(
          (l) => String(l.id) === String(course.lang_id)
        );
        if (!lang) return null; // bỏ qua nếu không tìm thấy
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
