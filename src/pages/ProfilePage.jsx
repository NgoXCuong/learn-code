// import React, { useState, useContext } from "react";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import { UserCoursesContext } from "@/context/UserCoursesContext";
// import {
//   Edit2,
//   Book,
//   CheckCircle,
//   Award,
//   TrendingUp,
//   Upload,
//   Clock,
//   Target,
//   Calendar,
//   Code,
//   Flame,
//   Share2,
//   BookOpen,
//   Activity,
// } from "lucide-react";

// import {
//   user,
//   courses,
//   badges,
//   stats,
//   recentActivity,
//   achievements,
// } from "@/mock/profile";
// import StreakCard from "@/components/profile/StreakCard";
// import FavoriteCoursesSection from "@/components/profile/FavoriteCoursesSection";
// import { ThemeContext } from "@/context/ThemeContext";

// export default function ProfilePage() {
//   const { theme } = useContext(ThemeContext) || { theme: "light" };
//   const darkMode = theme === "dark";
//   const [activeTab, setActiveTab] = useState("overview");
//   const [showToast, setShowToast] = useState(false);

//   // Yeu thich
//   const { favoriteCourses } = useContext(UserCoursesContext);

//   const getRarityColor = (rarity) => {
//     const colors = {
//       common: "from-gray-400 to-gray-500",
//       rare: "from-blue-400 to-blue-600",
//       epic: "from-purple-400 to-purple-600",
//       legendary: "from-yellow-400 to-orange-500",
//     };
//     return colors[rarity] || colors.common;
//   };

//   return (
//     <div
//       className={`flex flex-col min-h-screen ${
//         darkMode ? "dark bg-[#0f172a]" : "bg-slate-50"
//       }`}
//     >
//       {/* Toast */}
//       {showToast && (
//         <div className="fixed top-4 right-4 z-50 animate-slide-in">
//           <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3">
//             <CheckCircle size={20} />
//             <span className="font-medium">Đã lưu thay đổi!</span>
//           </div>
//         </div>
//       )}

//       {/* Background Grid */}
//       <div className="fixed inset-0 z-0">
//         <div
//           className={`absolute inset-0 transition-opacity duration-300 ${
//             darkMode ? "opacity-30" : "opacity-40"
//           }`}
//           style={{
//             backgroundImage: `
//         linear-gradient(to right, rgba(139,92,246,0.35) 1px, transparent 1px),
//         linear-gradient(to bottom, rgba(139,92,246,0.35) 1px, transparent 1px)
//       `,
//             backgroundSize: "32px 32px",
//           }}
//         />
//       </div>

//       {/* Nội dung chính */}
//       <div className="flex flex-col min-h-screen relative z-10">
//         <div className="flex-grow">
//           <Header />

//           {/* Hero Section */}
//           <div className="relative">
//             {/* Cover Image */}
//             <div className="h-64 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 relative overflow-hidden">
//               <img
//                 src={user.cover}
//                 alt="Cover"
//                 className="w-full h-full object-cover opacity-50 dark:opacity-40"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

//               {/* Edit Button */}
//               <button className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg flex items-center space-x-2 backdrop-blur-sm transition-all">
//                 <Upload size={16} />
//                 <span className="text-sm">Đổi ảnh bìa</span>
//               </button>
//             </div>

//             {/* Profile Info Overlay */}
//             <div className="max-w-7xl mx-auto px-6 -mt-20 relative">
//               <div className="bg-white dark:bg-gray-800 transition-colors duration-150 rounded-xl shadow-sm p-6">
//                 <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
//                   {/* Avatar */}
//                   <div className="relative group">
//                     <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 overflow-hidden shadow-lg">
//                       <img
//                         src={user.avatar}
//                         alt={user.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <button className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg transition-all transform group-hover:scale-110">
//                       <Edit2 size={16} />
//                     </button>
//                   </div>

//                   {/* User Info */}
//                   <div className="flex-1">
//                     <div className="flex items-center space-x-3 mb-2">
//                       <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
//                         {user.name}
//                       </h1>
//                       <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm px-3 py-1 rounded-full font-semibold">
//                         Level {user.level}
//                       </span>
//                     </div>
//                     <p className="text-gray-600 dark:text-gray-400 mb-3">
//                       {user.bio}
//                     </p>

