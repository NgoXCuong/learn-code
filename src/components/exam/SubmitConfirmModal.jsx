// src/components/quiz/SubmitConfirmModal.jsx
import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

export default function SubmitConfirmModal({
  show,
  unansweredCount,
  close,
  confirm,
}) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để nộp bài!");
      navigate("/login");
      return;
    }
    confirm();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-md w-full animate-scaleIn transition-colors duration-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-700 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Xác nhận nộp bài
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Bạn còn {unansweredCount} câu chưa làm. Bạn có chắc muốn nộp bài?
        </p>
        <div className="flex gap-3">
          <button
            onClick={close}
            className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
          >
            Quay lại
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all"
          >
            Nộp bài
          </button>
        </div>
      </div>
    </div>
  );
}
