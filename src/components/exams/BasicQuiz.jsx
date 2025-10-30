import React, { useState } from "react";
import QuestionCard from "./QuestionCard";
import { ChevronRight } from "lucide-react";

const BasicQuiz = ({
  quizData,
  selectedAnswers,
  markedQuestions,
  handleAnswerSelect,
  toggleMarkQuestion,
  quizStarted,
  showResults,
  handleStartQuiz,
  handleSubmitQuiz,
  handleRetakeQuiz,
}) => {
  const [showResultModal, setShowResultModal] = useState(false);

  const totalQuestions = quizData.basicQuiz.questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const quizDuration = quizData.basicQuiz.timeLimit / 60; // phút

  const calculateScore = () => {
    let correct = 0;
    quizData.basicQuiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) correct++;
    });
    return {
      correct,
      total: totalQuestions,
      percentage: Math.round((correct / totalQuestions) * 100),
    };
  };

  const handleSubmit = () => {
    handleSubmitQuiz();
    setShowResultModal(true);
  };

  const handleCloseModal = () => {
    setShowResultModal(false);
  };

  if (!quizStarted && !showResults) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {quizData.basicQuiz.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Bài kiểm tra gồm {totalQuestions} câu hỏi trắc nghiệm. Thời gian:{" "}
          {quizData.basicQuiz.timeLimit / 60} phút.
        </p>
        <button
          onClick={handleStartQuiz}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors inline-flex items-center gap-2"
        >
          Bắt đầu làm bài
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  // === Hiển thị câu hỏi khi đang làm ===
  return (
    <div className="space-y-6 relative">
      {quizData.basicQuiz.questions.map((q) => (
        <QuestionCard
          key={q.id}
          question={q}
          selectedAnswer={selectedAnswers[q.id]}
          markedQuestions={markedQuestions}
          toggleMarkQuestion={toggleMarkQuestion}
          handleAnswerSelect={handleAnswerSelect}
          showResult={false}
        />
      ))}

      {/* Nút nộp bài */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Đã trả lời: {answeredCount}/{totalQuestions} câu
          </p>
          {markedQuestions.size > 0 && (
            <p className="text-sm text-orange-600 dark:text-orange-400">
              {markedQuestions.size} câu cần xem lại
            </p>
          )}
        </div>
        <button
          onClick={handleSubmit}
          disabled={answeredCount === 0}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
        >
          Nộp bài
        </button>
      </div>

      {/* === Modal hiển thị kết quả === */}
      {showResultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center relative animate-fadeIn">
            {/* Nút đóng */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>

            {/* Vòng tròn điểm */}
            <div
              className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 border-8 ${
                calculateScore().percentage >= 80
                  ? "border-green-500/70 bg-green-100 dark:bg-green-900/30"
                  : calculateScore().percentage >= 50
                  ? "border-yellow-500/70 bg-yellow-100 dark:bg-yellow-900/30"
                  : "border-red-500/70 bg-red-100 dark:bg-red-900/30"
              }`}
            >
              <span
                className={`text-5xl font-extrabold ${
                  calculateScore().percentage >= 80
                    ? "text-green-600 dark:text-green-400"
                    : calculateScore().percentage >= 50
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {calculateScore().percentage}%
              </span>
            </div>

            {/* Tiêu đề & mô tả */}
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Kết quả bài kiểm tra
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Bạn đã trả lời đúng{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {calculateScore().correct}/{calculateScore().total}
              </span>{" "}
              câu hỏi.
            </p>

            {/* Thanh tiến độ */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
              <div
                className={`h-3 rounded-full ${
                  calculateScore().percentage >= 80
                    ? "bg-green-500"
                    : calculateScore().percentage >= 50
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${calculateScore().percentage}%` }}
              ></div>
            </div>

            {/* Đánh giá tổng quan */}
            <div className="mb-4">
              {calculateScore().percentage >= 90 ? (
                <p className="text-green-600 dark:text-green-400 font-semibold">
                  🌟 Xuất sắc! Bạn hiểu bài rất tốt.
                </p>
              ) : calculateScore().percentage >= 70 ? (
                <p className="text-yellow-600 dark:text-yellow-400 font-semibold">
                  👍 Tốt lắm! Cần ôn lại một chút để đạt điểm cao hơn.
                </p>
              ) : (
                <p className="text-red-600 dark:text-red-400 font-semibold">
                  ⚠️ Cần cố gắng hơn! Hãy xem lại phần lý thuyết và thử lại.
                </p>
              )}
            </div>

            {/* Thông tin thêm */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 text-sm text-gray-600 dark:text-gray-300">
              <p>
                ⏱ Thời gian làm bài: <b>{quizDuration} phút</b>
              </p>
              <p>
                📅 Ngày làm bài: <b>{new Date().toLocaleDateString()}</b>
              </p>
              <p>
                🏆 Xếp loại:{" "}
                <b>
                  {calculateScore().percentage >= 90
                    ? "Xuất sắc"
                    : calculateScore().percentage >= 75
                    ? "Khá"
                    : calculateScore().percentage >= 50
                    ? "Trung bình"
                    : "Yếu"}
                </b>
              </p>
            </div>

            {/* Nút hành động */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  handleCloseModal();
                  handleRetakeQuiz();
                }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-transform hover:scale-105"
              >
                Làm lại
              </button>
              <button
                onClick={handleCloseModal}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium transition-transform hover:scale-105"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicQuiz;