//                     {/* XP Progress */}
//                     <div className="mb-4">
//                       <div className="flex justify-between text-sm mb-1">
//                         <span className="text-gray-600 dark:text-gray-400">
//                           Kinh nghiệm
//                         </span>
//                         <span className="font-semibold text-purple-600 dark:text-purple-400">
//                           {user.xp} / {user.nextLevelXp} XP
//                         </span>
//                       </div>
//                       <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
//                         <div
//                           className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-500"
//                           style={{
//                             width: `${(user.xp / user.nextLevelXp) * 100}%`,
//                           }}
//                         ></div>
//                       </div>
//                     </div>

//                     {/* Quick Stats */}
//                     <div className="flex flex-wrap gap-4">
//                       {achievements.map((ach) => (
//                         <div
//                           key={ach.id}
//                           className="flex items-center space-x-2 text-sm"
//                         >
//                           <ach.icon className={ach.color} size={18} />
//                           <div>
//                             <div className="font-bold text-gray-900 dark:text-white">
//                               {ach.title}
//                             </div>
//                             <div className="text-gray-600 dark:text-gray-400 text-xs">
//                               {ach.desc}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}

//           <main className="max-w-7xl mx-auto px-6 py-8 flex-1">
//             {/* Tabs */}
//             <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
//               {["overview", "courses", "badges", "activity"].map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`px-6 py-2.5 rounded-lg font-medium whitespace-nowrap transition-all ${
//                     activeTab === tab
//                       ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105"
//                       : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
//                   }`}
//                 >
//                   {tab === "overview" && "Tổng quan"}
//                   {tab === "courses" && "Khóa học"}
//                   {tab === "badges" && "Huy hiệu"}
//                   {tab === "activity" && "Hoạt động"}
//                 </button>
//               ))}
//             </div>

//             {/* Content Based on Active Tab */}
//             {activeTab === "overview" && (
//               <div className="grid lg:grid-cols-3 gap-6">
//                 {/* Left Column - Stats & Courses */}
//                 <div className="lg:col-span-2 space-y-6">
//                   {/* Stats Cards */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//                     {/* Bài học */}
//                     <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
//                       <BookOpen className="text-blue-500 w-10 h-10 flex-shrink-0" />
//                       <div className="flex flex-col">
//                         <div className="text-xl font-bold text-gray-900 dark:text-white">
//                           {stats.lessonsDone}
//                         </div>
//                         <div className="text-sm text-gray-600 dark:text-gray-400">
//                           Bài học
//                         </div>
//                       </div>
//                     </div>

//                     {/* Bài tập */}
//                     <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
//                       <Code className="text-green-500 w-10 h-10 flex-shrink-0" />
//                       <div className="flex flex-col">
//                         <div className="text-xl font-bold text-gray-900 dark:text-white">
//                           {stats.exercisesSolved}
//                         </div>
//                         <div className="text-sm text-gray-600 dark:text-gray-400">
//                           Bài tập
//                         </div>
//                       </div>
//                     </div>

//                     {/* Thử thách */}
//                     <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
//                       <Target className="text-purple-500 w-10 h-10 flex-shrink-0" />
//                       <div className="flex flex-col">
//                         <div className="text-xl font-bold text-gray-900 dark:text-white">
//                           {stats.challengesCompleted}
//                         </div>
//                         <div className="text-sm text-gray-600 dark:text-gray-400">
//                           Thử thách
//                         </div>
//                       </div>
//                     </div>

//                     {/* Xếp hạng */}
//                     <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
//                       <TrendingUp className="text-orange-500 w-10 h-10 flex-shrink-0" />
//                       <div className="flex flex-col">
//                         <div className="text-xl font-bold text-gray-900 dark:text-white">
//                           #{stats.rank}
//                         </div>
//                         <div className="text-sm text-gray-600 dark:text-gray-400">
//                           Xếp hạng
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Courses Progress */}
//                   <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
//                     <div className="flex items-center justify-between mb-6">
//                       <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
//                         <Book className="mr-2 text-purple-600" size={24} />
//                         Khóa học đang học
//                       </h2>
//                       <button className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
//                         Xem tất cả
//                       </button>
//                     </div>

