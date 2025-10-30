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

          <main className="px-6 sm:px-14 lg:px-20 py-8 flex-1">
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
