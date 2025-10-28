import React, { useState, useContext, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { ThemeContext } from "@/context/ThemeContext";

const Chatbot = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! 👋 Tôi là trợ lý AI của CodeLearnX. Tôi có thể giúp bạn:",
      sender: "bot",
      time: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    {
      id: 2,
      text: "• Tư vấn khóa học phù hợp\n• Giải đáp thắc mắc lập trình\n• Gợi ý lộ trình học tập\n• Hỗ trợ bài tập và dự án",
      sender: "bot",
      time: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef(null);

  // Tự động cuộn xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const quickReplies = [
    "Khóa học nào phù hợp cho người mới?",
    "Tôi muốn học Python",
    "Lộ trình Web Developer",
    "Giải thích về OOP",
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      time: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, userMessage]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(inputText);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: botResponse,
          sender: "bot",
          time: new Date().toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (input) => {
    const text = input.toLowerCase();
    if (text.includes("python"))
      return "Python là lựa chọn tuyệt vời! 🐍 Bạn có thể bắt đầu với khóa *Python cơ bản* để nắm chắc nền tảng.";
    if (text.includes("người mới") || text.includes("beginner"))
      return "Với người mới, tôi gợi ý học *HTML, CSS, JavaScript cơ bản* để hiểu cách web hoạt động.";
    if (text.includes("web"))
      return "Lộ trình Web Developer: HTML → CSS → JavaScript → React → Node.js 🚀";
    if (text.includes("oop"))
      return "OOP (Lập trình hướng đối tượng) 🎯 gồm 4 nguyên lý: *Encapsulation, Inheritance, Polymorphism, Abstraction.*";
    return "Cảm ơn bạn! 😊 Tôi có thể giúp bạn với các chủ đề lập trình khác, ví dụ như web, python, hoặc OOP.";
  };

  const handleQuickReply = (reply) => setInputText(reply);
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Nút mở Chatbot */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 z-50 transform hover:scale-110"
      >
        {open ? <X size={26} /> : <MessageCircle size={26} />}
      </button>

      {/* Chatbot Box */}
      <div
        className={`fixed bottom-24 right-6 w-96 shadow-2xl rounded-2xl border z-50 flex flex-col transition-all duration-300
          ${
            isDark
              ? "bg-[#111827] border-gray-700 text-gray-100"
              : "bg-white border-gray-200 text-gray-800"
          }
          ${
            open
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }
        `}
        style={{ maxHeight: "600px", height: "600px" }}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 rounded-t-2xl
          ${
            isDark
              ? "bg-[#1f2937] text-white border-b border-gray-700"
              : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDark ? "bg-gray-700" : "bg-white"
                }`}
              >
                <Bot
                  className={isDark ? "text-cyan-400" : "text-blue-600"}
                  size={24}
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h2 className="font-bold text-lg">Trợ lý AI</h2>
              <p className="text-xs opacity-80">
                {isDark ? "Đang hoạt động 🌙" : "Đang hoạt động"}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          className={`flex-1 overflow-y-auto p-4 space-y-4 ${
            isDark ? "bg-[#1e293b]" : "bg-gray-50"
          }`}
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex gap-2 max-w-[80%] ${
                  m.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                  ${
                    m.sender === "bot"
                      ? isDark
                        ? "bg-cyan-700"
                        : "bg-gradient-to-br from-blue-500 to-cyan-500"
                      : isDark
                      ? "bg-purple-700"
                      : "bg-gradient-to-br from-purple-500 to-pink-500"
                  }`}
                >
                  {m.sender === "bot" ? (
                    <Bot size={18} className="text-white" />
                  ) : (
                    <User size={18} className="text-white" />
                  )}
                </div>
                <div>
                  <div
                    className={`rounded-2xl px-4 py-3 leading-relaxed shadow
                    ${
                      m.sender === "user"
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-tr-none"
                        : isDark
                        ? "bg-gray-700 text-gray-100 rounded-tl-none border border-gray-600"
                        : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{m.text}</p>
                  </div>
                  <p
                    className={`text-[11px] mt-1 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    } ${m.sender === "user" ? "text-right" : "text-left"}`}
                  >
                    {m.time}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isDark
                      ? "bg-cyan-700"
                      : "bg-gradient-to-br from-blue-500 to-cyan-500"
                  }`}
                >
                  <Bot size={18} className="text-white" />
                </div>
                <div
                  className={`rounded-2xl px-4 py-3 shadow-md flex gap-1 ${
                    isDark ? "bg-gray-700" : "bg-white"
                  }`}
                >
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length <= 2 && (
          <div
            className={`px-4 py-3 border-t ${
              isDark
                ? "border-gray-700 bg-[#1f2937]"
                : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-1 mb-2">
              <Sparkles size={14} className="text-blue-500" />
              <p className="text-xs font-semibold">
                {isDark ? "Gợi ý câu hỏi 🌙" : "Gợi ý câu hỏi"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((r, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickReply(r)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition
                    ${
                      isDark
                        ? "bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700"
                        : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                    }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div
          className={`p-4 border-t rounded-b-2xl ${
            isDark ? "border-gray-700 bg-[#1f2937]" : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nhập câu hỏi của bạn..."
              className={`flex-1 border rounded-full px-4 py-2.5 text-sm outline-none transition
                ${
                  isDark
                    ? "border-gray-600 bg-gray-800 text-gray-100 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    : "border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                }`}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white p-2.5 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Nhấn Enter để gửi tin nhắn
          </p>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