//                     <div className="space-y-4">
//                       {courses.map((course) => (
//                         <div
//                           key={course.id}
//                           className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer group"
//                         >
//                           <div className="flex items-start space-x-4">
//                             <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">
//                               {course.icon}
//                             </div>
//                             <div className="flex-1">
//                               <div className="flex items-center justify-between mb-2">
//                                 <h3 className="font-semibold text-gray-900 dark:text-white">
//                                   {course.name}
//                                 </h3>
//                                 <span className="text-sm text-gray-500 dark:text-gray-400">
//                                   {course.lessons}/{course.totalLessons} bài
//                                 </span>
//                               </div>
//                               <div className="flex items-center space-x-3 mb-2">
//                                 <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
//                                   <div
//                                     className={`h-2 rounded-full transition-all ${
//                                       course.progress === 100
//                                         ? "bg-green-500"
//                                         : "bg-gradient-to-r from-purple-500 to-pink-500"
//                                     }`}
//                                     style={{ width: `${course.progress}%` }}
//                                   ></div>
//                                 </div>
//                                 <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
//                                   {course.progress}%
//                                 </span>
//                               </div>
//                               <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
//                                 <span>👨‍🏫 {course.instructor}</span>
//                                 <span className="flex items-center">
//                                   <Clock size={12} className="mr-1" />
//                                   {course.lastAccess}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <StreakCard />
//                 </div>

//                 {/* Right Column - Badges & Activity */}
//                 <div className="space-y-6">
//                   {/* Recent Badges */}
//                   <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
//                     <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
//                       <Award className="mr-2 text-yellow-500" size={24} />
//                       Huy hiệu gần đây
//                     </h2>
//                     <div className="grid grid-cols-2 gap-3">
//                       {badges.slice(0, 4).map((badge) => (
//                         <div
//                           key={badge.id}
//                           className={`relative group ${
//                             !badge.date && "opacity-40"
//                           }`}
//                         >
//                           <div
//                             className={`bg-gradient-to-br ${getRarityColor(
//                               badge.rarity
//                             )} rounded-xl p-4 text-center transition-all hover:scale-105 cursor-pointer`}
//                           >
//                             <div className="text-4xl mb-2">{badge.icon}</div>
//                             <div className="text-white font-bold text-sm">
//                               {badge.name}
//                             </div>
//                           </div>
//                           {/* Tooltip */}
//                           <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 z-10">
//                             <div className="bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl">
//                               <p className="font-semibold mb-1">{badge.desc}</p>
//                               {badge.date ? (
//                                 <p className="text-gray-300">{badge.date}</p>
//                               ) : (
//                                 <p className="text-yellow-400">
//                                   🔒 Chưa mở khóa
//                                 </p>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Streak Card */}
//                   <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-xl font-bold flex items-center">
//                         <Flame className="mr-2" size={24} />
//                         Chuỗi học tập
//                       </h3>
//                       <span className="text-3xl font-bold">{user.streak}</span>
//                     </div>
//                     <p className="text-white/90 text-sm mb-4">
//                       Bạn đã học liên tiếp {user.streak} ngày! Tiếp tục phát
//                       huy! 🔥
//                     </p>
//                     <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
//                       <div className="flex justify-between text-sm mb-2">
//                         <span>Mục tiêu tuần này</span>
//                         <span className="font-bold">5/7 ngày</span>
//                       </div>
//                       <div className="flex space-x-1">
//                         {[1, 2, 3, 4, 5, 6, 7].map((day) => (
//                           <div
//                             key={day}
//                             className={`flex-1 h-2 rounded ${
//                               day <= 5 ? "bg-white" : "bg-white/30"
//                             }`}
//                           ></div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recent Activity */}
//                   <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
//                     <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
//                       <Activity className="mr-2 text-blue-500" size={24} />
//                       Hoạt động gần đây
//                     </h2>
//                     <div className="space-y-3">
//                       {recentActivity.map((activity, idx) => (
//                         <div
//                           key={idx}
//                           className="flex items-start space-x-3 text-sm"
//                         >
//                           <span className="text-2xl flex-shrink-0">
//                             {activity.icon}
//                           </span>
//                           <div className="flex-1">
//                             <p className="text-gray-900 dark:text-white font-medium">
//                               {activity.title}
//                             </p>
//                             <p className="text-gray-500 dark:text-gray-400 text-xs">
//                               {activity.time}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === "courses" && (
//               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
//                 {/* --- Khóa học yêu thích --- */}
//                 <FavoriteCoursesSection />
//               </div>
//             )}

