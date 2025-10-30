import React, { useContext, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Sparkles,
  Code2,
  MessageSquare,
  Award,
  ArrowLeft,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeContext } from "@/context/ThemeContext";

// Giả lập Monaco Editor (chỉ hiển thị code dạng <pre>)
const MonacoEditor = ({ value, theme }) => (
  <pre
    className={`p-4 rounded-lg overflow-auto h-full text-lg font-mono ${
      theme === "vs-dark"
        ? "bg-gray-900 text-gray-100"
        : "bg-gray-50 text-gray-900"
    }`}
  >
    <code>{value}</code>
  </pre>
);

export default function Feedback() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark"; // ✅ Light / Dark thực tế
  const [activeTab, setActiveTab] = useState("feedback");

  // Mock data
  const feedback = {
    passed: true,
    score: 95,
    testsPassed: 8,
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
        isDark ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Header />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <div
          className={`${
            isDark
              ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
              : "bg-gradient-to-br from-blue-50 to-indigo-50"
          } border-b ${
            isDark ? "border-gray-800" : "border-gray-200"
          } transition-colors`}
        >
          <div className="max-w-7xl mx-auto px-6 py-12 text-center">
            {/* Success Icon */}
            <div
              className={`relative mb-6 ${
                feedback.passed ? "animate-bounce" : ""
              }`}
            >
              <div
                className={`absolute inset-0 text-center${
                  feedback.passed ? "bg-green-500" : "bg-red-500"
                } blur-2xl opacity-30 rounded-full`}
              ></div>
              <div className="flex justify-center items-center h-full w-full">
                {feedback.passed ? (
                  <CheckCircle
                    className="w-20 h-20 text-green-500 relative z-10"
                    strokeWidth={2.5}
                  />
                ) : (
                  <XCircle
                    className="w-20 h-20 text-red-500 relative z-10"
                    strokeWidth={2.5}
                  />
                )}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {feedback.passed ? "🎉 Hoàn thành xuất sắc!" : "Chưa đạt yêu cầu"}
            </h1>
            <p
              className={`text-2xl mb-8 max-w-2xl mx-auto ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {feedback.passed
                ? "Chúc mừng! Bài làm của bạn đã đạt yêu cầu và thể hiện sự tiến bộ rõ rệt."
                : "Đừng lo lắng! Hãy xem feedback bên dưới và thử lại."}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                {
                  icon: Award,
                  color: "text-yellow-500",
                  label: "Điểm số",
                  value: feedback.score,
                },
                {
                  icon: CheckCircle,
                  color: "text-green-500",
                  label: "Test cases",
                  value: `${feedback.testsPassed}/${feedback.totalTests}`,
                },
                {
                  icon: TrendingUp,
                  color: "text-blue-500",
                  label: "XP nhận được",
                  value: "+15",
                },
                {
                  icon: Sparkles,
                  color: "text-purple-500",
                  label: "Xếp hạng",
                  value: "A+",
                },
              ].map(({ icon: Icon, color, label, value }, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-2xl border backdrop-blur-sm ${
                    isDark
                      ? "bg-gray-800/50 border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-center mb-2">
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <div className="text-3xl font-bold mb-1">{value}</div>
                  <div className={isDark ? "text-gray-400" : "text-gray-600"}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              {
                id: "feedback",
                icon: MessageSquare,
                label: "Nhận xét chi tiết",
              },
              { id: "solution", icon: Code2, label: "Lời giải mẫu" },
              { id: "suggestions", icon: Lightbulb, label: "Gợi ý cải thiện" },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                  activeTab === id
                    ? isDark
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
                      : "bg-indigo-500 text-white shadow-lg"
                    : isDark
                    ? "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div
            className={`rounded-2xl overflow-hidden border ${
              isDark
                ? "bg-gray-900 border-gray-800"
                : "bg-white border-gray-200"
            }`}
          >
            {activeTab === "feedback" && (
              <div className="p-8 space-y-4">
                {feedback.comments.map((c, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-4 p-4 rounded-xl ${
                      c.type === "success"
                        ? isDark
                          ? "bg-green-900/20 border border-green-800/30"
                          : "bg-green-50 border border-green-200"
                        : c.type === "warning"
                        ? isDark
                          ? "bg-yellow-900/20 border border-yellow-800/30"
                          : "bg-yellow-50 border border-yellow-200"
                        : isDark
                        ? "bg-blue-900/20 border border-blue-800/30"
                        : "bg-blue-50 border border-blue-200"
                    }`}
                  >
                    {c.type === "success" ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : c.type === "warning" ? (
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <Lightbulb className="w-5 h-5 text-blue-500" />
                    )}
                    <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "solution" && (
              <div className="p-8">
                <MonacoEditor
                  value={solutionCode}
                  theme={isDark ? "vs-dark" : "vs-light"}
                />
                <p
                  className={`mt-4 text-lg ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  💡 <strong>Giải thích:</strong> Code trên sử dụng cấu trúc
                  if-else để kiểm tra điều kiện tuổi. Đây là cách tiếp cận trực
                  quan và dễ hiểu nhất.
                </p>
              </div>
            )}

            {activeTab === "suggestions" && (
              <div className="p-8 space-y-4">
                {feedback.suggestions.map((s, i) => (
                  <div
                    key={i}
                    className={`p-5 rounded-xl ${
                      isDark
                        ? "bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-800/30"
                        : "bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-lg ${
                          isDark
                            ? "bg-purple-600 text-white"
                            : "bg-purple-500 text-white"
                        }`}
                      >
                        {i + 1}
                      </div>
                      <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                        {s}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8 w-full">
            {/* Nút quay lại */}
            <button
              onClick={navigate}
              className={`flex items-center justify-center gap-2 w-full sm:w-1/2 py-3 px-6 rounded-xl font-medium border transition-all duration-200 ${
                isDark
                  ? "bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
                  : "bg-white hover:bg-gray-100 text-gray-900 border-gray-300"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Quay lại thực hành</span>
            </button>

            {/* Nút bài tiếp theo */}
            <button
              className={`flex items-center justify-center gap-2 w-full sm:w-1/2 py-3 px-6 rounded-xl font-medium shadow-lg transition-all duration-200 ${
                isDark
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                  : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span>Bài tập tiếp theo</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
