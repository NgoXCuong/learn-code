import React from "react";
import StatsCards from "@/components/profile/StatsCard";
import CoursesProgress from "@/components/profile/CoursesProgress";
import StreakCard from "@/components/profile/StreakCard";
import RecentBadges from "@/components/profile/RecentBadges";
import StreakWidget from "@/components/profile/StreakWidget";
import RecentActivity from "@/components/profile/RecentActivity";

export default function OverviewTab() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column - Stats & Courses */}
      <div className="lg:col-span-2 space-y-6">
        <StatsCards />
        <CoursesProgress />
        <StreakCard />
      </div>

      {/* Right Column - Badges & Activity */}
      <div className="space-y-6">
        <RecentBadges />
        <StreakWidget />
        <RecentActivity />
      </div>
    </div>
  );
}
