import React from "react";
import { AlertTriangle, X } from "lucide-react";

const ExitModal = ({ show, close, answeredCount, total, confirm }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 font-exo bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 z-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Xác nhận thoát
              </h2>
            </div>
            <button
              onClick={close}
              className="text-gray-500 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-700 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-300" />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Bạn đã trả lời {answeredCount}/{total} câu. Nếu thoát bây giờ, tiến
            trình sẽ không được lưu.
          </p>
          <div className="flex gap-3">
            <button
              onClick={close}
              className="flex-1 py-3 btn-shimmer cursor-pointer text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              Tiếp tục làm
            </button>
            <button
              onClick={confirm}
              className="flex-1 py-3 btn-shimmer cursor-pointer bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all"
            >
              Thoát
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitModal;
