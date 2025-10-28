// import React, { useContext, useState } from "react";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import { CheckCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { ThemeContext } from "@/context/ThemeContext";
// import MonacoEditor from "@monaco-editor/react";

// export default function Feedback() {
//   const { theme } = useContext(ThemeContext);
//   const isDark = theme === "dark";

//   const [language] = useState("java"); // Ngôn ngữ code
//   const [code] = useState(`public class Main {
//     public static void main(String[] args) {
//         int age = 20;
//         if(age >= 18) {
//             System.out.println("Bạn đã trưởng thành");
//         } else {
//             System.out.println("Bạn chưa trưởng thành");
//         }
//     }
// }`);

//   const navigate = () => window.history.back();

//   return (
//     <div
//       className={`flex flex-col h-screen ${
//         isDark ? "bg-gray-900" : "bg-gradient-to-br from-slate-50 to-blue-50"
//       }`}
//     >
//       <Header />

//       <main className="pt-20 md:pt-24 flex-1 flex flex-col items-center justify-between p-4 md:p-6 h-full w-full">
//         {/* Hoàn thành */}
//         <div
//           className={`flex flex-col items-center mb-4 p-4 md:p-6 rounded-xl shadow-sm w-full text-center
//       ${isDark ? "text-gray-200" : "text-gray-800"}`}
//         >
//           <CheckCircle
//             className={`w-12 h-12 mb-2 ${
//               isDark ? "text-green-400" : "text-green-500"
//             }`}
//           />
//           <h3 className="text-2xl md:text-3xl font-bold">Hoàn thành!</h3>
//           <p className="mt-1 text-sm md:text-base max-w-2xl mx-auto">
//             Chúc mừng bạn! Bài tập đã thực hiện đúng và đạt kết quả yêu cầu.
//           </p>
//         </div>

//         {/* Container chính: Feedback + Code */}
//         <div className="flex flex-1 flex-col md:flex-row w-full gap-4">
//           {/* Feedback 1/2 */}
//           <div
//             className={`flex-1 flex flex-col rounded-xl shadow-sm
//       ${
//         isDark
//           ? "bg-gray-800 border border-gray-700 text-gray-200"
//           : "bg-gray-100 border border-gray-300 text-gray-800"
//       }`}
//           >
//             {/* Header Feedback */}
//             <div className="p-4 border-b font-semibold text-lg md:text-xl">
//               Nhận xét chi tiết
//             </div>
//             {/* Body Feedback */}
//             <div className="flex-1 overflow-auto p-4 space-y-2 max-h-80 md:max-h-96">
//               <p>- Bạn đã khai báo biến và kiểu dữ liệu chính xác.</p>
//               <p>- Cấu trúc điều khiển (if, for) được sử dụng đúng cách.</p>
//               <p>- Kết quả in ra đúng theo yêu cầu của bài tập.</p>
//               <p>- Định dạng output rõ ràng, dễ đọc.</p>
//               <p>- Chú ý indent, comment rõ ràng trong code.</p>
//             </div>
//           </div>

//           {/* Code 1/2 */}
//           <div
//             className={`flex-1 flex flex-col rounded-xl shadow-sm
//       ${
//         isDark
//           ? "bg-gray-700 border border-gray-700 text-gray-200"
//           : "bg-blue-50 border border-gray-300 text-gray-800"
//       }`}
//           >
//             {/* Header Code */}
//             <div className="p-4 border-b font-semibold text-lg md:text-xl">
//               Code gợi ý / Đoạn code đúng
//             </div>
//             {/* Body Code */}
//             <div
//               style={{ height: "400px" }}
//               className={`flex-1 border-t ${
//                 isDark ? "border-gray-700" : "border-gray-300"
//               }`}
//             >
//               <MonacoEditor
//                 height="100%"
//                 language={language}
//                 theme={isDark ? "vs-dark" : "vs-light"}
//                 value={`${code}`}
//                 options={{
//                   fontSize: 14,
//                   fontFamily: "'Fira Code', monospace",
//                   lineNumbers: "on",
//                   automaticLayout: true,
//                   minimap: { enabled: false },
//                   scrollBeyondLastLine: false,
//                   wordWrap: "on",
//                   renderWhitespace: "all",
//                   cursorStyle: "line",
//                   readOnly: true,
//                 }}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="w-full mt-4 flex justify-center">
//           <Button
//             onClick={navigate}
//             className={`w-1/4 py-3 text-lg rounded-xl border
//       ${
//         isDark
//           ? "bg-green-700 hover:bg-green-800 border-green-800 text-white"
//           : "bg-green-600 hover:bg-green-700 border-green-700 text-white"
//       }`}
//           >
//             Quay lại
//           </Button>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }
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
    className={`p-4 rounded-lg overflow-auto h-full text-sm font-mono ${
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
              className={`text-lg mb-8 max-w-2xl mx-auto ${
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
                  className={`mt-4 text-sm ${
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
                        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm ${
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
