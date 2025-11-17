import React, { useContext } from "react";
import { useLoading } from "@/context/LoadingContext";
import { ThemeContext } from "@/context/ThemeContext";

export function Loadding() {
  const { isLoading } = useLoading();
  const { theme } = useContext(ThemeContext);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black z-50 transition-all duration-300">
      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-t-purple-600 border-gray-300 rounded-full animate-spin"></div>
      <div className="text-gray-500 dark:text-gray-300 text-lg mt-4 font-medium">
        Đang tải...
      </div>
    </div>
  );
}
