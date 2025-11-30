import React from "react";
import CoursesProgress from "@/components/profile/CoursesProgress";
import StreakCard from "@/components/profile/StreakCard";
import RecentBadges from "@/components/profile/RecentBadges";

export default function OverviewTab({ badges = [] }) {
  return (
    <div className="space-y-6">
      <StreakCard />
      {/* Row: CoursesProgress (left) + RecentBadges (right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <CoursesProgress />
        </div>
        <div>
          <RecentBadges badges={badges} />
        </div>
      </div>
    </div>
  );
}
