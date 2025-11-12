import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { HeartPulse, Menu, X, ChevronDown } from "lucide-react";
import { ThemeContext } from "@/context/ThemeContext";
import { AuthContext } from "@/context/AuthContext";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target))
        setMenuOpen(false);
      if (mobileRef.current && !mobileRef.current.contains(event.target))
        setMobileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
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

  // ✅ Giữ active cho cả các cấp con (VD: /courses/1, /challenges/quiz-2)
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Khóa học", path: "/courses" },
    { label: "Thử thách", path: "/challenges" },
    { label: "Bảng xếp hạng", path: "/ranks" },
    { label: "Làm bài thi thử", path: "/exam" },
    { label: "Compiler", path: "/compiler" },
  ];

  return (
    <header
      className={`sticky top-0 left-0 w-full z-50 border-b transition-all duration-500 ${
        isScrolled
          ? theme === "dark"
            ? "bg-gray-900/70 border-gray-800 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.3)]"
            : "bg-white/50 border-white backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.05)]"
          : theme === "dark"
          ? "bg-gray-900/40 border-gray-800/40 backdrop-blur-md"
          : "bg-white/40 border-gray-300/60 backdrop-blur-md"
      }`}
    >
      <Toaster richColors position="top-center" />
      <div className="w-full px-6 sm:px-14 lg:px-20">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-wide text-black dark:text-white">
              CodePulse
            </h1>
          </div>

          {/* ✅ Desktop Menu Chia 3 vùng */}
          <div className="hidden md:flex items-center justify-between flex-1">
            {/* ✅ Vùng giữa - NAV centered */}
            <nav className="flex items-center justify-center flex-1 space-x-1 mx-8 font-medium">
              {navItems.map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  className={`relative group px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? "text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/30"
                      : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-indigo-500 transition-all duration-300 ${
                      isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              ))}
            </nav>

            {/* ✅ Vùng phải - User menu */}
            <div className="flex items-center space-x-3 ml-6 font-medium">
              {user ? (
                <>
                  {/* Avatar + menu giữ nguyên */}
                  <div className="relative" ref={menuRef}>
                    <button
                      onClick={() => setMenuOpen(!menuOpen)}
                      className="flex items-center space-x-2 cursor-pointer select-none"
                    >
                      <div className="relative">
                        <div className="w-9 h-9 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-base font-semibold shadow-md">
                          {getUserInitials(user.name)}
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                      </div>
                      <span className="text-base font-semibold text-gray-900 dark:text-gray-100 hidden lg:inline">
                        {user.name}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform duration-200 ${
                          menuOpen ? "rotate-180 text-indigo-500" : ""
                        }`}
                      />
                    </button>

                    {menuOpen && (
                      <div className="absolute right-0 mt-3 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl py-2 animate-fade-in">
                        <Link
                          to="/profile"
                          onClick={() => setMenuOpen(false)}
                          className={`block w-full text-left px-4 py-2 text-base rounded transition-colors ${
                            isActive("/profile")
                              ? "bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 font-semibold"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200"
                          }`}
                        >
                          Hồ sơ cá nhân
                        </Link>

                        <div className="px-4 py-2 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                          <span className="text-base text-gray-900 dark:text-gray-200">
                            Chế độ
                          </span>
                          <DarkModeToggle />
                        </div>

                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-base text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 dark:text-red-400 rounded transition-colors"
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
                  <Link
                    to="/login"
                    className={`relative px-4 py-2 font-semibold text-base rounded-lg border transition-all duration-300 ${
                      isActive("/login")
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "border-indigo-500 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-800 dark:text-indigo-400 dark:border-indigo-400"
                    }`}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className={`relative px-4 py-2 font-semibold text-base rounded-lg shadow-md transition-all duration-300 ${
                      isActive("/register")
                        ? "bg-indigo-700 text-white"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    }`}
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <DarkModeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Navigation */}
      {mobileOpen && (
        <div
          ref={mobileRef}
          className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md animate-slide-down"
        >
          <div className="px-6 sm:px-14 py-4 space-y-2">
            {user && (
              <p className="px-4 py-2 text-base font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
                👋 Xin chào, {user.name}
              </p>
            )}

            {navItems.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                  isActive(item.path)
                    ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                    isActive("/profile")
                      ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400"
                      : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Hồ sơ cá nhân
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium border border-indigo-600 dark:border-indigo-400 text-center"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-200 font-medium text-center"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
