import React, { useContext, useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeContext } from "@/context/ThemeContext";
import { mockCourses } from "@/mock/courses";
import FeedbackHero from "@/components/feedback/FeedbackHero";
import FeedbackStats from "@/components/feedback/FeedbackStats";
import FeedbackTabs from "@/components/feedback/FeedbackTabs";
import FeedbackContent from "@/components/feedback/FeedbackContent";
import FeedbackButtons from "@/components/feedback/FeedbackButtons";

export default function Feedback() {
  const { theme } = useContext(ThemeContext);
  const { state } = useLocation();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("feedback");

  // For next lesson navigation
  const { courseId, lessonId } = useParams();
  const navigateNext = useNavigate();
  const courses = mockCourses;
  let nextLesson = null;
  if (courses.length > 0 && courseId && lessonId) {
    const course = courses.find((c) => c.id === courseId);
    if (course && course.lessons) {
      const currentIndex = course.lessons.findIndex((l) => l.id === lessonId);
      nextLesson = course.lessons[currentIndex + 1];
    }
  }

  // Get feedback from state or use default
  const passedFeedback = state?.feedback;

  // Random trạng thái thành công / thất bại if no feedback passed
  const [passed, setPassed] = useState(true);
  useEffect(() => {
    if (!passedFeedback) {
      const randomPassed = Math.random() < 0.5; // 50% true / 50% false
      setPassed(randomPassed);
    }
  }, [passedFeedback]);

  const defaultFeedback = {
    passed: passed,
    score: passed ? 95 : 40,
    testsPassed: passed ? 8 : 3,
    totalTests: 10,
    comments: [
      {
        type: "success",
        text: "Bạn đã khai báo biến và kiểu dữ liệu chính xác",
      },
      {
        type: "success",
        text: "Cấu trúc điều khiển (if, for) được sử dụng đúng cách",
      },
      { type: "success", text: "Kết quả in ra đúng theo yêu cầu của bài tập" },
      { type: "warning", text: "Có thể tối ưu thuật toán để giảm độ phức tạp" },
      { type: "info", text: "Nên thêm comment để code dễ hiểu hơn" },
    ],
    suggestions: [
      "Sử dụng HashMap thay vì nested loops để tối ưu độ phức tạp từ O(n²) xuống O(n)",
      "Xem xét edge cases: mảng rỗng, số âm, số trùng lặp",
      "Thêm validation đầu vào để tránh lỗi runtime",
    ],
  };

  const feedback = passedFeedback || defaultFeedback;

  const solutionCode = `public class Main {
    public static void main(String[] args) {
        int age = 20;
        if(age >= 18) {
            System.out.println("Bạn đã trưởng thành");
        } else {
            System.out.println("Bạn chưa trưởng thành");
        }
    }
}`;

  const navigate = () => window.history.back();

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-300 ${
        isDark
          ? "dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-100"
          : "bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900"
      }`}
    >
      <Header />
      <main className="flex-1 w-full">
        <FeedbackHero feedback={feedback} isDark={isDark} />
        <FeedbackStats feedback={feedback} isDark={isDark} />

        <div className="max-w-7xl mx-auto px-6 py-8">
          <FeedbackTabs
            isDark={isDark}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <FeedbackContent
            activeTab={activeTab}
            feedback={feedback}
            isDark={isDark}
            solutionCode={solutionCode}
          />

          <FeedbackButtons
            isDark={isDark}
            onBack={navigate}
            nextLesson={nextLesson}
            onNextLesson={() =>
              navigateNext(`/courses/${courseId}/lessons/${nextLesson.id}`)
            }
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
