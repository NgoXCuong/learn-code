import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Toaster, toast } from "react-hot-toast";
import { HeartPulse, Menu, X, ChevronDown } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import DarkModeToggle from "../layout/DarkModeToggle";

const Header = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Đóng dropdown và mobile menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(event.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMobileOpen(false);
    setMenuOpen(false);
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
      <div className="w-full px-6 sm:px-14 lg:px-20">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center 
    bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300"
            >
              <HeartPulse className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-wide text-gray-900 dark:text-white">
              CodePulse
            </h1>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-5 relative">
            {user ? (
              <>
                <Button
                  onClick={() => navigate("/courses")}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 
                  text-white px-5 py-2 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Học ngay
                </Button>
                <Button
                  onClick={() => navigate("/challenges")}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 
                  text-white px-5 py-2 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Thử thách
                </Button>

                {/* Avatar + Dropdown */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center space-x-2 cursor-pointer select-none group"
                  >
                    <div className="relative">
                      <div className="w-9 h-9 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-md">
                        {getUserInitials(user.name)}
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {user.name}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform duration-200 ${
                        menuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 animate-fade-in">
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                      >
                        Hồ sơ cá nhân
                      </button>
                      <div className="px-4 py-2 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span className="text-sm dark:text-gray-200">
                          Chế độ
                        </span>
                        <DarkModeToggle />
                      </div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-red-400"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
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

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center relative">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all relative z-10"
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

            {/* Mobile Menu nhỏ xuất hiện ngay dưới nút */}
            {mobileOpen && (
              <div
                ref={mobileRef}
                className={`absolute top-full right-0 mt-2 w-64 bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-4 animate-slide-down`}
              >
                {user ? (
                  <>
                    <p className="text-gray-900 dark:text-gray-100 font-semibold mb-3">
                      👋 Xin chào, {user.name}
                    </p>
                    <Button
                      onClick={() => {
                        navigate("/courses");
                        setMobileOpen(false);
                      }}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 
          text-white px-5 py-2 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 w-full mb-2"
                    >
                      Học ngay
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/challenges");
                        setMobileOpen(false);
                      }}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 
          text-white px-5 py-2 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 w-full mb-2"
                    >
                      Thử thách
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/profile");
                        setMobileOpen(false);
                      }}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 
          text-white px-5 py-2 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 w-full mb-2"
                    >
                      Hồ sơ cá nhân
                    </Button>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm dark:text-gray-200">Chế độ</span>
                      <DarkModeToggle />
                    </div>
                    <Button
                      onClick={handleLogout}
                      className="bg-red-600 text-white px-5 py-2 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 w-full mt-2"
                    >
                      Đăng xuất
                    </Button>
                  </>
                ) : (
                  <>
                    <DarkModeToggle />
                    <Button
                      onClick={() => {
                        navigate("/login");
                        setMobileOpen(false);
                      }}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 
          text-white px-5 py-2 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 w-full mb-2"
                    >
                      Đăng nhập
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/register");
                        setMobileOpen(false);
                      }}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 
          text-white px-5 py-2 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 w-full"
                    >
                      Đăng ký
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
