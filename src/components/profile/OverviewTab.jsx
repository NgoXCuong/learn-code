import React from "react";
import CoursesProgress from "@/components/profile/CoursesProgress";
import StreakCard from "@/components/profile/StreakCard";
import RecentBadges from "@/components/profile/RecentBadges";

export default function OverviewTab({ badges = [], onViewAllCourses }) {
  return (
    <div className="space-y-6">
      <StreakCard />
      {/* Row: CoursesProgress (left) + RecentBadges (right) - Equal Height */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch flex-1">
        <div className="flex-1">
          <CoursesProgress onViewAll={(onViewAllCourses)} />
        </div>
        <div className="flex-1">
          <RecentBadges badges={badges} />
        </div>
      </div>
    </div>
  );
}
