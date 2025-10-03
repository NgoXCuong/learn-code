import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { toast } from "sonner";
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
    <header className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 transition-colors">
      {/* Container sát 2 lề */}
      <div className="w-full px-6 sm:px-14 lg:px-20">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <HeartPulse
              className={`w-10 h-10 ${
                theme === "dark" ? "text-indigo-400" : "text-indigo-600"
              } drop-shadow-md`}
            />
            <h1
              className={`text-2xl font-bold bg-clip-text ${
                theme === "dark"
                  ? "text-white drop-shadow-lg"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent drop-shadow-md"
              }`}
            >
              CodePulse
            </h1>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-700 text-indigo-600 dark:text-indigo-100 rounded-full flex items-center justify-center text-sm font-semibold transition-colors">
                    {getUserInitials(user.name)}
                  </div>
                  <div className="text-left">
                    <p
                      className={`text-sm font-medium ${
                        theme === "dark" ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      Xin chào,
                    </p>
                    <p
                      className={`text-sm font-medium ${
                        theme === "dark" ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      {user.name}!
                    </p>
                  </div>
                </div>
                <DarkModeToggle />
                <Button
                  onClick={() => navigate("/courses")}
                  className="bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-4 py-2 rounded-xl transition-colors"
                >
                  Học ngay
                </Button>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
                  className="px-4 py-2 rounded-xl text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 transition-colors"
                >
                  Đăng nhập
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  className="bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-4 py-2 rounded-xl transition-colors"
                >
                  Đăng ký
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full right-0 w-56 bg-white dark:bg-gray-900 shadow-lg flex flex-col p-4 space-y-3 rounded-md z-50 animate-slide-down">
          {user ? (
            <div className="flex flex-col space-y-2">
              <Button
                onClick={() => {
                  navigate("/courses");
                  setMobileOpen(false);
                }}
                className="w-full bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white py-2 rounded-xl transition-colors"
              >
                Học ngay
              </Button>
              <button
                onClick={handleLogout}
                className="w-full flex justify-center items-center space-x-2 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title="Đăng xuất"
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
                className="w-full px-4 py-2 rounded-xl border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 transition-colors"
              >
                Đăng nhập
              </Button>
              <Button
                onClick={() => {
                  navigate("/register");
                  setMobileOpen(false);
                }}
                className="w-full bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-4 py-2 rounded-xl transition-colors"
              >
                Đăng ký
              </Button>
            </div>
          )}
          <div className="flex justify-center mt-2">
            <DarkModeToggle />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
