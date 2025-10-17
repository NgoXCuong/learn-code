import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { HeartPulse, Menu, X, ChevronDown } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import DarkModeToggle from "../layout/DarkModeToggle";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

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

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <header
      className={`sticky top-0 left-0 w-full z-50 border-b transition-all duration-500 ${
        isScrolled
          ? theme === "dark"
            ? "bg-gray-900/80 border-gray-800 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.3)]"
            : "bg-white/70 border-white backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.05)]"
          : theme === "dark"
          ? "bg-gray-900/40 border-gray-800/40 backdrop-blur-md"
          : "bg-white/40 border-gray-300/60 backdrop-blur-md"
      }`}
    >
      <Toaster position="top-center" />
      <div className="w-full px-6 sm:px-14 lg:px-20">
        <div className="flex justify-between items-center py-4">
          {/* 🟦 Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-wide text-gray-900 dark:text-white">
              CodePulse
            </h1>
          </div>

          {/* 🖥️ Menu Desktop */}
          <div className="hidden md:flex items-center space-x-6 relative font-medium">
            {user ? (
              <>
                {["/courses", "/challenges"].map((path, i) => (
                  <Link
                    key={i}
                    to={path}
                    className={`relative group ${
                      isActive(path)
                        ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                        : "text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {path === "/courses" ? "Học ngay" : "Thử thách"}
                    <span
                      className={`absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-500 group-hover:w-full transition-all duration-300 ${
                        isActive(path) ? "w-full" : ""
                      }`}
                    ></span>
                  </Link>
                ))}

                {/* Avatar */}
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
                        menuOpen ? "rotate-180 text-indigo-500" : ""
                      }`}
                    />
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl py-2 animate-fade-in">
                      <Link
                        to="/profile"
                        onClick={() => setMenuOpen(false)}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          isActive("/profile")
                            ? "bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 font-semibold"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                        }`}
                      >
                        Hồ sơ cá nhân
                      </Link>
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
                <Link
                  to="/login"
                  className={`relative px-4 py-2 font-semibold text-sm rounded-lg border transition-all duration-300 ${
                    isActive("/login")
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-indigo-500 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-800 dark:text-indigo-400 dark:border-indigo-400"
                  }`}
                >
                  Đăng nhập
                </Link>

                <Link
                  to="/register"
                  className={`relative px-4 py-2 font-semibold text-sm rounded-lg shadow-md transition-all duration-300 ${
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

          {/* 📱 Mobile Toggle */}
          <div className="md:hidden flex items-center relative">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              )}
            </button>

            {mobileOpen && (
              <div
                ref={mobileRef}
                className="absolute top-full right-0 mt-3 w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-4 animate-slide-down"
              >
                {user ? (
                  <>
                    <p className="text-gray-900 dark:text-gray-100 font-semibold mb-3">
                      👋 Xin chào, {user.name}
                    </p>
                    <Link
                      to="/courses"
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-gray-800 dark:text-gray-200 hover:text-indigo-600"
                    >
                      Học ngay
                    </Link>
                    <Link
                      to="/challenges"
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-gray-800 dark:text-gray-200 hover:text-indigo-600"
                    >
                      Thử thách
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-gray-800 dark:text-gray-200 hover:text-indigo-600"
                    >
                      Hồ sơ cá nhân
                    </Link>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm dark:text-gray-200">Chế độ</span>
                      <DarkModeToggle />
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left text-red-600 hover:text-red-500 mt-2"
                    >
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <DarkModeToggle />
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-gray-800 dark:text-gray-200 hover:text-indigo-600"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-gray-800 dark:text-gray-200 hover:text-indigo-600"
                    >
                      Đăng ký
                    </Link>
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
