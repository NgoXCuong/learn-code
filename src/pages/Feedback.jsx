import React, { useContext, useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeContext } from "@/context/ThemeContext";
import { api } from "@/services/coursesApi";
import { feedbackApi } from "@/services/feedbackApi";
import FeedbackHero from "@/components/feedback/FeedbackHero";
import FeedbackStats from "@/components/feedback/FeedbackStats";
import FeedbackTabs from "@/components/feedback/FeedbackTabs";
import FeedbackContent from "@/components/feedback/FeedbackContent";
import FeedbackButtons from "@/components/feedback/FeedbackButtons";
import { Loading } from "@/components/layout/Loading";
import { toast } from "sonner";

export default function Feedback() {
  const { theme } = useContext(ThemeContext);
  const { state } = useLocation();
  const isDark = theme === "dark";
  const [activeTab, setActiveTab] = useState("feedback");
  const [courses, setCourses] = useState([]);
  const [nextLesson, setNextLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [solutionCode, setSolutionCode] = useState("");

  // For next lesson navigation
  const { courseId, lessonId } = useParams();
  const navigateNext = useNavigate();

  // Load courses and find next lesson
  useEffect(() => {
    const loadCoursesData = async () => {
      if (!courseId || !lessonId) return;

      try {
        setLoading(true);
        const coursesData = await api.fetchCourses();
        setCourses(coursesData);

        // Find next lesson
        const course = coursesData.find((c) => c.id.toString() === courseId);
        if (course && Array.isArray(course.lessons)) {
          const currentIndex = course.lessons.findIndex(
            (l) => l.id.toString() === lessonId
          );
          if (currentIndex !== -1) {
            const nextLessonData = course.lessons[currentIndex + 1];
            setNextLesson(nextLessonData || null);
          }
        }
      } catch (err) {
        console.error("Error loading courses data:", err);
        toast.error("Không thể tải dữ liệu khóa học");
      } finally {
        setLoading(false);
      }
    };

    loadCoursesData();
  }, [courseId, lessonId]);

  // Load feedback data
  useEffect(() => {
    const loadFeedback = async () => {
      try {
        // Get feedback from state first (from compiler submit)
        const passedFeedback = state?.feedback;
        if (passedFeedback) {
          console.log("Using feedback from state:", passedFeedback);

          // Normalize data structure for components
          const isPassed = passedFeedback.passed || false;

          // Build comments array
          const compilerComments = passedFeedback.comments || [
            {
              type: isPassed ? "success" : "warning",
              text: passedFeedback.message || "Feedback from compiler",
            },
          ];

          const additionalComments = [
            {
              type: "info",
              text: isPassed
                ? "Code của bạn đã pass tất cả test cases!"
                : "Hãy kiểm tra lại logic và test cases.",
            },
            {
              type: isPassed ? "success" : "warning",
              text: isPassed
                ? "Cấu trúc code rõ ràng và dễ hiểu."
                : "Cần cải thiện cấu trúc code.",
            },
            {
              type: "info",
              text: isPassed
                ? "💡 Mẹo: Có thể tối ưu thuật toán để performance tốt hơn"
                : "📖 Đọc kỹ yêu cầu bài tập trước khi code",
            },
          ];

          const allComments = [...compilerComments, ...additionalComments];

          console.log("Compiler comments:", compilerComments);
          console.log("Additional comments:", additionalComments);
          console.log("All comments:", allComments);

          const normalizedFeedback = {
            passed: isPassed,
            score: passedFeedback.score || (isPassed ? 95 : 40),
            testsPassed: passedFeedback.testsPassed || (isPassed ? 8 : 3),
            totalTests: passedFeedback.totalTests || 10,
            comments: allComments,
            suggestions: passedFeedback.suggestions || [
              isPassed
                ? "Code của bạn đã tốt, tiếp tục phát huy!"
                : "Hãy xem lại logic và thử lại.",
              "Thử test với nhiều trường hợp khác nhau.",
              "Đọc kỹ yêu cầu của bài tập.",
              "Xem các bài học liên quan để củng cố kiến thức.",
            ],
            solutionCode:
              passedFeedback.solutionCode ||
              `// Example solution
public class Main {
    public static void main(String[] args) {
        // Your solution here
        System.out.println("Hello World!");
    }
}`,
          };

          setFeedback(normalizedFeedback);
          setSolutionCode(normalizedFeedback.solutionCode);
          return;
        }

        // Otherwise fetch from API (for direct access)
        const exerciseId = lessonId || "1"; // Default to exercise 1 for testing
        console.log("Loading feedback for exerciseId:", exerciseId);
        const feedbackData = await feedbackApi.fetchExerciseFeedback(
          exerciseId
        );
        console.log("Feedback data received:", feedbackData);
        setFeedback(feedbackData);
        setSolutionCode(feedbackData.solutionCode || "");
      } catch (err) {
        console.error("Error loading feedback:", err);
        toast.error("Không thể tải dữ liệu feedback");
      }
    };

    loadFeedback();
  }, [state?.feedback, lessonId]);

  const navigate = () => window.history.back();

  if (loading) {
    return (
      <div
        className={`flex flex-col min-h-screen transition-colors duration-300 ${
          isDark
            ? "dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-100"
            : "bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900"
        }`}
      >
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loading />
        </div>
        <Footer />
      </div>
    );
  }

  // Show test button if no feedback data
  if (!feedback) {
    return (
      <div
        className={`flex flex-col min-h-screen transition-colors duration-300 ${
          isDark
            ? "dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-100"
            : "bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900"
        }`}
      >
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Test Feedback</h2>
            <p className="text-gray-600 mb-6">
              Không có dữ liệu feedback. Click để test mock data.
            </p>
            <button
              onClick={async () => {
                try {
                  console.log("Testing feedback API...");
                  const testFeedback = await feedbackApi.fetchExerciseFeedback(
                    "1"
                  );
                  console.log("Test feedback:", testFeedback);
                  setFeedback(testFeedback);
                  setSolutionCode(testFeedback.solutionCode || "");
                  toast.success("Đã load test feedback!");
                } catch (error) {
                  console.error("Test failed:", error);
                  toast.error("Test failed: " + error.message);
                }
              }}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Test Mock Feedback
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
              navigateNext(`/courses/${courseId}/lessons/${nextLesson?.id}`)
            }
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
