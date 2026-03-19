import React, { useState, useEffect, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CourseList from "@/components/courses/CourseList";
import CourseFilters from "@/components/courses/CourseFilters";
import { Loading } from "@/components/layout/Loading";
import { api } from "@/services/coursesApi";
import { ThemeContext } from "@/context/ThemeContext";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "sonner";
import { getMockMyCourses } from "@/mock/myCourses";
import {
  BookOpen,
  PlayCircle,
  CheckCircle,
  Trophy,
  Flame,
  Star,
  ArrowRight,
  TrendingUp,
  Search,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Languages
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MyCourseCard from "@/components/courses/MyCourseCard";
import CourseCard from "@/components/courses/CourseCard";
import usersJson from "@/mock/users.json";

export default function CoursesPage() {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const isDark = theme === "dark";
  const currentUserData = usersJson[0]; // Fallback mock user data

  const [courses, setCourses] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLang, setSelectedLang] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [coursesData, languagesData] = await Promise.all([
          api.fetchCourses(),
          api.fetchLanguages(),
        ]);
        setCourses(coursesData);
        setLanguages(languagesData);
      } catch (err) {
        setError("Không thể tải danh sách khóa học.");
        toast.error("Lỗi kết nối máy chủ");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Integrated data with progress
  const userCourses = useMemo(() => {
    return getMockMyCourses(user?.id);
  }, [user]);

  const coursesWithProgress = useMemo(() => {
    return courses.map(course => {
      const myCourse = userCourses.find(mc => mc.path_id === course.path_id);
      return {
        ...course,
        progress_percentage: myCourse ? myCourse.progress_percentage : (course.progress_percentage || 0)
      };
    });
  }, [courses, userCourses]);

  // Featured "Continue Learning" course
  const activeCourse = useMemo(() => {
    if (userCourses.length === 0) return null;
    // Find course with highest progress but not 100%
    const inProgress = userCourses
      .filter(c => c.progress_percentage > 0 && c.progress_percentage < 100)
      .sort((a, b) => b.progress_percentage - a.progress_percentage);

    return inProgress.length > 0 ? inProgress[0] : userCourses[0];
  }, [userCourses]);

  const stats = useMemo(() => {
    const total = userCourses.length;
    const completed = userCourses.filter(c => c.progress_percentage === 100).length;
    const avgProgress = total > 0 ? Math.round(userCourses.reduce((sum, c) => sum + c.progress_percentage, 0) / total) : 0;

    const userData = usersJson.find(u => u.id === user?.id) || usersJson[0];
    return { total, completed, avgProgress, streak: userData.streak || 0 };
  }, [user, userCourses]);

  const filteredCourses = useMemo(() => {
    return coursesWithProgress
      .filter((course) => {
        const matchesSearch = (course.path_name || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLevel = filterLevel === "all" || course.difficulty_level === filterLevel;
        const matchesLang = !selectedLang || course.lang_id === selectedLang;
        return matchesSearch && matchesLevel && matchesLang;
      })
      .map(c => ({ ...c, language: languages.find(l => l.id === c.lang_id) }));
  }, [coursesWithProgress, languages, searchTerm, filterLevel, selectedLang]);

  // Pagination
  const coursesPerPage = 6;
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const currentCourses = filteredCourses.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage);

  // Carousel state for My Courses
  const [carouselIndex, setCarouselIndex] = useState(0);
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, userCourses.length - itemsPerPage);

  const nextSlide = () => setCarouselIndex(prev => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCarouselIndex(prev => Math.max(prev - 1, 0));

  if (loading) return <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${isDark ? "bg-[#0f172a]" : "bg-slate-50"}`}><Loading /></div>;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-[#0f172a] text-slate-200" : "bg-slate-50 text-slate-900"}`}>
      <Header />

      {/* Hero Dashboard Section */}
      <section className={`relative overflow-hidden pt-12 pb-20 px-6 sm:px-14 lg:px-20 border-b ${isDark ? "bg-linear-to-b from-indigo-950/20 to-transparent border-slate-800" : "bg-linear-to-b from-indigo-50/50 to-transparent border-slate-200"}`}>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-indigo-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider ${isDark ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-100 text-indigo-700"}`}>
                <Sparkles className="w-3 h-3" />
                Dành riêng cho bạn
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
                Chào {user?.name?.split(" ")[0] || "bạn"}, <br className="sm:hidden" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-purple-500">
                  Học vui nhé!
                </span>
              </h1>
              <p className={`text-lg max-w-xl ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Bạn đã hoàn thành <span className="font-bold text-indigo-500">{stats.avgProgress}%</span> mục tiêu tuần này. Tiếp tục duy trì phong độ nhé!
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 w-full lg:w-auto">
              <StatCard
                icon={<Trophy className="w-5 h-5" />}
                label="Đã xong"
                value={`${stats.completed} khóa`}
                isDark={isDark}
                theme="yellow"
              />
              <StatCard
                icon={<TrendingUp className="w-5 h-5" />}
                label="Tiến độ"
                value={`${stats.avgProgress}%`}
                isDark={isDark}
                theme="indigo"
              />
              <StatCard
                icon={<BookOpen className="w-5 h-5" />}
                label="Tổng học"
                value={stats.total}
                isDark={isDark}
                theme="emerald"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto -mt-10 pb-4 relative z-20">

        {/* My Courses Horizontal Carousel */}
        {userCourses.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                  <PlayCircle className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black tracking-tight">Khóa học của tôi</h2>
              </div>

              {userCourses.length > itemsPerPage && (
                <div className="flex gap-2">
                  <button
                    onClick={prevSlide}
                    disabled={carouselIndex === 0}
                    className={`p-2 rounded-xl border transition-all ${carouselIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-indigo-600 hover:text-white border-indigo-500/50"}`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    disabled={carouselIndex >= maxIndex}
                    className={`p-2 rounded-xl border transition-all ${carouselIndex >= maxIndex ? "opacity-30 cursor-not-allowed" : "hover:bg-indigo-600 hover:text-white border-indigo-500/50"}`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="relative overflow-hidden py-4 -my-4">
              <div
                className="flex gap-6 transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${carouselIndex * (100 / itemsPerPage)}%)` }}
              >
                {userCourses.map((course) => (
                  <div key={course.path_id} className="min-w-[calc(33.333%-16px)] w-[calc(33.333%-16px)]">
                    <MyCourseCard course={course} darkMode={isDark} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Discovery Hub */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
            <div className="space-y-1">
              <h2 className="text-3xl font-black tracking-tight">Khám phá nội dung mới</h2>
              <p className={`text-base ${isDark ? "text-slate-400" : "text-slate-600"}`}>Khám phá các khóa học từ hàng đầu</p>
            </div>
            <div className={`flex items-center gap-2 pl-4 pr-1.5 py-1 rounded-xl border transition-all duration-300 ${isDark ? "bg-slate-800/40 border-slate-700/50 hover:border-emerald-500/30" : "bg-white border-slate-200 hover:border-emerald-500/30 shadow-sm"}`}>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <Languages className="w-3.5 h-3.5 opacity-80" />
                <span className="text-[11px] font-black uppercase tracking-wider opacity-60">Lọc theo:</span>
              </div>
              <Select
                value={selectedLang?.toString() || "all"}
                onValueChange={(val) => setSelectedLang(val === "all" ? null : parseInt(val))}
              >
                <SelectTrigger className="w-auto border-none !bg-transparent !shadow-none h-8 text-xs font-bold focus:ring-0 focus:ring-offset-0 px-2 text-gray-800 dark:text-white">
                  <SelectValue placeholder="Ngôn ngữ" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-gray-100 dark:border-slate-800 shadow-2xl backdrop-blur-xl bg-white/95 dark:bg-slate-900/95">
                  <SelectItem value="all" className="text-xs font-bold focus:bg-emerald-50 dark:focus:bg-emerald-900/20">Tất cả ngôn ngữ</SelectItem>
                  {languages.map((lang) => (
                    <SelectItem key={lang.id} value={lang.id.toString()} className="text-xs font-bold focus:bg-emerald-50 dark:focus:bg-emerald-900/20">
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <CourseFilters
            isDark={isDark}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterLevel={filterLevel}
            setFilterLevel={setFilterLevel}
            languages={languages}
            selectedLang={selectedLang}
            setSelectedLang={setSelectedLang}
          />

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCourses.map((course) => (
                <CourseCard
                  key={course.path_id}
                  course={course}
                  language={course.language}
                  onViewDetail={(id) => window.location.href = `/courses/${id}`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 opacity-20" />
              </div>
              <h3 className="text-xl font-bold mb-2">Không tìm thấy khóa học nào</h3>
              <p className="opacity-60 mb-8">Hãy thử thay đổi từ khóa hoặc bộ lọc của bạn.</p>
              <button
                onClick={() => { setSearchTerm(""); setFilterLevel("all"); setSelectedLang(null); }}
                className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-bold"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}

          {/* Pagination UI - Integration inside Main Grid */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center gap-3">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 h-10 rounded-xl font-bold text-sm transition-all duration-300 border
                            ${currentPage === 1
                    ? "opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent"
                    : "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 shadow-sm"}`}
              >
                ← Trước
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl font-black text-sm transition-all duration-300
                                  ${currentPage === i + 1
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 scale-105"
                        : isDark ? "bg-slate-800 hover:bg-slate-700 text-slate-400" : "bg-slate-100 hover:bg-slate-200 text-slate-600"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 h-10 rounded-xl font-bold text-sm transition-all duration-300 border
                            ${currentPage === totalPages
                    ? "opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent"
                    : "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 shadow-sm"}`}
              >
                Sau →
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Sub-components
const StatCard = ({ icon, label, value, isDark, theme = "indigo" }) => {
  const themes = {
    yellow: {
      bg: "bg-amber-100 dark:bg-amber-900/30",
      icon: "text-amber-600 dark:text-amber-400",
      accent: "from-amber-500/20 to-transparent"
    },
    indigo: {
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
      icon: "text-indigo-600 dark:text-indigo-400",
      accent: "from-indigo-500/20 to-transparent"
    },
    emerald: {
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      icon: "text-emerald-600 dark:text-emerald-400",
      accent: "from-emerald-500/20 to-transparent"
    }
  };

  const currentTheme = themes[theme] || themes.indigo;

  return (
    <div className={`group relative p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] 
          ${isDark
        ? "bg-slate-800/40 border-slate-700/50 backdrop-blur-xl"
        : "bg-white/80 border-slate-200/60 shadow-sm"} hover:shadow-lg hover:shadow-indigo-500/5 overflow-hidden`}>

      {/* Background Subtle Gradient */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br ${currentTheme.accent}`} />

      <div className="relative z-10 flex items-center gap-4">
        <div className={`shrink-0 w-12 h-12 rounded-xl ${currentTheme.bg} ${currentTheme.icon} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-sm`}>
          {React.cloneElement(icon, { className: "w-6 h-6" })}
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 whitespace-nowrap">
            {label}
          </span>
          <span className={`text-xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            {value}
          </span>
        </div>
      </div>
    </div>
  );
};
