import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  memo,
  useMemo,
  useCallback,
} from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { HeartPulse, Menu, X, ChevronDown, Home, BookOpen, Compass, Target, Trophy, FileCode2, Bell, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { ThemeContext } from "@/context/ThemeContext";
import { AuthContext } from "@/context/AuthContext";
import DarkModeToggle from "./DarkModeToggle";

const Header = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuRef = useRef(null);
  const mobileRef = useRef(null);
  const notificationsRef = useRef(null);

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
      if (notificationsRef.current && !notificationsRef.current.contains(event.target))
        setNotificationsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = useMemo(
    () => [
      { label: "Trang chủ", path: "/", icon: <Home className="w-4 h-4" /> },
      { label: "Khóa học", path: "/courses", icon: <Compass className="w-4 h-4" /> },
      { label: "Thử thách", path: "/challenges", icon: <Target className="w-4 h-4" /> },
      { label: "Bảng xếp hạng", path: "/ranks", icon: <Trophy className="w-4 h-4" /> },
      { label: "Compiler", path: "/compiler", icon: <FileCode2 className="w-4 h-4" /> },
    ],
    []
  );
  
  const notifications = useMemo(() => [
    { 
      id: 1, 
      title: "Khóa học mới", 
      message: "Khóa học 'React Native Pro' vừa ra mắt!", 
      time: "2 phút trước", 
      type: "info",
      icon: <Info className="w-4 h-4 text-blue-500" />,
      isRead: false 
    },
    { 
      id: 2, 
      title: "Thành tích mới", 
      message: "Bạn đã hoàn thành thử thách 'JS Logic'!", 
      time: "1 giờ trước", 
      type: "success",
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
      isRead: false 
    },
    { 
      id: 3, 
      title: "Nhắc nhở", 
      message: "Đừng quên tiếp tục khóa học 'Python cơ bản'.", 
      time: "5 giờ trước", 
      type: "warning",
      icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
      isRead: true 
    },
  ], []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = useCallback(() => {
    logout();
    setMobileOpen(false);
    setMenuOpen(false);
    toast.success("Đã đăng xuất thành công!");
    navigate("/");
  }, [logout, navigate]);

  const getUserInitials = useCallback(
    (name) =>
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U",
    []
  );

  const isActive = useCallback(
    (path) => {
      if (path === "/") return location.pathname === "/";
      return location.pathname.startsWith(path);
    },
    [location.pathname]
  );

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
        <div className="flex justify-between items-center py-2">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:scale-105 transition-transform">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-wide text-black dark:text-white  ">
              CodePulse
            </h1>
          </div>

          {/* ✅ Desktop Menu Chia 3 vùng */}
          <div className="hidden md:flex items-center justify-between flex-1">
            {/* ✅ Vùng giữa - NAV centered */}
            <nav className="flex text-sm xl:text-base items-center justify-center flex-1 space-x-1 mx-8 font-bold  ">
              {navItems.map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  className={`relative group flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive(item.path)
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 font-bold"
                      : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.icon}
                  {item.label}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-indigo-500 transition-all duration-300 font-bold ${
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
                  {/* Notification Bell */}
                  <div className="relative mr-2" ref={notificationsRef}>
                    <button
                      onClick={() => setNotificationsOpen(!notificationsOpen)}
                      className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all relative group"
                    >
                      <Bell className={`w-6 h-6 transition-transform duration-300 ${notificationsOpen ? "rotate-12" : "group-hover:scale-110"}`} />
                      {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-600 text-white text-[11px] flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900 font-bold shadow-sm">
                          {unreadCount}
                        </span>
                      )}
                    </button>

                    {notificationsOpen && (
                      <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                          <h3 className="font-bold text-gray-900 dark:text-white">Thông báo</h3>
                          <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">Đánh dấu đã đọc</button>
                        </div>
                        <div className="max-h-[360px] overflow-y-auto">
                          {notifications.length > 0 ? (
                            notifications.map((n) => (
                              <div 
                                key={n.id} 
                                className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer border-b border-gray-50 dark:border-gray-700 last:border-0 ${!n.isRead ? "bg-indigo-50/30 dark:bg-indigo-950/10" : ""}`}
                              >
                                <div className="flex gap-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                    n.type === 'success' ? 'bg-emerald-100 dark:bg-emerald-900/30' : 
                                    n.type === 'warning' ? 'bg-amber-100 dark:bg-amber-900/30' : 
                                    'bg-blue-100 dark:bg-blue-900/30'
                                  }`}>
                                    {n.icon}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{n.title}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mt-0.5">{n.message}</p>
                                    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">{n.time}</p>
                                  </div>
                                  {!n.isRead && <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="py-8 text-center text-gray-400 text-sm">Không có thông báo mới</div>
                          )}
                        </div>
                        <div className="px-4 pt-2 border-t border-gray-100 dark:border-gray-700 text-center">
                          <button className="text-xs font-bold text-gray-500 hover:text-indigo-600 transition-colors py-1">Xem tất cả thông báo</button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Avatar + menu giữ nguyên */}
                  <div className="relative" ref={menuRef}>
                    <button
                      onClick={() => setMenuOpen(!menuOpen)}
                      className="flex items-center space-x-2 cursor-pointer select-none"
                    >
                      <div className="relative">
                        <div className="w-9 h-9 bg-linear-to-r   from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center text-base font-semibold shadow-md">
                          {getUserInitials(user.name)}
                        </div>
                        <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                      </div>
                      <span className="text-base font-semibold   text-gray-900 dark:text-gray-100 hidden lg:inline">
                        {user.name}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform duration-200 ${
                          menuOpen ? "rotate-180 text-indigo-500" : ""
                        }`}
                      />
                    </button>

                    {menuOpen && (
                      <div className="absolute right-0 mt-3 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl py-2 animate-fade-in">
                        <Link
                          to="/profile"
                          onClick={() => setMenuOpen(false)}
                          className={`block w-full text-left px-4 py-2 text-base rounded transition-colors   ${
                            isActive("/profile")
                              ? "bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 font-semibold"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200"
                          }`}
                        >
                          Hồ sơ cá nhân
                        </Link>

                        <div className="px-4 py-2 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                          <span className="text-base   text-gray-900 dark:text-gray-200">
                            Chế độ
                          </span>
                          <DarkModeToggle />
                        </div>

                        <button
                          onClick={handleLogout}
                          className="btn-shimmer   block w-full text-left px-4 py-2 text-base text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 dark:text-red-400 rounded transition-colors"
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
                    className={`btn-shimmer relative px-4 py-2 font-bold text-base rounded-sm border transition-all duration-300 whitespace-nowrap ${
                      isActive("/login")
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "border-indigo-500 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-800 dark:text-indigo-400 dark:border-indigo-400"
                    }`}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className={`btn-shimmer relative px-4 py-2 font-bold text-base rounded-sm shadow-md transition-all duration-300 whitespace-nowrap ${
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
              className="p-2 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
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
              <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <p className="text-base font-bold text-gray-900 dark:text-gray-100">
                  👋 Xin chào, {user.name}
                </p>
                {unreadCount > 0 && (
                  <span className="bg-red-600 text-white text-[11px] px-2.5 py-0.5 rounded-full font-bold shadow-sm">
                    {unreadCount} mới
                  </span>
                )}
              </div>
            )}

            {navItems.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-md transition-all duration-200   font-bold ${
                  isActive(item.path)
                    ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400"
                    : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            {user ? (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/notifications");
                  }}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-md transition-all duration-200 font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Thông báo
                  </div>
                  {unreadCount > 0 && (
                    <span className="w-6 h-6 bg-indigo-600 text-white text-[11px] flex items-center justify-center rounded-full font-bold shadow-sm">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-sm transition-all duration-200   font-bold ${
                    isActive("/profile")
                      ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400"
                      : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  Hồ sơ cá nhân
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-shimmer   font-bold w-full text-left px-4 py-3 rounded-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 transition-all duration-200 "
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
                  className="btn-shimmer   font-bold block px-4 py-3 rounded-sm text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-200 border border-indigo-600 dark:border-indigo-400 text-center"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="btn-shimmer   font-bold block px-4 py-3 rounded-sm bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all duration-200  text-center"
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
});

Header.displayName = "Header";

export default Header;
