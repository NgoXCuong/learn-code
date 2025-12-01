import React, { useState, useContext, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { UserCoursesContext } from "@/context/UserCoursesContext";
import { ThemeContext } from "@/context/ThemeContext";
import {
  fetchUserProfile,
  fetchUserStats,
  fetchUserBadges,
  fetchUserAchievements,
} from "@/services/profileApi";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileTabs from "@/components/profile/ProfileTabs";
import OverviewTab from "@/components/profile/OverviewTab";
import CoursesTab from "@/components/profile/CoursesTab";
import BadgesTab from "@/components/profile/BadgesTab";
import { Loading } from "@/components/layout/Loading";
import { toast } from "sonner";

export default function ProfilePage() {
  const { theme } = useContext(ThemeContext) || { theme: "light" };
  const darkMode = theme === "dark";
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { favoriteCourses } = useContext(UserCoursesContext);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load all user data in parallel
        const [userData, achievementsData, badgesData] = await Promise.all([
          fetchUserProfile(1),
          fetchUserAchievements(1),
          fetchUserBadges(1),
        ]);

        setUser(userData);
        setAchievements(achievementsData);
        setBadges(badgesData);
      } catch (err) {
        console.error("Error loading user data:", err);
        setError("Không thể tải thông tin profile");
        toast.error("Không thể tải thông tin profile");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

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
        <Header />

        <div className="grow">
          <main className="px-6 sm:px-14 lg:px-20 py-8">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loading />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-500 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Thử lại
                </button>
              </div>
            ) : user ? (
              /* Grid Layout: Sidebar + Main Content */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Sidebar - Profile Info */}
                <div className="lg:col-span-1">
                  <ProfileSidebar
                    user={user}
                    darkMode={darkMode}
                    achievements={achievements}
                  />
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                  <ProfileTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />

                  {activeTab === "overview" && <OverviewTab badges={badges} />}
                  {activeTab === "courses" && <CoursesTab />}
                  {activeTab === "badges" && <BadgesTab />}
                </div>
              </div>
            ) : null}
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}
