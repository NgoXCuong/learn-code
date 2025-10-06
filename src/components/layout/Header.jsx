import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Toaster, toast } from "react-hot-toast";
import { HeartPulse, Menu, X, LogOut } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import DarkModeToggle from "../layout/DarkModeToggle";

const Header = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMobileOpen(false);
    toast.success("Đã đăng xuất thành công!");
    navigate("/");
  };

  const getUserInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-900/80 border-gray-800 shadow-[0_2px_20px_rgba(0,0,0,0.3)]"
          : "bg-white/70 border-gray-200 shadow-[0_2px_20px_rgba(0,0,0,0.05)]"
      }`}
    >
      <Toaster position="top-center" />

      {/* Container */}
      <div className="w-full px-6 sm:px-14 lg:px-20">
        <div className="flex justify-between items-center py-4">
          {/* 🌟 Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div
              className={`relative w-10 h-10 rounded-2xl flex items-center justify-center 
              bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 
              shadow-lg shadow-indigo-400/40 group-hover:scale-110 transition-transform duration-300`}
            >
              <HeartPulse className="w-6 h-6 text-white animate-pulse" />
            </div>
            <h1
              className={`text-2xl font-extrabold tracking-wide transition-all duration-500
                bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent 
                group-hover:from-pink-500 group-hover:to-indigo-500`}
            >
              CodePulse
            </h1>
          </div>

          {/* 🖥️ Menu Desktop */}
          <div className="hidden md:flex items-center space-x-5">
            {user ? (
              <>
                {/* Avatar */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-9 h-9 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-md">
                      {getUserInitials(user.name)}
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-none">
                      Xin chào,
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {user.name}
                    </p>
                  </div>
                </div>

                <DarkModeToggle />

                <Button
                  onClick={() => navigate("/courses")}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 
                  text-white px-5 py-2 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Học ngay
                </Button>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full border border-gray-300 dark:border-gray-700 
                  text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 
                  hover:scale-110 transition-all duration-300"
                  title="Đăng xuất"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <DarkModeToggle />
                <Button
                  onClick={() => navigate("/login")}
                  variant="outline"
                  className="px-4 py-2 rounded-xl text-gray-900 dark:text-gray-200 
                  border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Đăng nhập
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 
                  text-white px-4 py-2 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Đăng ký
                </Button>
              </>
            )}
          </div>

          {/* 📱 Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              {mobileOpen ? (
                <X
                  className={`w-6 h-6 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                />
              ) : (
                <Menu
                  className={`w-6 h-6 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-700"
                  }`}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 📲 Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full right-0 w-64 bg-white/95 dark:bg-gray-900/95 shadow-2xl flex flex-col p-4 space-y-3 rounded-md z-50 animate-slide-down">
          {user ? (
            <div className="flex flex-col space-y-2">
              <Button
                onClick={() => {
                  navigate("/courses");
                  setMobileOpen(false);
                }}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white py-2 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                Học ngay
              </Button>
              <button
                onClick={handleLogout}
                className="w-full flex justify-center items-center space-x-2 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span>Đăng xuất</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <Button
                onClick={() => {
                  navigate("/login");
                  setMobileOpen(false);
                }}
                variant="outline"
                className="w-full px-4 py-2 rounded-xl border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Đăng nhập
              </Button>
              <Button
                onClick={() => {
                  navigate("/register");
                  setMobileOpen(false);
                }}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white py-2 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                Đăng ký
              </Button>
            </div>
          )}
          <div className="flex justify-center mt-3">
            <DarkModeToggle />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
