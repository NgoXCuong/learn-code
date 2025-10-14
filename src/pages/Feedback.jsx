import React, { useContext, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { ThemeContext } from "../context/ThemeContext";
import MonacoEditor from "@monaco-editor/react";

export default function Feedback() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [language] = useState("java"); // Ngôn ngữ code
  const [code] = useState(`public class Main {
    public static void main(String[] args) {
        int age = 20;
        if(age >= 18) {
            System.out.println("Bạn đã trưởng thành");
        } else {
            System.out.println("Bạn chưa trưởng thành");
        }
    }
}`);

  const navigate = () => window.history.back();

  return (
    <div
      className={`flex flex-col h-screen ${
        isDark ? "bg-gray-900" : "bg-gradient-to-br from-slate-50 to-blue-50"
      }`}
    >
      <Header />

      <main className="pt-20 md:pt-24 flex-1 flex flex-col items-center justify-between p-4 md:p-6 h-full w-full">
        {/* Hoàn thành */}
        <div
          className={`flex flex-col items-center mb-4 p-4 md:p-6 rounded-xl shadow-sm w-full text-center
      ${isDark ? "text-gray-200" : "text-gray-800"}`}
        >
          <CheckCircle
            className={`w-12 h-12 mb-2 ${
              isDark ? "text-green-400" : "text-green-500"
            }`}
          />
          <h3 className="text-2xl md:text-3xl font-bold">Hoàn thành!</h3>
          <p className="mt-1 text-sm md:text-base max-w-2xl mx-auto">
            Chúc mừng bạn! Bài tập đã thực hiện đúng và đạt kết quả yêu cầu.
          </p>
        </div>

        {/* Container chính: Feedback + Code */}
        <div className="flex flex-1 flex-col md:flex-row w-full gap-4">
          {/* Feedback 1/2 */}
          <div
            className={`flex-1 flex flex-col rounded-xl shadow-sm
      ${
        isDark
          ? "bg-gray-800 border border-gray-700 text-gray-200"
          : "bg-gray-100 border border-gray-300 text-gray-800"
      }`}
          >
            {/* Header Feedback */}
            <div className="p-4 border-b font-semibold text-lg md:text-xl">
              Nhận xét chi tiết
            </div>
            {/* Body Feedback */}
            <div className="flex-1 overflow-auto p-4 space-y-2 max-h-80 md:max-h-96">
              <p>- Bạn đã khai báo biến và kiểu dữ liệu chính xác.</p>
              <p>- Cấu trúc điều khiển (if, for) được sử dụng đúng cách.</p>
              <p>- Kết quả in ra đúng theo yêu cầu của bài tập.</p>
              <p>- Định dạng output rõ ràng, dễ đọc.</p>
              <p>- Chú ý indent, comment rõ ràng trong code.</p>
            </div>
          </div>

          {/* Code 1/2 */}
          <div
            className={`flex-1 flex flex-col rounded-xl shadow-sm
      ${
        isDark
          ? "bg-gray-700 border border-gray-700 text-gray-200"
          : "bg-blue-50 border border-gray-300 text-gray-800"
      }`}
          >
            {/* Header Code */}
            <div className="p-4 border-b font-semibold text-lg md:text-xl">
              Code gợi ý / Đoạn code đúng
            </div>
            {/* Body Code */}
            <div
              style={{ height: "400px" }}
              className={`flex-1 border-t ${
                isDark ? "border-gray-700" : "border-gray-300"
              }`}
            >
              <MonacoEditor
                height="100%"
                language={language}
                theme={isDark ? "vs-dark" : "vs-light"}
                value={`${code}`}
                options={{
                  fontSize: 14,
                  fontFamily: "'Fira Code', monospace",
                  lineNumbers: "on",
                  automaticLayout: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  renderWhitespace: "all",
                  cursorStyle: "line",
                  readOnly: true,
                }}
              />
            </div>
          </div>
        </div>

        <div className="w-full mt-4 flex justify-center">
          <Button
            onClick={navigate}
            className={`w-1/4 py-3 text-lg rounded-xl border 
      ${
        isDark
          ? "bg-green-700 hover:bg-green-800 border-green-800 text-white"
          : "bg-green-600 hover:bg-green-700 border-green-700 text-white"
      }`}
          >
            Quay lại
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