//             {activeTab === "badges" && (
//               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
//                   Bộ sưu tập huy hiệu
//                 </h2>
//                 <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                   {badges.map((badge) => (
//                     <div
//                       key={badge.id}
//                       className={`relative group ${
//                         !badge.date && "opacity-50"
//                       }`}
//                     >
//                       <div
//                         className={`bg-gradient-to-br ${getRarityColor(
//                           badge.rarity
//                         )} rounded-2xl p-6 text-center transition-all hover:scale-105 cursor-pointer shadow-lg`}
//                       >
//                         <div className="text-6xl mb-3">{badge.icon}</div>
//                         <div className="text-white font-bold text-lg mb-1">
//                           {badge.name}
//                         </div>
//                         <div className="text-white/80 text-xs uppercase tracking-wider">
//                           {badge.rarity}
//                         </div>
//                       </div>
//                       <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 z-10">
//                         <div className="bg-gray-900 text-white text-sm rounded-lg p-4 shadow-2xl">
//                           <p className="font-semibold mb-2">{badge.desc}</p>
//                           {badge.date ? (
//                             <p className="text-gray-300 text-xs flex items-center">
//                               <Calendar size={12} className="mr-1" />
//                               Đạt được: {badge.date}
//                             </p>
//                           ) : (
//                             <p className="text-yellow-400 text-xs">
//                               🔒 Tiếp tục cố gắng để mở khóa!
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeTab === "activity" && (
//               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
//                   Lịch sử hoạt động
//                 </h2>

//                 {/* Activity Timeline */}
//                 <div className="space-y-6">
//                   {recentActivity.map((activity, idx) => (
//                     <div
//                       key={idx}
//                       className="flex items-start space-x-4 pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0"
//                     >
//                       <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-2xl shadow-md">
//                         {activity.icon}
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
//                           {activity.title}
//                         </h3>
//                         <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
//                           <Clock size={14} className="mr-1" />
//                           {activity.time}
//                         </p>
//                       </div>
//                       <button className="text-gray-400 hover:text-purple-600 transition-colors">
//                         <Share2 size={18} />
//                       </button>
//                     </div>
//                   ))}

//                   {/* Load More */}
//                   <button className="w-full py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 transition-colors">
//                     Xem thêm hoạt động
//                   </button>
//                 </div>
//               </div>
//             )}
//           </main>
//         </div>

//         <Footer />
//       </div>
//     </div>
//   );
// }
import React, { useState, useContext, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { UserCoursesContext } from "@/context/UserCoursesContext";
import { ThemeContext } from "@/context/ThemeContext";
import { user } from "@/mock/profile";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileTabs from "@/components/profile/ProfileTabs";
import OverviewTab from "@/components/profile/OverviewTab";
import CoursesTab from "@/components/profile/CoursesTab";
import BadgesTab from "@/components/profile/BadgesTab";
import ActivityTab from "@/components/profile/ActivityTab";

export default function ProfilePage() {
  const { theme } = useContext(ThemeContext) || { theme: "light" };
  const darkMode = theme === "dark";
  const [activeTab, setActiveTab] = useState("overview");

  const { favoriteCourses } = useContext(UserCoursesContext);

  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode ? "dark bg-[#0f172a]" : "bg-slate-50"
      }`}
    >
      {/* Background Grid */}
      <div className="fixed inset-0 z-0">
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            darkMode ? "opacity-30" : "opacity-40"
          }`}
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(139,92,246,0.35) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139,92,246,0.35) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Nội dung chính */}
      <div className="flex flex-col min-h-screen relative z-10">
        <div className="flex-grow">
          <Header />
          <ProfileHero user={user} />

          <main className="max-w-7xl mx-auto px-6 py-8 flex-1">
            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === "overview" && <OverviewTab />}
            {activeTab === "courses" && <CoursesTab />}
            {activeTab === "badges" && <BadgesTab />}
            {activeTab === "activity" && <ActivityTab />}
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
}
