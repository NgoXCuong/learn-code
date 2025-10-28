import React, { useState } from "react";
import { MessageCircle } from "lucide-react"; // icon chat

const Chatbot = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Nút mở chatbot */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition duration-300 z-999"
      >
        <MessageCircle size={26} />
      </button>

      {/* Hộp chatbot */}
      <div
        className={`fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-2xl p-4 border border-gray-200 transition-all duration-300 z-999 ${
          open
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 translate-y-5 invisible"
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-gray-800">Trợ lý học tập 🤖</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        <div className="h-64 overflow-y-auto text-sm text-gray-700 border-t pt-2">
          <p>
            Xin chào! 👋 Tôi có thể giúp bạn học lập trình như thế nào hôm nay?
          </p>
        </div>

        <input
          type="text"
          placeholder="Nhập câu hỏi..."
          className="mt-3 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>
    </>
  );
};

export default Chatbot;
