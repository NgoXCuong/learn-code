import React from "react";
import { Check, X, AlertCircle } from "lucide-react";

const QuestionCard = ({
  question,
  selectedAnswer,
  toggleMarkQuestion,
  markedQuestions,
  handleAnswerSelect,
  showResult = false,
}) => {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
      <div className="flex items-start justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Câu {question.id}: {question.question}
        </h3>
        {!showResult && (
          <button
            onClick={() => toggleMarkQuestion(question.id)}
            className={`p-2 rounded-lg transition-colors ${
              markedQuestions.has(question.id)
                ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400"
            }`}
          >
            <AlertCircle className="w-5 h-5" />
          </button>
        )}
      </div>

      {question.code && (
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm mb-6 overflow-x-auto">
          <code>{question.code}</code>
        </pre>
      )}

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const selected = selectedAnswer === index;

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(question.id, index)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selected
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selected
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {selected && <Check className="w-4 h-4 text-white" />}
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span className="text-gray-900 dark:text-white">{option}</span>
                {showResult && index === question.correctAnswer && (
                  <Check className="w-4 h-4 text-green-600 ml-auto" />
                )}
                {showResult && selected && !isCorrect && (
                  <X className="w-4 h-4 text-red-600 ml-auto" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mt-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Giải thích:</span>{" "}
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
