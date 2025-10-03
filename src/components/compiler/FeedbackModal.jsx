import React from "react";
import { Button } from "../ui/button";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
const FeedbackModal = ({ feedback, onClose }) => {
  if (!feedback) return null;

  const {
    passed = false,
    message = "",
    comments = [],
    warning = false,
  } = feedback;

  // Chọn icon
  const Icon = passed ? CheckCircle : warning ? AlertCircle : XCircle;
  const iconColor = passed
    ? "text-green-500"
    : warning
    ? "text-yellow-500"
    : "text-red-500";

  // Tiêu đề modal
  const title = passed
    ? "Hoàn thành!"
    : warning
    ? "Cảnh báo"
    : "Chưa thành công!";

  // Màu nút
  const buttonClass = passed
    ? "bg-green-600 hover:bg-green-700 text-white"
    : warning
    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
    : "bg-red-600 hover:bg-red-700 text-white";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl max-w-md w-full shadow-2xl text-center flex flex-col items-center space-y-4">
        <Icon className={`w-16 h-16 ${iconColor}`} />

        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h3>

        <p className="text-gray-700 dark:text-gray-300">{message}</p>

        {comments.length > 0 ? (
          <div className="mt-2 text-left w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200 space-y-2">
            <strong>Nhận xét:</strong>
            {comments.map((cmt, idx) => (
              <p key={idx} className="mt-1">
                {cmt}
              </p>
            ))}
          </div>
        ) : (
          !passed &&
          !warning && (
            <div className="mt-2 text-left w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-800 dark:text-gray-200">
              <strong>Nhận xét:</strong>
              <p className="mt-1">Chưa có nhận xét cụ thể.</p>
            </div>
          )
        )}

        <Button onClick={onClose} className={`mt-2 w-full ${buttonClass}`}>
          Đóng
        </Button>
      </div>
    </div>
  );
};

export default FeedbackModal;
